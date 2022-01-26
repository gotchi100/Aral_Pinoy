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
                      <b-row>
                        <b-col cols="12">
                          <b-container>
                            <b-row>
                              <b-col cols="4">
                                <b-form-group
                                  style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                                  label="Per page"
                                  label-for="grouped-ikd-per-page-select"
                                  content-cols="12"
                                >
                                  <b-form-select
                                    id="grouped-ikd-per-page-select"
                                    class="w-25"
                                    v-model="groupedIkdPerPage"
                                    :options="pageOptions"
                                  ></b-form-select>
                                </b-form-group>
                              </b-col>

                              <!-- TODO: Implement search for compiled inkind donations -->
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
                                    v-model="inkindDonationPerPage"
                                    :options="pageOptions"
                                  ></b-form-select>
                                </b-form-group>
                              </b-col>

                              <!-- TODO: Implement search for detailed inkind donations -->
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
                            :items="getInkindDonations"
                            :fields="inkindDonationFields"
                            :current-page="inkindDonationCurrentPage"
                            :per-page="inkindDonationPerPage"
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

const { apiClient } = require('../../axios')

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
      inkindDonationFields: [
        { key: 'sku', label: 'SKU' },
        { key: 'name', label: 'Item' },
        { key: 'donor', label: 'Donor' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'category.name', label: 'Category' },
        { key: 'bestBeforeDate', label: 'Best Before' },
        { key: 'expirationDate', label: 'Expiration Date' }
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
      const queryString = new URLSearchParams()

      queryString.set('limit', this.inkindDonationPerPage)
      queryString.set('offset', this.inkindDonationPageOffset)

      const { data } = await apiClient.get(`/inkind-donations?${queryString.toString()}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      const { results, total } = data

      this.inkindDonationTotal = total

      return results
    },
    hasIkdCustomCategory (value, field) {
      if (value === undefined) {
        return false
      }

      return value[field] !== undefined
    }
  }
}
</script>
