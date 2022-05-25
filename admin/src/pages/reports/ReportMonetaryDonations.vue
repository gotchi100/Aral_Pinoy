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
                    class="mb-2"
                  />
                </b-col>
              </b-row>

              <b-row class="py-2">
                <b-col cols="12">
                  <b-button
                    pill
                    variant="danger"
                  >
                    Generate Report
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
              <b-row
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
              </b-row>

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
import * as randomColor from 'randomcolor'

import BarChart from '../../components/charts/Bar'
import TrendChart from '../../components/charts/Trend'

const today = new Date()

const backgroundColors = randomColor({
  hue: 'random',
  luminosity: 'dark',
  count: 4
})

export default {
  name: 'ReportMonetaryDonations',
  components: {
    BarChart,
    TrendChart
  },
  data () {
    return {
      startDate: today,
      endDate: today,
      report: {
        incomeStatement: {
          labels: ['Mar 1', 'Mar 2', 'Mar 3'],
          dataset: [{
            data: [7008, 5000, 9000]
          }, {
            data: [1234, 3333, 7601]
          }]
        },
        monetaryDonations: {
          labels: ['Google', 'Apple', 'Anonymous', 'Microsoft'],
          data: [609, 409, 7008, 5000],
          backgroundColors
        }
      }
    }
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
  methods: {

  }
}
</script>
