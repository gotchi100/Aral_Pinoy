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
                    Event Summary
                  </h1>
                </b-col>
              </b-row>

              <b-row
                v-if="eventVolunteers.length > 0"
                class="mb-3"
              >
                <b-col cols="12">
                  <b-card
                    title="Attendance"
                    style="text-align: left"
                  >
                    <b-list-group flush>
                      <b-list-group-item
                        v-for="item in eventVolunteers"
                        :key="item._id"
                        href="#"
                      >
                        <b-icon
                          :class="item.present ? 'text-success' : 'text-danger'"
                          :icon="item.present ? 'check-circle' : 'x-circle'"
                        />  {{ `${item.user.firstName} ${item.user.lastName}` }}
                      </b-list-group-item>
                    </b-list-group>
                  </b-card>
                </b-col>
              </b-row>

              <b-row class="mb-3">
                <b-col cols="12">
                  <b-card
                    title="Items Used"
                    style="text-align: left"
                  >
                    <b-list-group flush>
                      <b-list-group-item href="#">
                        2 Water Bottles
                      </b-list-group-item>

                      <b-list-group-item href="#">
                        4 Brooms
                      </b-list-group-item>

                      <b-list-group-item href="#">
                        10 Shirts
                      </b-list-group-item>

                      <b-list-group-item href="#">
                        2 Corned Beef Cans
                      </b-list-group-item>
                    </b-list-group>
                  </b-card>
                </b-col>
              </b-row>

              <b-row class="mb-3">
                <b-col cols="12">
                  <b-card
                    title="Expenses"
                    style="text-align: left"
                  >
                    <b-row>
                      <b-col cols="12">
                        <b-container
                          fluid
                          style="width: 500px; height: 500px"
                        >
                          <b-row>
                            <b-col cols="12">
                              <pie-chart
                                :height="100"
                                :width="100"
                                :chart-data="{
                                  labels: eventExpenses.labels,
                                  datasets: eventExpenses.datasets
                                }"
                                :options="{
                                  responsive: true,
                                  plugins: {
                                    legend: {
                                      position: 'top',
                                    }
                                  }
                                }"
                              />
                            </b-col>
                          </b-row>
                        </b-container>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>

              <b-row class="mb-3">
                <b-col cols="12">
                  <b-card
                    title="Incidents"
                    style="text-align: left"
                  >
                    <b-list-group flush>
                      <b-list-group-item
                        href="#"
                      >
                        Test Person got injured
                      </b-list-group-item>

                      <b-list-group-item
                        href="#"
                      >
                        Ran out of food
                      </b-list-group-item>
                    </b-list-group>
                  </b-card>
                </b-col>
              </b-row>

              <b-row class="mb-3">
                <b-col cols="12">
                  <b-card
                    title="Goals"
                    style="text-align: left"
                  >
                    <b-row
                      v-for="(goal, i) in goals"
                      :key="`evaluation-${i}`"
                    >
                      <b-col cols="12">
                        <b-container fluid>
                          <b-row
                            class="py-5"
                          >
                            <b-col cols="12">
                              <bar-chart
                                :height="100"
                                :chart-data="{
                                  labels: goal.labels,
                                  datasets: goal.datasets
                                }"
                                :options="{
                                  indexAxis: 'y',
                                  datasets: {
                                    bar: {
                                      barPercentage: '0.4',
                                    }
                                  },
                                  tooltips: {
                                    enabled: false
                                  },
                                  elements: {
                                    bar: {
                                      borderWidth: 2,
                                    }
                                  },
                                  scales: {
                                    yAxes: {
                                      display: false,
                                      stacked: true,
                                    },
                                    xAxes: {
                                      stacked: true,
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
                                      position: 'top',
                                    },
                                    title: {
                                      display: true,
                                      text: goal.title
                                    }
                                  }
                                }"
                              />
                            </b-col>
                          </b-row>
                        </b-container>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>

              <b-row class="mb-3">
                <b-col cols="12">
                  <b-card
                    title="SDG Evaluations"
                    style="text-align: left"
                  >
                    <b-row
                      v-for="(evaluation, i) in sdgEvaluations"
                      :key="`evaluation-${i}`"
                      class="mb-4"
                    >
                      <b-col cols="12">
                        <b-card
                          :title="evaluation.name"
                          style="text-align: left"
                        >
                          <b-container fluid>
                            <b-row
                              v-for="(question, j) in evaluation.questions"
                              :key="`question-${j}`"
                              class="py-5"
                            >
                              <b-col cols="12">
                                <bar-chart
                                  :height="100"
                                  :chart-data="{
                                    labels: question.labels,
                                    datasets: question.datasets
                                  }"
                                  :options="{
                                    indexAxis: 'y',
                                    datasets: {
                                      bar: {
                                        barPercentage: '0.5',
                                      }
                                    },
                                    elements: {
                                      bar: {
                                        borderWidth: 2,
                                      }
                                    },
                                    scales: {
                                      yAxes: {
                                        display: false
                                      },
                                      xAxes: {
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
                                        position: 'top',
                                      },
                                      title: {
                                        display: true,
                                        text: question.title
                                      }
                                    }
                                  }"
                                />
                              </b-col>
                            </b-row>
                          </b-container>
                        </b-card>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>

              <b-row class="mb-3">
                <b-col cols="12">
                  <b-card
                    title="Event Questionnaire"
                    style="text-align: left"
                  >
                    <b-row
                      v-for="(question, i) in eventQuestionnaire"
                      :key="`evaluation-${i}`"
                    >
                      <b-col cols="12">
                        <b-container fluid>
                          <b-row
                            class="py-5"
                          >
                            <b-col cols="12">
                              <bar-chart
                                :height="150"
                                :chart-data="{
                                  labels: question.labels,
                                  datasets: question.datasets
                                }"
                                :options="{
                                  indexAxis: 'y',
                                  datasets: {
                                    bar: {
                                      barPercentage: '0.65',
                                    }
                                  },
                                  elements: {
                                    bar: {
                                      borderWidth: 2,
                                    }
                                  },
                                  scales: {
                                    yAxes: {
                                      display: false
                                    },
                                    xAxes: {
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
                                      position: 'top',
                                    },
                                    title: {
                                      display: true,
                                      text: question.title
                                    }
                                  }
                                }"
                              />
                            </b-col>
                          </b-row>
                        </b-container>
                      </b-col>
                    </b-row>
                  </b-card>
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

import BarChart from '../../components/charts/Bar'
import PieChart from '../../components/charts/Pie'

const successColor = '#198754'
const dangerColor = '#dc3545'

const polarQuestionColors = {
  'Very Satisfied': successColor,
  Satisfied: '#16784a',
  Neutral: '#b8b8b8',
  Dissatisfied: '#dc3545',
  'Very Dissatisfied': '#9c2531'
}

export default {
  components: {
    BarChart,
    PieChart
  },
  data () {
    return {
      fields: [
        { key: 'name', label: 'Event Name', sortable: true },
        { key: 'date', label: 'Date', sortable: true },
        { key: 'location.name', label: 'Venue' },
        { key: 'status', label: 'Status' }
      ],
      events: [],
      total: 0,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 20],
      searchFilter: '',
      statusFilters: ['UPCOMING'],
      statusOptions: ['UPCOMING', 'ENDED', 'CANCELED'],
      eventVolunteers: [{
        _id: '1234',
        present: false,
        user: {
          _id: '5678',
          firstName: 'Test',
          lastName: 'Person'
        }
      }, {
        _id: '5678',
        present: true,
        user: {
          _id: 'abadwa',
          firstName: 'Test',
          lastName: 'Person 2'
        }
      }]
    }
  },
  computed: {
    ...mapGetters(['token']),
    goals () {
      return [{
        title: 'Volunteer Attendance',
        labels: [''],
        datasets: [
          {
            label: 'Present',
            backgroundColor: successColor,
            data: [2]
          },
          {
            label: 'Absent',
            backgroundColor: dangerColor,
            data: [3]
          }
        ]
      }, {
        title: 'Monetary Donation',
        labels: [''],
        datasets: [
          {
            label: 'Current',
            backgroundColor: successColor,
            data: [4000]
          },
          {
            label: 'Remaining Target',
            backgroundColor: dangerColor,
            data: [1000]
          }
        ]
      }]
    },
    eventExpenses () {
      const backgroundColor = randomColor({
        count: 3,
        format: 'rgb'
      })

      return {
        labels: ['Food', 'Seeds', 'Misc'],
        datasets: [
          {
            backgroundColor,
            data: [1000, 7000, 500]
          }
        ]
      }
    },
    sdgEvaluations () {
      return [{
        name: '#13 Climate Action',
        questions: [{
          title: 'Did this strengthen resilience and adaptive capacity to climate related hazards and natural disasters in the area?',
          labels: [''],
          datasets: [
            {
              label: 'Yes',
              backgroundColor: successColor,
              data: [1]
            }, {
              label: 'No',
              backgroundColor: dangerColor,
              data: [3]
            }
          ]
        }, {
          title: 'Did this Integrate climate change measures into strategies and planning in the area?',
          labels: [''],
          datasets: [
            {
              label: 'Yes',
              backgroundColor: successColor,
              data: [4]
            }, {
              label: 'No',
              backgroundColor: dangerColor,
              data: [0]
            }
          ]
        }, {
          title: 'Did this Improve education, awareness-raising and human and institutional capacity on climate change mitigation, adaptation, impact reduction and early warning in the area?',
          labels: [''],
          datasets: [
            {
              label: 'Yes',
              backgroundColor: successColor,
              data: [0]
            }, {
              label: 'No',
              backgroundColor: dangerColor,
              data: [4]
            }
          ]
        }]
      }, {
        name: '#4 Quality Education',
        questions: [{
          title: 'Did this help in reducing gender disparities in education and ensure equal access to all levels of education and vocational training for the vulnerable, including persons with disabilities, indigenous peoples and children in vulnerable situations?',
          labels: [''],
          datasets: [
            {
              label: 'Yes',
              backgroundColor: successColor,
              data: [2]
            }, {
              label: 'No',
              backgroundColor: dangerColor,
              data: [2]
            }
          ]
        }, {
          title: 'Did this teach knowledge and skills needed to promote sustainable development, including, among others, through education for sustainable development and sustainable lifestyles, human rights, gender equality, promotion of a culture of peace and non-violence, global citizenship and appreciation of cultural diversity and of culture’s contribution to sustainable development?',
          labels: [''],
          datasets: [
            {
              label: 'Yes',
              backgroundColor: successColor,
              data: [3]
            }, {
              label: 'No',
              backgroundColor: dangerColor,
              data: [1]
            }
          ]
        }]
      }]
    },
    eventQuestionnaire () {
      return [{
        title: 'How satisfied are you with the event?',
        labels: [''],
        datasets: [
          {
            label: 'Very Satisfied',
            backgroundColor: polarQuestionColors['Very Satisfied'],
            data: [1]
          },
          {
            label: 'Satisfied',
            backgroundColor: polarQuestionColors.Satisfied,
            data: [2]
          },
          {
            label: 'Neutral',
            backgroundColor: polarQuestionColors.Neutral,
            data: [3]
          },
          {
            label: 'Dissatisfied',
            backgroundColor: polarQuestionColors.Dissatisfied,
            data: [4]
          },
          {
            label: 'Very Dissatisfied',
            backgroundColor: polarQuestionColors['Very Dissatisfied'],
            data: [5]
          }
        ]
      }]
    }
  }
}
</script>
