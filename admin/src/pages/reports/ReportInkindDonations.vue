<template>
  <div>
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
                  <span>
                    Item
                  </span>

                  <b-dropdown
                    :text="item !== null ? `${item.name} - ${item.sku}` : 'Select an item'"
                    style="width: 100%"
                    menu-class="w-100"
                    variant="success"
                    :no-caret="item !== null"
                    no-flip
                  >
                    <b-dropdown-form>
                      <b-form-group
                        label="Search Item"
                        label-for="item-search-input"
                        @submit.stop.prevent
                      >
                        <b-form-input
                          id="item-search-input"
                          v-model="searchItem"
                          debounce="500"
                          @update="searchInventoryItem"
                        />
                      </b-form-group>
                    </b-dropdown-form>

                    <b-dropdown-divider />

                    <b-dropdown-item
                      v-for="inventoryItem in inventoryItemOptions"
                      :key="inventoryItem._id"
                      @click="item = inventoryItem"
                    >
                      {{ inventoryItem.name }} <span style="color: grey; font-size: 12px">{{ inventoryItem.sku }}</span>
                    </b-dropdown-item>
                  </b-dropdown>
                </b-col>
              </b-row>

              <template v-if="item !== null">
                <b-row

                  class="py-2"
                >
                  <b-col
                    cols="12"
                    md="6"
                  >
                    <label
                      for="start-datepicker"
                      style="font-family: 'Bebas Neue', cursive;"
                    >
                      From
                    </label>

                    <b-form-datepicker
                      id="start-datepicker"
                      v-model="startDate"
                      :max="endDate"
                      value-as-date
                      class="mb-2"
                    />
                  </b-col>

                  <b-col
                    cols="12"
                    md="6"
                  >
                    <label
                      for="end-datepicker"
                      style="font-family: 'Bebas Neue', cursive;"
                    >
                      To
                    </label>

                    <b-form-datepicker
                      id="end-datepicker"
                      v-model="endDate"
                      :max="new Date()"
                      value-as-date
                      class="mb-2"
                    />
                  </b-col>
                </b-row>

                <b-row class="py-2">
                  <b-col cols="12">
                    <b-button
                      pill
                      variant="danger"
                      :disabled="isGeneratingReport"
                      @click="getReportVolunteers"
                    >
                      <b-spinner
                        v-if="isGeneratingReport"
                        style="width: 1rem; height: 1rem;"
                      />

                      <template v-else>
                        Generate Report
                      </template>
                    </b-button>
                  </b-col>
                </b-row>
              </template>
            </b-container>
          </b-card>
        </b-col>
      </b-row>

      <b-row
        v-if="item !== null"
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
                class="py-4"
              >
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    {{ item.name }}
                  </h1>
                </b-col>
              </b-row>

              <b-row
                class="py-4"
              >
                <b-col cols="12">
                  <h2 style="font-family:'Bebas Neue', cursive;">
                    Stock Quantity
                  </h2>
                </b-col>

                <b-col
                  class="d-flex w-100 justify-content-center"
                  cols="12"
                >
                  <trend-chart
                    :height="500"
                    :width="500"
                    :chart-data="{
                      labels: report.stockQuantity.labels,
                      datasets: [{
                        data: report.stockQuantity.data,
                        backgroundColor: [
                          'rgb(255, 99, 132)',
                        ],
                        borderColor: 'rgb(75, 192, 192)',
                      }]
                    }"
                    :options="{
                      scales: {
                        yAxes: {
                          ticks: {
                            beginAtZero: true,
                          }
                        }
                      },
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false
                        },
                      }
                    }"
                  />
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
import InkindDonationRepository from '../../repositories/inkind-donations'
import { apiClient } from '../../axios'

import TrendChart from '../../components/charts/Trend'

const inkindDonationRepository = new InkindDonationRepository(apiClient)
const reportRepository = new ReportRepository(apiClient)

const today = new Date()

export default {
  name: 'ReportInkindDonations',
  components: {
    TrendChart
  },
  data () {
    return {
      startDate: today,
      endDate: today,
      searchItem: '',
      inventoryItemOptions: [],
      item: null,
      isGeneratingReport: false,
      report: {
        stockQuantity: {
          labels: [],
          data: []
        }
      }
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  created () {
    const authHeader = `Bearer ${this.token}`

    inkindDonationRepository.setAuthorizationHeader(authHeader)
    reportRepository.setAuthorizationHeader(authHeader)
  },
  methods: {
    async searchInventoryItem (value) {
      const { results } = await inkindDonationRepository.list({
        query: value
      }, {
        limit: 5
      })

      this.inventoryItemOptions = results
    },
    async getReportVolunteers () {
      const startDate = this.startDate.toJSON()
      const endDate = this.endDate.toJSON()

      this.isGeneratingReport = true
      const itemId = this.item._id

      try {
        const { results } = await reportRepository.getInventoryItem({
          itemId,
          dateRange: {
            start: startDate,
            end: endDate
          }
        })

        this.report.stockQuantity = results.stockQuantity
      } finally {
        this.isGeneratingReport = false
      }
    }
  }
}
</script>
