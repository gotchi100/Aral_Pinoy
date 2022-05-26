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
                    Monetary Donations Report
                  </h2>
                </b-col>
              </b-row>

              <b-row class="py-2">
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
                    @click="getReportMonetaryDonations"
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
            </b-container>
          </b-card>
        </b-col>
      </b-row>

      <b-row class="pb-3">
        <b-col cols="12">
          <b-card
            bg-variant="light"
            style="border-radius: 20px;"
          >
            <b-container
              fluid
            >
              <!-- <b-row
                class="py-4"
              >
                <b-col cols="12">
                  <h2 style="font-family:'Bebas Neue', cursive;">
                    Income Statement
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
                      labels: report.incomeStatement.labels,
                      datasets: [{
                        label: 'Income',
                        data: report.incomeStatement.dataset[0].data,
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: ['rgb(75, 192, 192)']
                      }, {
                        label: 'Expenses',
                        data: report.incomeStatement.dataset[1].data,
                        borderColor: 'rgb(192, 75, 75)',
                        backgroundColor: ['rgb(192, 75, 75)']
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
              </b-row> -->

              <b-row
                class="py-4"
              >
                <b-col cols="12">
                  <h2 style="font-family:'Bebas Neue', cursive;">
                    Aral Pinoy Donations
                  </h2>
                </b-col>

                <b-col
                  class="d-flex w-100 justify-content-center"
                  cols="12"
                >
                  <bar-chart
                    :height="600"
                    :width="600"
                    :chart-data="{
                      labels: report.monetaryDonations.labels,
                      datasets: [{
                        label: '',
                        data: report.monetaryDonations.data,
                        backgroundColor: report.monetaryDonations.backgroundColors,
                      }]
                    }"
                    :options="{
                      scales: {
                        yAxes: {
                          ticks: {
                            min: 0,
                            beginAtZero: true,
                            precision: 0
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
import * as randomColor from 'randomcolor'

import ReportRepository from '../../repositories/reports'
import { apiClient } from '../../axios'

import BarChart from '../../components/charts/Bar'
// import TrendChart from '../../components/charts/Trend'

const reportRepository = new ReportRepository(apiClient)

const today = new Date()

export default {
  name: 'ReportMonetaryDonations',
  components: {
    BarChart
    // TrendChart
  },
  data () {
    return {
      startDate: today,
      endDate: today,
      isGeneratingReport: false,
      report: {
        // incomeStatement: {
        //   labels: ['Mar 1', 'Mar 2', 'Mar 3'],
        //   dataset: [{
        //     data: [7008, 5000, 9000]
        //   }, {
        //     data: [1234, 3333, 7601]
        //   }]
        // },
        monetaryDonations: {
          labels: [],
          data: []
        }
      }
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {
    endDate (value) {
      const startDate = new Date(this.startDate)
      const endDate = new Date(value)

      if (startDate > endDate) {
        this.startDate = endDate
      }
    }
  },
  created () {
    const authHeader = `Bearer ${this.token}`

    reportRepository.setAuthorizationHeader(authHeader)
  },
  methods: {
    async getReportMonetaryDonations () {
      const startDate = this.startDate.toJSON()
      const endDate = this.endDate.toJSON()

      this.isGeneratingReport = true

      try {
        const { results } = await reportRepository.getMonetaryDonations({
          start: startDate,
          end: endDate
        })

        this.report.monetaryDonations = results.monetaryDonations

        const backgroundColors = randomColor({
          hue: 'random',
          luminosity: 'dark',
          count: results.monetaryDonations.labels.length
        })

        this.report.monetaryDonations.backgroundColors = backgroundColors
      } finally {
        this.isGeneratingReport = false
      }
    }
  }
}
</script>
