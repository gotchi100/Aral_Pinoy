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
                    Events Report
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
                  >From</label>

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
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Demographics
                  </h1>
                </b-col>
              </b-row>

              <b-row
                class="py-4"
              >
                <b-col cols="12">
                  <h2 style="font-family:'Bebas Neue', cursive;">
                    Age
                  </h2>
                </b-col>

                <b-col
                  class="d-flex w-100 justify-content-center"
                  cols="12"
                >
                  <bar-chart
                    :height="400"
                    :chart-data="{
                      labels: report.age.labels,
                      datasets: [{
                        label: '',
                        data: report.age.data,
                        backgroundColor: [
                          'rgb(54, 162, 235)',
                          'rgb(255, 99, 132)',
                          'rgb(255, 219, 99)',
                        ],
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

              <b-row
                class="py-4"
              >
                <b-col cols="12">
                  <h2 style="font-family:'Bebas Neue', cursive;">
                    Gender
                  </h2>
                </b-col>

                <b-col
                  class="d-flex w-100 justify-content-center"
                  cols="12"
                >
                  <pie-chart
                    :styles="{ 'width': '30%' }"
                    :chart-data="{
                      labels: report.gender.labels,
                      datasets: [{
                        label: '',
                        data: report.gender.data,
                        backgroundColor: [
                          'rgb(54, 162, 235)',
                          'rgb(255, 99, 132)',
                        ],
                      }]
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
import BarChart from '../../components/charts/Bar'
import PieChart from '../../components/charts/Pie'

const today = new Date()

export default {
  name: 'ReportEvents',
  components: {
    BarChart,
    PieChart
  },
  data () {
    return {
      startDate: today,
      endDate: today,
      report: {
        age: {
          labels: ['Below 18', '18-59', '60 and above'],
          data: [20, 20, 50]
        },
        gender: {
          labels: ['Male', 'Female'],
          data: [20, 50]
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
  }
}
</script>
