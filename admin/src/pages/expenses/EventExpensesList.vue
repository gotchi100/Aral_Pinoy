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
                    Event Expenses
                  </h1>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <b-tabs
                    pills
                    card
                  >
                    <b-tab
                      title="Compiled View"
                      active
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
                                      v-model="groupedExpenses.perPage"
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
                            :items="getGroupedExpenses"
                            :fields="groupedExpenses.fields"
                            :current-page="groupedExpenses.currentPage"
                            :per-page="groupedExpenses.perPage"
                            stacked="sm"
                            style="background:white"
                            show-empty
                            primary-key="event._id"
                          >
                            <template #cell(event)="{ value }">
                              <b-link :to="`/events/${value._id}`">
                                {{ value.name }}
                              </b-link>
                            </template>

                            <template #cell(amount)="{ value }">
                              {{
                                new Intl.NumberFormat('en-us', {
                                  style: 'currency',
                                  currency: 'PHP'
                                }).format(value)
                              }}
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
                            v-model="groupedExpenses.currentPage"
                            :total-rows="groupedExpenses.total"
                            :per-page="groupedExpenses.perPage"
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
                                      v-model="expenses.perPage"
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
                            :items="getExpenses"
                            :fields="expenses.fields"
                            :current-page="expenses.currentPage"
                            :per-page="expenses.perPage"
                            fixed
                            stacked="sm"
                            style="background:white"
                            show-empty
                            small
                            primary-key="_id"
                          >
                            <template #cell(event)="{ value }">
                              <b-link :to="`/events/${value._id}`">
                                {{ value.name }}
                              </b-link>
                            </template>

                            <template #cell(amount)="{ value }">
                              {{
                                new Intl.NumberFormat('en-us', {
                                  style: 'currency',
                                  currency: 'PHP'
                                }).format(value)
                              }}
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
                            v-model="expenses.currentPage"
                            :total-rows="expenses.total"
                            :per-page="expenses.perPage"
                            align="fill"
                            size="sm"
                            class="my-0"
                          />
                        </b-col>
                      </b-row>
                    </b-tab>
                  </b-tabs>
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

import EventExpenseRepository from '../../repositories/events/expenses'
import { apiClient } from '../../axios'

const eventExpenseRepository = new EventExpenseRepository(apiClient)

export default {
  data () {
    return {
      pageOptions: [5, 10, 20],
      groupedExpenses: {
        total: 0,
        results: [],
        fields: [
          { key: 'event', label: 'Event' },
          { key: 'amount', label: 'Amount' }
        ],
        currentPage: 1,
        perPage: 5
      },
      expenses: {
        total: 0,
        results: [],
        fields: [
          { key: 'event', label: 'Event' },
          { key: 'type', label: 'Type' },
          { key: 'amount', label: 'Amount' },
          { key: 'remarks', label: 'Remarks' }
        ],
        currentPage: 1,
        perPage: 5
      }
    }
  },
  computed: {
    ...mapGetters(['token']),
    groupedExpensePageOffset () {
      const { currentPage, perPage } = this.groupedExpenses

      return (currentPage - 1) * perPage
    },
    expensePageOffset () {
      const { currentPage, perPage } = this.expenses

      return (currentPage - 1) * perPage
    }
  },
  created () {
    eventExpenseRepository.setAuthorizationHeader(`Bearer ${this.token}`)
  },
  methods: {
    async getGroupedExpenses (ctx) {
      const limit = this.groupedExpenses.perPage
      const offset = this.groupedExpensePageOffset

      const { results, total } = await eventExpenseRepository.list({}, {
        limit,
        offset,
        sort: {
          field: 'createdAt',
          order: 'desc'
        },
        grouped: true
      })

      this.groupedExpenses.total = total

      return results
    },
    async getExpenses (ctx) {
      const limit = this.expenses.perPage
      const offset = this.expensePageOffset

      const { results, total } = await eventExpenseRepository.list({}, {
        limit,
        offset,
        sort: {
          field: 'createdAt',
          order: 'desc'
        }
      })

      this.expenses.total = total

      return results
    }
  }
}
</script>
