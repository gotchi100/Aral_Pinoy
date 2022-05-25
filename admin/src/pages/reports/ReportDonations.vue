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

              <b-row
                class="py-4"
              >
                <b-col cols="12">
                  <h2 style="font-family:'Bebas Neue', cursive;">
                    Donors
                  </h2>
                </b-col>

                <b-col
                  class="d-flex w-100 justify-content-center"
                  cols="12"
                >
                  <bar-chart
                    :height="500"
                    :width="500"
                    :chart-data="{
                      labels: report.donors.labels,
                      datasets: [{
                        label: '',
                        data: report.donors.data,
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
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BarChart from '../../components/charts/Bar'
import TrendChart from '../../components/charts/Trend'

const today = new Date()

export default {
  name: 'ReportInkindDonations',
  components: {
    BarChart,
    TrendChart
  },
  data () {
    return {
      startDate: today,
      endDate: today,
      searchItem: '',
      inventoryItemOptions: [],
      item: null,
      report: {
        stockQuantity: {
          labels: ['Mar 1, 22', 'Mar 2, 22', 'Mar 3, 22'],
          data: [20, 33, 15]
        },
        donors: {
          labels: ['Red Ribbon', 'Anonymous', '3', '4', '5'],
          data: [20, 5, 3, 1, 100000]
        }
      }
    }
  },
  methods: {
    searchInventoryItem (value) {
      console.log(value)

      this.inventoryItemOptions = [{
        _id: '1234',
        name: 'Monde Fluffy Bread',
        sku: 'MONDE-FLUFFY-BREAD'
      }]
    }
  }
}
</script>
