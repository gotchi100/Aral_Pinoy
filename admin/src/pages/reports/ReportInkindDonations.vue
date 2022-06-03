<template>
  <div>
    <b-container class="py-5">
      <b-row class="pb-3">
        <b-col cols="12">
          <b-card
            bg-variant="light"
            style="border-radius: 20px;"
          >
            <b-container
              fluid
            >
              <b-row
                class="py-2"
              >
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Deleted Inventory Items
                  </h1>

                  <h6>
                    As of {{ new Date().toLocaleString('en-us', { dateStyle: 'medium' }) }}
                  </h6>
                </b-col>
              </b-row>

              <b-row class="pb-3">
                <b-col cols="12">
                  <b-table
                    :items="getDeletedInventoryItems"
                    :fields="deletedInventoryItems.fields"
                    :current-page="deletedInventoryItems.pagination.currentPage"
                    :per-page="deletedInventoryItems.pagination.perPage"
                    fixed
                    stacked="sm"
                    style="background:white"
                    show-empty
                    primary-key="_id"
                  >
                    <template #cell(deletedOn)="{ item }">
                      <span>
                        {{
                          new Date(item.deletedOn).toLocaleString('en-us', {
                            dateStyle: 'medium'
                          })
                        }}
                      </span>
                    </template>
                  </b-table>
                </b-col>

                <b-col cols="12">
                  <b-pagination
                    v-model="deletedInventoryItems.pagination.currentPage"
                    :total-rows="deletedInventoryItems.total"
                    :per-page="deletedInventoryItems.pagination.perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                  />
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="py-5">
      <b-row class="pb-3">
        <b-col cols="12">
          <b-card
            bg-variant="light"
            style="border-radius: 20px;"
          >
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <h2 style="font-family:'Bebas Neue', cursive;">
                    Expiring Items Inventory Report
                  </h2>
                </b-col>
              </b-row>

              <b-row class="py-2">
                <b-col cols="12">
                  <b-button
                    pill
                    variant="danger"
                    :disabled="report.expiringInventoryItems.isGeneratingReport"
                    @click="getExpiringInventoryItems"
                  >
                    <b-spinner
                      v-if="report.expiringInventoryItems.isGeneratingReport"
                      style="width: 1rem; height: 1rem;"
                    />

                    <template v-else>
                      Generate Report
                    </template>
                  </b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>

      <b-row
        v-if="report.expiringInventoryItems.hasGeneratedReport"
        class="pb-3"
      >
        <b-col cols="12">
          <b-card
            bg-variant="light"
            style="border-radius: 20px;"
          >
            <b-container
              fluid
            >
              <b-row
                class="py-2"
              >
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Expiring Inventory Items
                  </h1>

                  <h6>
                    As of {{ new Date().toLocaleString('en-us', { dateStyle: 'medium' }) }}
                  </h6>
                </b-col>
              </b-row>

              <b-row class="pb-3">
                <b-col cols="12">
                  <b-list-group>
                    <b-list-group-item
                      v-for="inventoryItem in report.expiringInventoryItems.results"
                      :key="inventoryItem._id"
                    >
                      {{ inventoryItem.name }} <br>
                      <span style="color: grey; font-size: 12px">
                        {{ new Date(getItemExpirationDate(inventoryItem)).toLocaleString('en-us', { dateStyle: 'medium' }) }}
                      </span>
                    </b-list-group-item>
                  </b-list-group>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="py-5">
      <b-row class="pb-3">
        <b-col cols="12">
          <b-card
            bg-variant="light"
            style="border-radius: 20px;"
          >
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <h2 style="font-family:'Bebas Neue', cursive;">
                    Items Inventory Report
                  </h2>
                </b-col>
              </b-row>

              <b-row class="py-2">
                <b-col cols="12">
                  <b-button
                    pill
                    variant="danger"
                    :disabled="report.inventoryItems.isGeneratingReport"
                    @click="getInventoryItems"
                  >
                    <b-spinner
                      v-if="report.inventoryItems.isGeneratingReport"
                      style="width: 1rem; height: 1rem;"
                    />

                    <template v-else>
                      Generate Report
                    </template>
                  </b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>

      <b-row
        v-if="report.inventoryItems.hasGeneratedReport"
        class="pb-3"
      >
        <b-col cols="12">
          <b-card
            bg-variant="light"
            style="border-radius: 20px;"
          >
            <b-container
              fluid
            >
              <b-row
                class="py-2"
              >
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Inventory Items by Group
                  </h1>

                  <h6>
                    As of {{ new Date().toLocaleString('en-us', { dateStyle: 'medium' }) }}
                  </h6>
                </b-col>
              </b-row>

              <b-row class="pb-3">
                <b-col cols="12">
                  <b-list-group>
                    <b-list-group-item
                      v-for="inventoryItem in report.inventoryItems.itemsByGroup"
                      :key="inventoryItem._id"
                    >
                      {{ inventoryItem._id }} - <strong>{{ inventoryItem.quantity }}</strong>
                    </b-list-group-item>
                  </b-list-group>
                </b-col>
              </b-row>
            </b-container>

            <b-container
              fluid
            >
              <b-row
                class="py-2"
              >
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Inventory Items by Category
                  </h1>

                  <h6>
                    As of {{ new Date().toLocaleString('en-us', { dateStyle: 'medium' }) }}
                  </h6>
                </b-col>
              </b-row>

              <b-row class="pb-3">
                <b-col cols="12">
                  <b-list-group>
                    <b-list-group-item
                      v-for="inventoryItem in report.inventoryItems.itemsByCategory"
                      :key="inventoryItem._id"
                    >
                      {{ inventoryItem._id }} - <strong>{{ inventoryItem.quantity }}</strong>
                    </b-list-group-item>
                  </b-list-group>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ReportRepository from '../../repositories/reports'
import { apiClient } from '../../axios'

const reportRepository = new ReportRepository(apiClient)

export default {
  name: 'ReportInkindDonations',
  data () {
    return {
      isGeneratingReport: false,
      report: {
        expiringInventoryItems: {
          hasGeneratedReport: false,
          isGeneratingReport: false,
          results: []
        },
        inventoryItems: {
          hasGeneratedReport: false,
          isGeneratingReport: false,
          itemsByGroup: [],
          itemsByCategory: []
        }
      },
      deletedInventoryItems: {
        results: [],
        total: 0,
        pagination: {
          currentPage: 1,
          perPage: 25
        },
        fields: [
          { key: 'sku', label: 'SKU', sortable: true },
          { key: 'name', label: 'Item', sortable: true },
          { key: 'category.name', label: 'Category' },
          { key: 'deletedOn', label: 'Date of Deletion', sortable: true }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  created () {
    const authHeader = `Bearer ${this.token}`

    reportRepository.setAuthorizationHeader(authHeader)
  },
  methods: {
    async getDeletedInventoryItems (ctx) {
      const {
        sortBy,
        sortDesc
      } = ctx

      const { currentPage, perPage } = this.deletedInventoryItems.pagination

      const offset = this.calculateOffset(currentPage, perPage)
      let sort

      if (sortBy !== undefined && sortBy !== '') {
        sort = {
          field: sortBy,
          order: sortDesc ? 'desc' : 'asc'
        }
      }

      const { results, total } = await reportRepository.getDeletedInventoryItems({
        start: new Date(0).toJSON(),
        end: new Date().toJSON()
      }, {
        limit: perPage,
        offset,
        sort
      })

      this.deletedInventoryItems.total = total

      return results
    },
    async getExpiringInventoryItems () {
      const expiringInventoryItems = this.report.expiringInventoryItems

      expiringInventoryItems.isGeneratingReport = true
      expiringInventoryItems.hasGeneratedReport = false

      try {
        const { results } = await reportRepository.getExpiringInventoryItems()

        expiringInventoryItems.results = results
        expiringInventoryItems.hasGeneratedReport = true
      } finally {
        expiringInventoryItems.isGeneratingReport = false
      }
    },
    async getInventoryItems () {
      const inventoryItems = this.report.inventoryItems

      inventoryItems.isGeneratingReport = true
      inventoryItems.hasGeneratedReport = false

      try {
        const { results } = await reportRepository.getInventoryItems()

        inventoryItems.itemsByGroup = results.inventoryItemsByGroup
        inventoryItems.itemsByCategory = results.inventoryItemsByCategory
        inventoryItems.hasGeneratedReport = true
      } finally {
        inventoryItems.isGeneratingReport = false
      }
    },
    getItemExpirationDate (item) {
      if (item.category.customFields.expirationDate !== undefined) {
        return new Date(item.category.customFields.expirationDate)
      }

      if (item.category.customFields.bestBeforeDate !== undefined) {
        return new Date(item.category.customFields.bestBeforeDate)
      }
    },
    calculateOffset (currentPage, perPage) {
      return (currentPage - 1) * perPage
    }
  }
}
</script>
