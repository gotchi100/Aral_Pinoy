<template>
  <div>
    <b-container class="py-5">
      <b-row>
        <b-col cols="12">
          <b-card
            class="card"
            style="border-radius: 20px;"
          >
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Items Inventory
                  </h1>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <b-tabs
                    v-model="activeTab"
                    pills
                    card
                  >
                    <b-tab
                      title="Compiled View"
                    >
                      <b-row class="my-2">
                        <b-col cols="12">
                          <b-container>
                            <b-row
                              class="mb-4"
                              align-v="center"
                              align-h="start"
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
                                      v-model="groupedIkdPerPage"
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
                            </b-row>
                          </b-container>
                        </b-col>
                      </b-row>

                      <b-row class="pt-4">
                        <b-col cols="12">
                          <b-table
                            :items="getGroupedInkindDonations"
                            :fields="groupedFields"
                            :current-page="groupedIkdCurrentPage"
                            :per-page="groupedIkdPerPage"
                            stacked="sm"
                            style="background:white"
                            show-empty
                            primary-key="_id"
                          />
                        </b-col>
                      </b-row>

                      <b-row class="pt-4 justify-content-md-center">
                        <b-col
                          cols="6"
                          class="my-1"
                        >
                          <b-pagination
                            v-model="groupedIkdCurrentPage"
                            :total-rows="groupedIkdTotal"
                            :per-page="groupedIkdPerPage"
                            align="fill"
                            size="sm"
                            class="my-0"
                          />
                        </b-col>
                      </b-row>
                    </b-tab>

                    <b-tab title="Detailed View">
                      <b-row class="my-2">
                        <b-col cols="12">
                          <b-container>
                            <b-row
                              class="mb-4"
                              align-v="center"
                              align-h="around"
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
                                      v-model="inkindDonationPerPage"
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
                                <b-row align-v="center">
                                  <b-col cols="3">
                                    <label
                                      for="filter-ikd"
                                      style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                                    >
                                      Search&nbsp;&nbsp;
                                    </label>
                                  </b-col>

                                  <b-col>
                                    <b-form-input
                                      id="filter-ikd"
                                      v-model="inkindDonationSearchFilter"
                                      class="form-control"
                                      type="search"
                                      size="sm"
                                      debounce="500"
                                    />
                                  </b-col>
                                </b-row>
                              </b-col>

                              <b-col cols="4">
                                <b-dropdown
                                  class="w-50"
                                  size="sm"
                                  text="Filter Options"
                                >
                                  <b-dropdown-form style="width: 100%">
                                    <div
                                      v-for="option in ikdCategoryCustomFieldsOptions"
                                      :key="option.value"
                                      class="form-check form-switch"
                                    >
                                      <label
                                        class="form-check-label"
                                        :for="`status-checkbox-${option.value}`"
                                      >
                                        {{ option.label }}
                                      </label>

                                      <input
                                        :id="`status-checkbox-${option.value}`"
                                        v-model="ikdCategoryCustomFieldFilters"
                                        class="form-check-input"
                                        type="checkbox"
                                        :value="option.value"
                                      >
                                    </div>

                                    <div
                                      class="form-check form-switch"
                                    >
                                      <label
                                        class="form-check-label"
                                        for="status-checkbox-show-expiring"
                                      >
                                        Expiring Only
                                      </label>

                                      <input
                                        id="status-checkbox-show-expiring"
                                        v-model="detailedFilters.showExpiringOnly"
                                        class="form-check-input"
                                        type="checkbox"
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
                            ref="ikdsTable"
                            :items="getInkindDonations"
                            :fields="inkindDonationFields"
                            :current-page="inkindDonationCurrentPage"
                            :per-page="inkindDonationPerPage"
                            :filter="inkindDonationSearchFilter"
                            fixed
                            stacked="sm"
                            style="background:white"
                            show-empty
                            small
                            primary-key="_id"
                          >
                            <template #cell(bestBeforeDate)="{ item }">
                              <span v-if="item.category !== undefined && hasIkdCustomCategory(item.category.customFields, 'bestBeforeDate')">
                                {{
                                  new Date(item.category.customFields.bestBeforeDate).toLocaleString('en-us', {
                                    dateStyle: 'medium'
                                  })
                                }}
                                <b-icon
                                  v-if="isExpiring(item.category.customFields.bestBeforeDate)"
                                  variant="danger"
                                  icon="exclamation-circle-fill"
                                />
                              </span>
                            </template>

                            <template #cell(expirationDate)="{ item }">
                              <span v-if="item.category !== undefined && hasIkdCustomCategory(item.category.customFields, 'expirationDate')">
                                {{
                                  new Date(item.category.customFields.expirationDate).toLocaleString('en-us', {
                                    dateStyle: 'medium'
                                  })
                                }}
                                <b-icon
                                  v-if="isExpiring(item.category.customFields.expirationDate)"
                                  variant="danger"
                                  icon="exclamation-circle-fill"
                                />
                              </span>
                            </template>

                            <template #cell(actions)="{ item }">
                              <b-button
                                variant="danger"
                                @click="showDeleteConfirmation(item)"
                              >
                                <b-icon icon="trash" />
                              </b-button>
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
                            v-model="inkindDonationCurrentPage"
                            :total-rows="inkindDonationTotal"
                            :per-page="inkindDonationPerPage"
                            align="fill"
                            size="sm"
                            class="my-0"
                          />
                        </b-col>
                      </b-row>
                    </b-tab>
                  </b-tabs>

                  <b-row
                    class="pt-4"
                    align-h="end"
                  >
                    <b-col cols="2">
                      <b-button
                        style="font-size: 16px; width: 200px;"
                        pill
                        variant="danger"
                        @click="createItemModal = !createItemModal"
                      >
                        Add an Item
                      </b-button>
                    </b-col>
                    <b-col cols="2">
                      <b-button
                        style="font-size: 16px; width: 200px;"
                        pill
                        variant="danger"
                        @click="transactionModal = !transactionModal"
                      >
                        Create a Transaction
                      </b-button>
                    </b-col>
                    <b-col cols="2">
                      <b-button
                        to="/inkind-donations/adjustments"
                        style="font-size: 16px; width: 200px;"
                        pill
                        variant="danger"
                      >
                        View Adjustments
                      </b-button>
                    </b-col>
                    <b-col cols="2">
                      <b-button
                        style="font-size: 16px; width: 200px;"
                        to="/inkind-donations/categories"
                        pill
                        variant="danger"
                      >
                        View Categories
                      </b-button>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-container>

            <InkindDonationCreateItemModal
              :show="createItemModal"
              @close="createItemModal = false"
            />

            <InkindDonationTransactionModal
              :show="transactionModal"
              @close="transactionModal = false"
            />
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-modal
      v-model="confirmDeleteModal.show"
      @ok="deleteInkindDonation"
      @cancel="confirmDeleteModal.show = false"
    >
      <b-container fluid>
        <h1 style="font-family:'Bebas Neue', cursive; text-align:center;">
          Are you sure you want to delete this item?
        </h1>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addMonths } from 'date-fns'

import InkindDonationCreateItemModal from '../../components/inkind-donations/InkindDonationCreateItemModal'
import InkindDonationTransactionModal from '../../components/inkind-donations/InkindDonationTransactionModal'

import InkindDonationRepository from '../../repositories/inkind-donations'
import { apiClient } from '../../axios'

const inkindDonationRepository = new InkindDonationRepository(apiClient)

const IKD_SORT_MAP = {
  name: 'name',
  sku: 'sku',
  bestBeforeDate: 'category.customFields.bestBeforeDate',
  expirationDate: 'category.customFields.expirationDate'
}

const ACTIVE_TAB_MAP = {
  compiled: 0,
  detailed: 1
}

const ACTIVE_TAB_REVERSE_MAP = {
  0: 'compiled',
  1: 'detailed'
}

export default {
  components: {
    InkindDonationCreateItemModal,
    InkindDonationTransactionModal
  },
  data () {
    return {
      activeTab: 0,
      pageOptions: [5, 10, 20],
      groupedFields: [
        { key: '_id', label: 'Group' },
        { key: 'quantity', label: 'Quantity' }
      ],
      groupedIkdTotal: 0,
      groupedIkdCurrentPage: 1,
      groupedIkdPerPage: 5,
      detailedFilters: {
        showExpiringOnly: false
      },
      inkindDonationSearchFilter: '',
      ikdCategoryCustomFieldFilters: [],
      ikdCategoryCustomFieldsOptions: [{
        label: 'Best Before Date',
        value: 'bestBeforeDate'
      }, {
        label: 'Expiration Date',
        value: 'expirationDate'
      }],
      inkindDonationFields: [
        { key: 'sku', label: 'SKU', sortable: true },
        { key: 'name', label: 'Item', sortable: true },
        { key: 'donor', label: 'Donor' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'category.name', label: 'Category' },
        { key: 'bestBeforeDate', label: 'Best Before', sortable: true },
        { key: 'expirationDate', label: 'Expiration Date', sortable: true },
        { key: 'actions', label: 'Actions' }
      ],
      inkindDonationTotal: 0,
      inkindDonationCurrentPage: 1,
      inkindDonationPerPage: 5,
      createItemModal: false,
      transactionModal: false,
      confirmDeleteModal: {
        show: false,
        itemToDelete: null
      }
    }
  },
  computed: {
    ...mapGetters(['token']),
    groupedIkdPageOffset () {
      return (this.groupedIkdCurrentPage - 1) * this.groupedIkdPerPage
    },
    inkindDonationPageOffset () {
      return (this.inkindDonationCurrentPage - 1) * this.inkindDonationPerPage
    }
  },
  watch: {
    activeTab (value) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          view: ACTIVE_TAB_REVERSE_MAP[value]
        }
      })
    },
    ikdCategoryCustomFieldFilters (val) {
      this.$refs.ikdsTable.refresh()
    },
    'detailedFilters.showExpiringOnly' (value) {
      this.$refs.ikdsTable.refresh()

      this.$router.replace({
        query: {
          ...this.$route.query,
          'filters.showExpiringOnly': value
        }
      })
    }
  },
  created () {
    this.setDataFromRouteQuery()

    inkindDonationRepository.setAuthorizationHeader(`Bearer ${this.token}`)
  },
  methods: {
    setDataFromRouteQuery () {
      const query = this.$route.query

      const activeTab = ACTIVE_TAB_MAP[query.view]

      if (activeTab !== undefined) {
        this.activeTab = activeTab
      }

      const showExpiringOnly = query['filters.showExpiringOnly']

      if (showExpiringOnly !== undefined && showExpiringOnly.toLowerCase() === 'true') {
        this.detailedFilters.showExpiringOnly = true
      }
    },
    async getGroupedInkindDonations (ctx) {
      const queryString = new URLSearchParams()

      queryString.set('grouped', true)
      queryString.set('limit', this.groupedIkdPerPage)
      queryString.set('offset', this.groupedIkdPageOffset)

      const { data } = await apiClient.get(`/inkind-donations?${queryString.toString()}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      const { results, total } = data

      this.groupedIkdTotal = total

      return results
    },
    async getInkindDonations (ctx) {
      const {
        filter,
        sortBy,
        sortDesc
      } = ctx

      const limit = this.inkindDonationPerPage
      const offset = this.inkindDonationPageOffset
      const sort = {}

      if (sortBy !== undefined && sortBy !== '') {
        sort.field = IKD_SORT_MAP[sortBy]
        sort.order = sortDesc ? 'desc' : 'asc'
      }

      const { results, total } = await inkindDonationRepository.list({
        query: filter,
        categoryCustomFields: this.ikdCategoryCustomFieldFilters,
        showExpiringOnly: this.detailedFilters.showExpiringOnly
      }, {
        limit,
        offset,
        sort
      })

      this.inkindDonationTotal = total

      return results
    },
    hasIkdCustomCategory (value, field) {
      if (value === undefined) {
        return false
      }

      return value[field] !== undefined
    },
    showDeleteConfirmation (item) {
      this.confirmDeleteModal = {
        show: true,
        itemToDelete: item
      }
    },
    async deleteInkindDonation () {
      const itemId = this.confirmDeleteModal.itemToDelete._id

      await inkindDonationRepository.deleteOne(itemId)

      this.$refs.ikdsTable.refresh()
    },
    isExpiring (dateStr) {
      const date = new Date(dateStr)
      const todayAfterOneMonth = addMonths(new Date(), 1)

      return date <= todayAfterOneMonth
    }
  }
}
</script>
