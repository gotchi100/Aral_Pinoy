<template>
  <div class="inkindlist">
    <b-card style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
      <b-container fluid>
        <b-row>
          <b-col cols="12">
            <h1 style="font-family:'Bebas Neue', cursive;">
              In-Kind Transaction History
            </h1>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <b-tabs pills card>
              <b-tab title="External Organizations" active>
                <b-row>
                  <b-col cols="12">
                    <b-container>
                      <b-row>
                        <b-col cols="4">
                          <b-form-group
                            style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                            label="Per page"
                            label-for="per-page-select"
                            content-cols="12"
                          >
                            <b-form-select
                              id="per-page-select"
                              class="w-25"
                              v-model="orgTransactionPerPage"
                              :options="pageOptions"
                            ></b-form-select>
                          </b-form-group>
                        </b-col>

                        <!-- TODO: Implement search for inkind donation outbound transactions for organizations -->
                        <!-- <b-col>
                          <br>
                          <b-input-group size="sm">
                            <p style="font-size: 20px; font-family:'Bebas Neue', cursive;">Search &nbsp; &nbsp; </p>
                            <b-form-input
                              id="filter-input"
                              v-model="filter"
                              type="search"
                              placeholder="Type to Search" style="height:30px; width:300px; border-radius: 10px;"
                            ></b-form-input>
                          </b-input-group>
                          <br>
                        </b-col> -->
                      </b-row>
                    </b-container>
                  </b-col>
                </b-row>

                <b-row class="pt-4">
                  <b-col cols="12">
                    <b-table
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
                            {{row.item.receiver.organization.contacts[0].name}} &lt;{{row.item.receiver.organization.contacts[0].contactMethods[0].value}}&gt;
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
                                {{contact.name}} &lt;{{contact.contactMethods[0].value}}&gt;
                              </span>
                            </b-dropdown-item>
                          </b-dropdown>
                        </template>
                      </template>

                      <template #cell(status)="row">
                        <b-dropdown v-if="row.value==='PENDING'" :text="row.value" size="sm">
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
                    <b-col cols="6" class="my-1">
                      <b-pagination
                        v-model="orgTransactionCurrentPage"
                        :total-rows="orgTransactionTotal"
                        :per-page="orgTransactionPerPage"
                        align="fill"
                        size="sm"
                        class="my-0"
                      ></b-pagination>
                    </b-col>
                </b-row>
              </b-tab>

              <b-tab title="Aral Pinoy Events">
                <b-row>
                  <b-col cols="12">
                    <b-container>
                      <b-row>
                        <b-col cols="4">
                          <b-form-group
                            style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                            label="Per page"
                            label-for="per-page-select"
                            content-cols="12"
                          >
                            <b-form-select
                              id="per-page-select"
                              class="w-25"
                              v-model="eventTransactionPerPage"
                              :options="pageOptions"
                            ></b-form-select>
                          </b-form-group>
                        </b-col>

                        <!-- TODO: Implement search for inkind donation outbound transactions for organizations -->
                        <!-- <b-col>
                          <br>
                          <b-input-group size="sm">
                            <p style="font-size: 20px; font-family:'Bebas Neue', cursive;">Search &nbsp; &nbsp; </p>
                            <b-form-input
                              id="filter-input"
                              v-model="filter"
                              type="search"
                              placeholder="Type to Search" style="height:30px; width:300px; border-radius: 10px;"
                            ></b-form-input>
                          </b-input-group>
                          <br>
                        </b-col> -->
                      </b-row>
                    </b-container>
                  </b-col>
                </b-row>

                <b-row class="pt-4">
                  <b-col cols="12">
                    <b-table
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
                    <b-col cols="6" class="my-1">
                      <b-pagination
                        v-model="eventTransactionCurrentPage"
                        :total-rows="eventTransactionTotal"
                        :per-page="eventTransactionPerPage"
                        align="fill"
                        size="sm"
                        class="my-0"
                      ></b-pagination>
                    </b-col>
                  </b-row>
              </b-tab>
            </b-tabs>
          </b-col>
        </b-row>
      </b-container>
    </b-card>

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

const axios = require('axios').default

export default {
  data () {
    return {
      pageOptions: [5, 10, 20],
      eventTransactionFields: [
        { key: 'date', label: 'Date Sent' },
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
      eventTransactionTotal: 1,
      eventTransactionCurrentPage: 1,
      eventTransactionPerPage: 5,
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
  methods: {
    async getEventTransactions (ctx) {
      const queryString = new URLSearchParams()

      queryString.set('limit', this.eventTransactionPerPage)
      queryString.set('offset', this.eventTransactionPageOffset)
      queryString.set('filters.receiverType', 'EVENT')

      const { data } = await axios.get(`http://localhost:3000/inkind-donation-outbound-transactions?${queryString.toString()}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      const { results, total } = data

      this.eventTransactionTotal = total

      return results
    },
    async getOrganizationTransactions (ctx) {
      const queryString = new URLSearchParams()

      queryString.set('limit', this.orgTransactionPerPage)
      queryString.set('offset', this.orgTransactionPageOffset)
      queryString.set('filters.receiverType', 'ORGANIZATION')

      const { data } = await axios.get(`http://localhost:3000/inkind-donation-outbound-transactions?${queryString.toString()}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      const { results, total } = data

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

      await axios.put(`http://localhost:3000/inkind-donation-outbound-transactions/${id}/status`, {
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

<style scoped>
.inkindlist {
position: relative;
}
.inkindlist:before {
background-image: url('https://rs.projects-abroad.ie/v1/hero/product-5b5b2f57d7d1b.[1600].jpeg');
content: ' ';
display: block;
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
opacity: 0.4;
background-repeat: no-repeat;
background-size: cover;
padding-top: 695px;
}
</style>
