<template>
  <div>
    <b-container class="py-5">
      <b-row>
        <b-col cols="12">
          <b-card class="card" style="border-radius: 20px;">
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    In-Kind Donations Inventory
                  </h1>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <b-tabs pills card>
                    <b-tab title="Compiled View" active>
                      <b-row class="my-2">
                        <b-col cols="12">
                          <b-container>
                            <b-row class="mb-4" align-v="center" align-h="start">
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
                                    <select v-model="groupedIkdPerPage" class="form-select form-select-sm" aria-label="Default select example">
                                      <option v-for="option in pageOptions" :key="option">
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
                          ></b-table>
                        </b-col>
                      </b-row>

                      <b-row class="pt-4 justify-content-md-center">
                        <b-col cols="6" class="my-1">
                          <b-pagination
                            v-model="groupedIkdCurrentPage"
                            :total-rows="groupedIkdTotal"
                            :per-page="groupedIkdPerPage"
                            align="fill"
                            size="sm"
                            class="my-0"
                          ></b-pagination>
                        </b-col>
                      </b-row>
                    </b-tab>

                    <b-tab title="Detailed View">
                      <b-row class="my-2">
                        <b-col cols="12">
                          <b-container>
                            <b-row class="mb-4" align-v="center" align-h="around">
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
                                    <select v-model="inkindDonationPerPage" class="form-select form-select-sm" aria-label="Default select example">
                                      <option v-for="option in pageOptions" :key="option">
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
                                      class="form-control"
                                      v-model="inkindDonationSearchFilter"
                                      type="search"
                                      size="sm"
                                      debounce="500"
                                    ></b-form-input>
                                  </b-col>
                                </b-row>
                              </b-col>

                              <b-col cols="4">
                                <b-dropdown class="w-50" size="sm" text="Filter Options">
                                  <b-dropdown-form style="width: 100%">
                                    <div v-for="option in ikdCategoryCustomFieldsOptions" :key="option.value" class="form-check form-switch">
                                      <label class="form-check-label" :for="`status-checkbox-${option}`">
                                        {{ option.label }}
                                      </label>

                                      <input
                                        :id="`status-checkbox-${option.value}`"
                                        class="form-check-input"
                                        type="checkbox"
                                        :value="option.value"
                                        v-model="ikdCategoryCustomFieldFilters"
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
                            <template #cell(bestBeforeDate)="row">
                              <span v-if="row.item.category !== undefined && hasIkdCustomCategory(row.item.category.customFields, 'bestBeforeDate')">
                                {{
                                  new Date(row.item.category.customFields.bestBeforeDate).toLocaleString('en-us', {
                                    dateStyle: 'medium'
                                  })
                                }}
                              </span>
                            </template>

                            <template #cell(expirationDate)="row">
                              <span v-if="row.item.category !== undefined && hasIkdCustomCategory(row.item.category.customFields, 'expirationDate')">
                                {{
                                  new Date(row.item.category.customFields.expirationDate).toLocaleString('en-us', {
                                    dateStyle: 'medium'
                                  })
                                }}
                              </span>
                            </template>
                          </b-table>
                        </b-col>
                      </b-row>

                      <b-row class="pt-4 justify-content-md-center">
                        <b-col cols="6" class="my-1">
                          <b-pagination
                            v-model="inkindDonationCurrentPage"
                            :total-rows="inkindDonationTotal"
                            :per-page="inkindDonationPerPage"
                            align="fill"
                            size="sm"
                            class="my-0"
                          ></b-pagination>
                        </b-col>
                      </b-row>
                    </b-tab>
                  </b-tabs>

                  <b-row class="pt-4" align-h="end">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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

export default {
  components: {
    InkindDonationCreateItemModal,
    InkindDonationTransactionModal
  },
  data () {
    return {
      pageOptions: [5, 10, 20],
      groupedFields: [
        { key: '_id', label: 'Group' },
        { key: 'quantity', label: 'Quantity' }
      ],
      groupedIkdTotal: 0,
      groupedIkdCurrentPage: 1,
      groupedIkdPerPage: 5,
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
        { key: 'expirationDate', label: 'Expiration Date', sortable: true }
      ],
      inkindDonations: [],
      inkindDonationTotal: 0,
      inkindDonationCurrentPage: 1,
      inkindDonationPerPage: 5,
      createItemModal: false,
      transactionModal: false
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
  created () {
    inkindDonationRepository.setAuthorizationHeader(`Bearer ${this.token}`)
  },
  methods: {
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
        categoryCustomFields: this.ikdCategoryCustomFieldFilters
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
    }
  },
  watch: {
    ikdCategoryCustomFieldFilters (val) {
      this.$refs.ikdsTable.refresh()
    }
  }
}
</script>
