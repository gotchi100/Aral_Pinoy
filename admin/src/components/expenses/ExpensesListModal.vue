<template>
  <b-modal
    v-model="modal"
    size="xl"
    hide-footer
    lazy
    @hide="$emit('close')"
  >
    <b-card v-if="event !== null">
      <b-container fluid>
        <b-row>
          <b-col cols="12">
            <h1
              style="font-family:'Bebas Neue', cursive;"
              no-body
              class="text-center"
            >
              {{ event.name }}
            </h1>
          </b-col>
        </b-row>

        <template v-if="event.budget !== undefined">
          <b-row class="pt-4">
            <b-col cols="12">
              <h4
                style="font-family:'Bebas Neue', cursive;"
                no-body
              >
                Proposed Budget:
                {{
                  new Intl.NumberFormat('en-us', {
                    style: 'currency',
                    currency: 'PHP'
                  }).format(totalAmountFromBreakdown)
                }}
              </h4>
            </b-col>
          </b-row>

          <b-row class="pt-4">
            <b-col cols="12">
              <b-table
                :items="event.budget.breakdown"
                :fields="budget.fields"
                :current-page="budget.pagination.currentPage"
                :per-page="5"
                stacked="md"
                style="background:white"
                show-empty
                small
                primary-key="_id"
                hover
              >
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
                v-model="budget.pagination.currentPage"
                :total-rows="event.budget.breakdown.length"
                :per-page="budget.pagination.perPage"
                align="fill"
                size="sm"
                class="my-0"
              />
            </b-col>
          </b-row>
        </template>

        <b-row class="pt-4">
          <b-col cols="12">
            <h4
              style="font-family:'Bebas Neue', cursive;"
              no-body
            >
              Actual Expenses:
              {{
                new Intl.NumberFormat('en-us', {
                  style: 'currency',
                  currency: 'PHP'
                }).format(event.totalExpenses)
              }}
            </h4>
          </b-col>
        </b-row>

        <b-row class="pt-4">
          <b-col cols="12">
            <b-table
              :items="getEventExpenses"
              :fields="expenses.fields"
              :current-page="expenses.pagination.currentPage"
              :per-page="expenses.pagination.perPage"
              stacked="md"
              style="background:white"
              show-empty
              small
              primary-key="_id"
              hover
            >
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
              v-model="expenses.pagination.currentPage"
              :total-rows="expenses.total"
              :per-page="expenses.pagination.perPage"
              align="fill"
              size="sm"
              class="my-0"
            />
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import { apiClient } from '../../axios'
import EventExpenseRepository from '../../repositories/events/expenses'

const eventExpenseRepository = new EventExpenseRepository(apiClient)

export default {
  name: 'ExpensesListModal',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    event: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      modal: false,
      budget: {
        pagination: {
          perPage: 5,
          currentPage: 1
        },
        fields: [
          { key: 'amount', label: 'Amount' },
          { key: 'type', label: 'Type of expense' },
          { key: 'remarks', label: 'Remarks' }
        ]
      },
      expenses: {
        results: [],
        total: 0,
        pagination: {
          perPage: 5,
          currentPage: 1
        },
        fields: [
          { key: 'amount', label: 'Amount' },
          { key: 'type', label: 'Type of expense' },
          { key: 'remarks', label: 'Remarks' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['token']),
    eventId () {
      return this.event._id
    },
    eventExpensesPageOffset () {
      return (this.expenses.pagination.currentPage - 1) * this.expenses.pagination.perPage
    },
    totalAmountFromBreakdown () {
      if (this.event.budget === undefined) {
        return 0
      }

      const breakdown = this.event.budget.breakdown

      let total = 0

      for (const item of breakdown) {
        total += item.amount
      }

      return total
    }
  },
  watch: {
    show (val) {
      this.modal = val
    }
  },
  created () {
    eventExpenseRepository.setAuthorizationHeader(`Bearer ${this.token}`)
  },
  methods: {
    async getEventExpenses (ctx) {
      const perPage = this.expenses.pagination.perPage
      const pageOffset = this.eventExpensesPageOffset

      const { results, total } = await eventExpenseRepository.list({
        eventId: this.eventId
      }, {
        limit: perPage,
        offset: pageOffset,
        expand: true
      })

      this.expenses.total = total

      return results
    }
  }
}
</script>
