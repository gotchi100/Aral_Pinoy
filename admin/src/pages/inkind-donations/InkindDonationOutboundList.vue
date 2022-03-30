<template>
  <div>
    <b-container class="py-5">
      <b-row>
        <b-col cols="12">
          <b-card style="border-radius: 20px;">
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Donated In-Kind
                  </h1>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <b-tabs
                    pills
                    card
                  >
                    <b-tab
                      title="External Organizations"
                      active
                    >
                      <b-row class="my-2">
                        <b-col cols="12">
                          <b-container>
                            <b-row
                              class="mb-4"
                              align-h="around"
                              align-v="center"
                            >
                              <b-col cols="4">
                                <b-row align-v="center">
                                  <b-col cols="3">
                                    <label
                                      for="per-page-select"
                                      style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                                    >
                                      Per Page&nbsp;&nbsp;
                                    </label>
                                  </b-col>

                                  <b-col>
                                    <select
                                      v-model="orgTransactionPerPage"
                                      class="form-select form-select-sm"
                                    >
                                      <option
                                        v-for="option in pageOptions"
                                        :key="option"
                                      >
                                        {{ option }}
                                      </option>
                                    </select>
                                  </b-col>
                                </b-row>
                              </b-col>

                              <b-col cols="4">
                                <b-dropdown
                                  class="w-50"
                                  size="sm"
                                  text="Filter by Status"
                                >
                                  <b-dropdown-form style="width: 100%">
                                    <div
                                      v-for="option in orgTransactions.statusOptions"
                                      :key="option"
                                      class="form-check form-switch"
                                    >
                                      <label
                                        class="form-check-label"
                                        :for="`org-transaction-status-checkbox-${option}`"
                                      >
                                        {{ option }}
                                      </label>

                                      <input
                                        :id="`org-transaction-status-checkbox-${option}`"
                                        v-model="orgTransactions.filters.status"
                                        class="form-check-input"
                                        type="checkbox"
                                        :value="option"
                                      >
                                    </div>
                                  </b-dropdown-form>
                                </b-dropdown>
                              </b-col>
                            </b-row>
                          </b-container>
                        </b-col>
                      </b-row>

                      <b-row class="pt-4">
                        <b-col cols="12">
                          <b-table
                            ref="orgTransactionsTable"
                            :items="getOrganizationTransactions"
                            :fields="orgTransactionFields"
                            :current-page="orgTransactionCurrentPage"
                            :per-page="orgTransactionPerPage"
                            stacked="md"
                            style="background:white"
                            show-empty
                            small
                            primary-key="_id"
                          >
                            <template #cell(date)="row">
                              {{
                                new Date(row.value).toLocaleString('en-us', {
                                  dateStyle: 'medium'
                                })
                              }}
                            </template>

                            <template #cell(name)="row">
                              {{ row.value.first }} {{ row.value.last }}
                            </template>

                            <template #cell(contact)="row">
                              <template v-if="checkOrganizationContacts(row.item.receiver.organization.contacts)">
                                <span v-if="row.item.receiver.organization.contacts.length === 1">
                                  {{ row.item.receiver.organization.contacts[0].name }} &lt;{{ row.item.receiver.organization.contacts[0].contactMethods[0].value }}&gt;
                                </span>

                                <b-dropdown
                                  v-else
                                  text="See List"
                                  style="width: 100%"
                                  menu-class="w-100"
                                  variant="outline-primary"
                                >
                                  <b-dropdown-item
                                    v-for="(contact, index) in row.item.receiver.organization.contacts"
                                    :key="index"
                                    disabled
                                  >
                                    <span style="color: black">
                                      {{ contact.name }} &lt;{{ contact.contactMethods[0].value }}&gt;
                                    </span>
                                  </b-dropdown-item>
                                </b-dropdown>
                              </template>
                            </template>

                            <template #cell(status)="row">
                              <b-dropdown
                                v-if="row.value==='PENDING'"
                                :text="row.value"
                                size="sm"
                              >
                                <b-dropdown-item
                                  @click="showTransactionStatusUpdateConfirmModal(row.item._id, 'COMPLETE')"
                                >
                                  COMPLETE
                                </b-dropdown-item>

                                <b-dropdown-item
                                  @click="showTransactionStatusUpdateConfirmModal(row.item._id, 'RETURNED')"
                                >
                                  RETURNED
                                </b-dropdown-item>
                              </b-dropdown>

                              <span v-else>
                                {{ row.value }}
                              </span>
                            </template>
                          </b-table>
                        </b-col>
                      </b-row>

                      <b-row class="pt-4 justify-content-md-center">
                        <b-col
                          cols="6"
                          class="my-1"
                        >
                          <b-pagination
                            v-model="orgTransactionCurrentPage"
                            :total-rows="orgTransactionTotal"
                            :per-page="orgTransactionPerPage"
                            align="fill"
                            size="sm"
                            class="my-0"
                          />
                        </b-col>
                      </b-row>
                    </b-tab>

                    <b-tab title="Aral Pinoy Events">
                      <b-row class="my-2">
                        <b-col cols="12">
                          <b-container>
                            <b-row
                              class="mb-4"
                              align-h="around"
                              align-v="center"
                            >
                              <b-col cols="4">
                                <b-row align-v="center">
                                  <b-col cols="3">
                                    <label
                                      for="per-page-select"
                                      style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                                    >
                                      Per Page&nbsp;&nbsp;
                                    </label>
                                  </b-col>

                                  <b-col>
                                    <select
                                      v-model="eventTransactionPerPage"
                                      class="form-select form-select-sm"
                                      aria-label="Default select example"
                                    >
                                      <option
                                        v-for="option in pageOptions"
                                        :key="option"
                                      >
                                        {{ option }}
                                      </option>
                                    </select>
                                  </b-col>
                                </b-row>
                              </b-col>

                              <b-col cols="4">
                                <b-dropdown
                                  class="w-50"
                                  size="sm"
                                  text="Filter by Status"
                                >
                                  <b-dropdown-form style="width: 100%">
                                    <div
                                      v-for="option in eventTransactions.statusOptions"
                                      :key="option"
                                      class="form-check form-switch"
                                    >
                                      <label
                                        class="form-check-label"
                                        :for="`event-transaction-status-checkbox-${option}`"
                                      >
                                        {{ option }}
                                      </label>

                                      <input
                                        :id="`event-transaction-status-checkbox-${option}`"
                                        v-model="eventTransactions.filters.status"
                                        class="form-check-input"
                                        type="checkbox"
                                        :value="option"
                                      >
                                    </div>
                                  </b-dropdown-form>
                                </b-dropdown>
                              </b-col>
                            </b-row>
                          </b-container>
                        </b-col>
                      </b-row>

                      <b-row class="pt-4">
                        <b-col cols="12">
                          <b-table
                            ref="eventTransactionsTable"
                            :items="getEventTransactions"
                            :fields="eventTransactionFields"
                            :current-page="eventTransactionCurrentPage"
                            :per-page="eventTransactionPerPage"
                            stacked="md"
                            style="background:white"
                            show-empty
                            small
                            primary-key="_id"
                          >
                            <template #cell(date)="row">
                              {{
                                new Date(row.value).toLocaleString('en-us', {
                                  dateStyle: 'medium'
                                })
                              }}
                            </template>

                            <template #cell(name)="row">
                              {{ row.value.first }} {{ row.value.last }}
                            </template>

                            <template #cell(eventName)="row">
                              <b-link :to="`/events/${row.item.receiver.event._id}`">
                                {{ row.item.receiver.event.name }}
                              </b-link>
                            </template>
                          </b-table>
                        </b-col>
                      </b-row>

                      <b-row class="pt-4 justify-content-md-center">
                        <b-col
                          cols="6"
                          class="my-1"
                        >
                          <b-pagination
                            v-model="eventTransactionCurrentPage"
                            :total-rows="eventTransactionTotal"
                            :per-page="eventTransactionPerPage"
                            align="fill"
                            size="sm"
                            class="my-0"
                          />
                        </b-col>
                      </b-row>
                    </b-tab>
                  </b-tabs>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-modal
      v-model="transactionStatusUpdateConfirmModal"
      @ok="updateTransactionStatus"
      @cancel="transactionStatusUpdateConfirmModal = false"
    >
      <b-container fluid>
        <h1 style="font-family:'Bebas Neue', cursive; text-align:center;">
          Are you sure you want to update the transaction?
        </h1>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { apiClient } from '../../axios'
import IkdOutboundTransactionRepository from '../../repositories/inkind-donations/outbound-transactions'

const ikdOutboundTransactionRepository = new IkdOutboundTransactionRepository(apiClient)

export default {
  data () {
    return {
      pageOptions: [5, 10, 20],
      eventTransactionFields: [
        { key: 'date', label: 'Date Sent', sortable: true },
        { key: 'item.name', label: 'Item' },
        { key: 'item.category.name', label: 'Category' },
        { key: 'quantity', label: 'Quantity Donated' },
        { key: 'eventName', label: 'Event' },
        { key: 'status', label: 'Status' }
      ],
      orgTransactionFields: [
        { key: 'date', label: 'Date Sent' },
        { key: 'item.name', label: 'Item' },
        { key: 'item.category.name', label: 'Category' },
        { key: 'quantity', label: 'Quantity Donated' },
        { key: 'receiver.organization.name', label: 'Organization' },
        { key: 'contact', label: 'Contacts' },
        { key: 'status', label: 'Status' }
      ],
      eventTransactions: {
        filters: {
          status: ['PENDING']
        },
        statusOptions: ['COMPLETE', 'RETURNED', 'PENDING']
      },
      eventTransactionTotal: 1,
      eventTransactionCurrentPage: 1,
      eventTransactionPerPage: 5,
      orgTransactions: {
        filters: {
          status: ['PENDING']
        },
        statusOptions: ['COMPLETE', 'RETURNED', 'PENDING']
      },
      orgTransactionTotal: 0,
      orgTransactionCurrentPage: 1,
      orgTransactionPerPage: 5,
      transactionStatusUpdateConfirmModal: false,
      transactionStatusForm: {
        id: '',
        status: ''
      }
    }
  },
  computed: {
    ...mapGetters(['token']),
    eventTransactionPageOffset () {
      return (this.eventTransactionCurrentPage - 1) * this.eventTransactionPerPage
    },
    orgTransactionPageOffset () {
      return (this.orgTransactionCurrentPage - 1) * this.orgTransactionPerPage
    }
  },
  watch: {
    'eventTransactions.filters.status' (val) {
      if (val.length === 0) {
        return
      }

      this.$refs.eventTransactionsTable.refresh()
    },
    'orgTransactions.filters.status' (val) {
      if (val.length === 0) {
        return
      }

      this.$refs.orgTransactionsTable.refresh()
    }
  },
  created () {
    ikdOutboundTransactionRepository.setAuthorizationHeader(`Bearer ${this.token}`)
  },
  methods: {
    async getEventTransactions (ctx) {
      const {
        sortBy,
        sortDesc
      } = ctx

      const limit = this.eventTransactionPerPage
      const offset = this.eventTransactionPageOffset
      const sort = {
        field: 'date',
        order: 'desc'
      }

      if (sortBy !== undefined && sortBy !== '') {
        sort.field = sortBy
        sort.order = sortDesc ? 'desc' : 'asc'
      }

      const { results, total } = await ikdOutboundTransactionRepository.list({
        receiverType: 'EVENT',
        status: this.eventTransactions.filters.status
      }, {
        limit,
        offset,
        sort
      })

      this.eventTransactionTotal = total

      return results
    },
    async getOrganizationTransactions (ctx) {
      const {
        sortBy,
        sortDesc
      } = ctx

      const limit = this.orgTransactionPerPage
      const offset = this.orgTransactionPageOffset
      const sort = {
        field: 'date',
        order: 'desc'
      }

      if (sortBy !== undefined && sortBy !== '') {
        sort.field = sortBy
        sort.order = sortDesc ? 'desc' : 'asc'
      }

      const { results, total } = await ikdOutboundTransactionRepository.list({
        receiverType: 'ORGANIZATION',
        status: this.orgTransactions.filters.status
      }, {
        limit,
        offset,
        sort
      })

      this.orgTransactionTotal = total

      return results
    },
    async showTransactionStatusUpdateConfirmModal (id, status) {
      this.transactionStatusForm = {
        id,
        status
      }

      this.transactionStatusUpdateConfirmModal = true
    },
    async updateTransactionStatus () {
      const { id, status } = this.transactionStatusForm

      await apiClient.put(`/inkind-donation-outbound-transactions/${id}/status`, {
        status
      }, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      this.$router.go()
    },
    checkOrganizationContacts (contacts) {
      if (!Array.isArray(contacts)) {
        return false
      }

      return contacts.length > 0
    }
  }
}
</script>
