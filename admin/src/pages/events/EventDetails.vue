<template>
  <div>
    <div class="py-5">
      <img :src="logo" style="width: 320px; height: 150px">
    </div>

    <b-container class="pb-5">
      <b-row class="justify-content-md-center">
        <b-col cols="12">
          <b-card bg-variant="light" style="border-radius: 20px;">
            <b-container v-if="isLoadingEvent" style="height: 100vh">
              <b-row class="vh-100" align-h="center">
                <b-col cols="12" align-self="center">
                  <b-spinner style="width: 10rem; height: 10rem;" />
                </b-col>
              </b-row>
            </b-container>

            <b-container v-else fluid>
              <b-row>
                <b-col cols="12">
                  <b-card style="border-radius: 20px;">
                    <b-row>
                      <b-col cols="12" md="6">
                        <h1 class="text-start" style="font-family:'Bebas Neue', cursive;">
                          {{ event.name }}
                        </h1>
                      </b-col>

                      <b-col v-if="event.status === 'UPCOMING'" class="text-end" cols="12" md="6">
                        <b-button variant="success" class="mx-3" @click="updateEvent.modal = true">
                          Edit Event
                        </b-button>

                        <b-dropdown
                          text="Update Status"
                          variant="primary"
                          no-flip
                        >
                          <b-dropdown-item @click="preUpdateStatus('CANCELED')">
                            <strong style="color: red">CANCEL</strong>
                          </b-dropdown-item>

                          <b-dropdown-item
                            @click="preUpdateStatus('ENDED')"
                            :disabled="!canEndEvent"
                          >
                            <strong>END</strong>
                          </b-dropdown-item>
                        </b-dropdown>
                      </b-col>
                    </b-row>

                    <b-row class="pt-3">
                      <b-col cols="12">
                        <b-container fluid>
                          <b-row>
                            <b-col cols="12" md="6">
                              <p class="h4 mb-0">
                                <b-icon icon="geo-alt" />&nbsp;{{ event.location.name }}
                              </p>
                            </b-col>

                            <b-col cols="12" md="6">
                              <p class="h4 mb-0">
                                <b-icon icon="calendar" />&nbsp;
                                {{
                                  new Date(event.date.start).toLocaleString('en-us', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: '2-digit',
                                    hour: 'numeric',
                                    minute: '2-digit'
                                  })
                                }}
                                -
                                {{
                                  new Date(event.date.end).toLocaleString('en-us', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: '2-digit',
                                    hour: 'numeric',
                                    minute: '2-digit'
                                  })
                                }}
                              </p>
                            </b-col>

                            <b-col cols="12" md="6">
                              <p class="h4 mb-0">
                                Status: <i>{{ event.status }}</i>
                              </p>
                            </b-col>
                          </b-row>

                          <b-row v-if="Array.isArray(event.contacts)" align-h="start">
                            <b-col cols="12">
                              <p class="h4">
                                <b-icon icon="person-lines-fill" />&nbsp;Contacts
                              </p>
                            </b-col>

                            <b-col v-for="(contact, index) in event.contacts" :key="index" cols="12" sm="3">
                              <p class="h6 text-start">
                                <b-icon
                                  :icon="contact.contactMethods[0].type === 'EMAIL' ? 'envelope' : 'telephone'"
                                />&nbsp;&nbsp;{{ contact.contactMethods[0].value }}
                                <span class="text-black-50">&lt;{{ contact.name }}&gt;</span>
                              </p>
                            </b-col>
                          </b-row>
                        </b-container>
                      </b-col>
                    </b-row>

                    <b-row class="py-4">
                      <b-col cols="12">
                        <b-container fluid>
                          <b-row class="pt-3 pb-4">
                            <b-col cols="12">
                              <b-img v-if="event.logoUrl !== undefined" :src="event.logoUrl" fluid alt="event logo" />

                              <b-card v-else>
                                <b-row>
                                  <b-col cols="12">
                                    <h3 style="font-family:'Bebas Neue', cursive;">
                                      No image uploaded
                                    </h3>
                                  </b-col>
                                </b-row>
                              </b-card>
                            </b-col>
                          </b-row>

                          <b-row v-if="event.goals.monetaryDonation.target !== 0">
                            <b-col cols="12">
                              <b-progress height="2rem" style="border-radius:30px;" :max="event.goals.monetaryDonation.target">
                                <b-progress-bar
                                  variant="success"
                                  :value="event.goals.monetaryDonation.current"
                                  :label="monetaryDonationCurrentLabel"
                                ></b-progress-bar>

                                <b-progress-bar
                                  variant="danger"
                                  :value="monetaryDonationReached ? 0 : event.goals.monetaryDonation.target"
                                  :label="monetaryDonationTargetLabel"
                                ></b-progress-bar>
                              </b-progress>
                            </b-col>
                          </b-row>

                          <b-row v-if="event.goals.numVolunteers.target !== 0" class="pt-4">
                            <b-col cols="12">
                              <b-progress height="2rem" style="border-radius:30px;" :max="event.goals.numVolunteers.target">
                                <b-progress-bar
                                  variant="success"
                                  :value="event.goals.numVolunteers.current"
                                  :label="volunteerGoalCurrentLabel"
                                ></b-progress-bar>

                                <b-progress-bar
                                  variant="danger"
                                  :value="volunteerGoalReached ? 0 : event.goals.numVolunteers.target"
                                  :label="volunteerGoalTargetLabel"
                                ></b-progress-bar>
                              </b-progress>
                            </b-col>
                          </b-row>
                        </b-container>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>

              <b-row v-if="event.description !== undefined" class="py-4 text-start">
                <b-col cols="12">
                  <b-card style="border-radius: 20px;">
                    <h1 style="font-family:'Bebas Neue', cursive;">
                      Event Description
                    </h1>

                    <b-form-textarea
                      rows="15"
                      v-model="event.description"
                      readonly
                    />
                  </b-card>
                </b-col>
              </b-row>

              <b-row v-if="Array.isArray(event.sdgs)" class="py-4">
                <b-col cols="12">
                  <b-card style="border-radius: 20px;">
                    <h1 class="text-start" style="font-family:'Bebas Neue', cursive;">
                      Sustainable Development Goals
                    </h1>

                    <b-row>
                      <b-col v-for="(sdg, index) in event.sdgs" :key="index" cols="12" md="3">
                        <b-avatar :src="sdg.imageUrl" :alt="sdg.name" size="150px" square />
                        <br />
                        <strong>{{ sdg.name }}</strong>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>

              <b-row v-if="Array.isArray(event.jobs)" class="py-4">
                <b-col cols="12">
                  <b-card style="border-radius: 20px;">
                    <h5 class="text-start" style="font-family:'Bebas Neue', cursive;">
                      Roles
                    </h5>

                    <b-row class="pt-2">
                      <b-col cols="12">
                        <b-table
                          :items="event.jobs"
                          :fields="eventJobFields"
                          show-empty
                          responsive
                          striped
                          primary-key="name"
                        >
                          <template #cell(skills)="{ item }">
                            <template v-if="item.skills.length > 0">
                              <b-form-tag
                                v-for="jobSkill in item.skills"
                                :key="jobSkill._id"
                                class="bg-success"
                                disabled
                              >
                                {{ jobSkill.name }}
                              </b-form-tag>
                            </template>
                          </template>
                        </b-table>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>

              <b-row v-if="Array.isArray(event.questions)" class="py-4">
                <b-col cols="12">
                  <b-card style="border-radius: 20px;">
                    <h5 class="text-start" style="font-family:'Bebas Neue', cursive;">
                      Questionnaire
                    </h5>

                    <b-row class="pt-2">
                      <b-col cols="12">
                        <b-table
                          :items="event.questions"
                          :fields="eventQuestionFields"
                          show-empty
                          responsive
                          striped
                          primary-key="label"
                        ></b-table>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>

              <b-row v-if="Array.isArray(event.ikds)" class="py-4">
                <b-col cols="12">
                  <b-card style="border-radius: 20px;">
                    <h1 class="text-start" style="font-family:'Bebas Neue', cursive;">
                      Items for the Event
                    </h1>

                    <b-row>
                      <b-col cols="12">
                        <b-table
                          :items="event.ikds"
                          :fields="eventIkdFields"
                          show-empty
                          responsive
                          striped
                          primary-key="item.sku"
                        >
                          <template #cell(usedQuantity)="{ value }">
                            <span v-if="value !== undefined && value !== ''">
                              {{ value }}
                            </span>
                            <span v-else>
                              0
                            </span>
                          </template>
                        </b-table>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>

              <b-row class="py-4">
                <b-col cols="12">
                  <b-card style="border-radius: 20px;">
                    <h1 class="text-start" style="font-family:'Bebas Neue', cursive;">
                      Expenses for the Event
                    </h1>

                    <b-row>
                      <b-col cols="12">
                        <b-table
                          :items="getEventExpenses"
                          :fields="eventExpenses.fields"
                          :current-page="eventExpenses.pagination.currentPage"
                          :per-page="eventExpenses.pagination.perPage"
                          show-empty
                          responsive
                          striped
                          primary-key="type"
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

                    <b-row class="justify-content-md-center">
                      <b-col cols="6" class="my-1">
                        <b-pagination
                          v-model="eventExpenses.pagination.currentPage"
                          :total-rows="eventExpenses.total"
                          :per-page="eventExpenses.pagination.perPage"
                          align="fill"
                          size="sm"
                          class="my-0"
                        ></b-pagination>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>

              <b-row class="py-4">
                <b-col cols="12">
                  <b-card style="border-radius: 20px;">
                    <h1 class="text-start" style="font-family:'Bebas Neue', cursive;">
                      Volunteers
                    </h1>

                    <b-row>
                      <b-col cols="12">
                        <b-table
                          :items="getEventVolunteers"
                          :fields="eventVolunteers.fields"
                          :current-page="eventVolunteers.pagination.currentPage"
                          :per-page="eventVolunteers.pagination.perPage"
                          show-empty
                          small
                          stacked="md"
                          style="background:white"
                        >
                          <template #cell(volunteerName)="{ item }">
                            <b-link :to="`/volunteers/${item.user._id}`">
                              {{ item.user.firstName }} {{ item.user.lastName }}
                            </b-link>
                          </template>

                          <template #cell(action)="{ item }">
                            <b-link v-if="item.eventEvaluation !== undefined" :to="`/event-evaluations/${item.eventEvaluation}/`">
                              See Evaluation
                            </b-link>
                          </template>
                        </b-table>
                      </b-col>
                    </b-row>

                    <b-row class="justify-content-md-center">
                      <b-col cols="6" class="my-1">
                        <b-pagination
                          v-model="eventVolunteers.pagination.currentPage"
                          :total-rows="eventVolunteers.total"
                          :per-page="eventVolunteers.pagination.perPage"
                          align="fill"
                          size="sm"
                          class="my-0"
                        ></b-pagination>
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

    <b-modal v-model="updateEventStatus.modal" size="xl">
      <b-container>
        <b-row v-if="hasIkdItems">
          <b-col cols="12">
            <h5>
              Items used in the Event
            </h5>
          </b-col>

          <b-col cols="12">
            <b-table
              :items="updateEventStatus.itemsUsed"
              :fields="updateEventStatus.ikdFields"
              show-empty
              striped
              primary-key="item.sku"
            >
              <template #cell(quantity)="{ item }">
                <b-form-input
                  class="text-center"
                  type="number"
                  style="width: 30%; display: inline"
                  v-model="item['quantity']"
                  :formatter="(value) => validateItemQuantity(value, item.maxQuantity)"
                /> / {{ item.maxQuantity }}
              </template>
            </b-table>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <h5>
              Expenses Breakdown
            </h5>
          </b-col>

          <b-col cols="12">
            <b-table
              :items="updateEventStatus.expenses"
              :fields="updateEventStatus.expenseFields"
              show-empty
              striped
              primary-key="item.type"
            >
              <template #cell(amount)="{ value }">
                {{
                  new Intl.NumberFormat('en-us', {
                    style: 'currency',
                    currency: 'PHP'
                  }).format(value)
                }}
              </template>

              <template #cell(action)="{ index }">
                <b-button variant="danger" @click="removeExpense(index)">
                  <b-icon icon="trash" />
                </b-button>
              </template>
            </b-table>
          </b-col>

          <b-col cols="12">
            <b-button
              class="w-100 mb-3"
              :disabled="updateEventStatus.showExpenseForm"
              @click="updateEventStatus.showExpenseForm = true"
            >
              Add Expense
            </b-button>

            <b-collapse v-model="updateEventStatus.showExpenseForm">
              <b-card>
                <validation-observer v-slot="{ invalid }">
                  <b-container>
                    <b-row>
                      <b-col cols="12">
                        <b-form-group class="text-start">
                          <label
                            class="py-1"
                            for="input-expense-type"
                            style="font-family: 'Bebas Neue', cursive;"
                          >
                            Expense Type
                          </label>

                          <validation-provider
                            :rules="{
                              required: true
                            }"
                            v-slot="validationContext"
                          >
                            <b-form-input
                              id="input-expense-type"
                              v-model="updateEventStatus.expenseForm.type"
                              placeholder="Ex: Materials"
                              :state="getValidationState(validationContext)"
                              aria-describedby="input-expense-type-feedback"
                            />

                            <b-form-invalid-feedback id="input-expense-type-feedback">
                              {{ validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                          </validation-provider>
                        </b-form-group>
                      </b-col>

                      <b-col cols="12">
                        <b-form-group class="text-start">
                          <label
                            class="py-1"
                            for="input-expense-amount"
                            style="font-family: 'Bebas Neue', cursive;"
                          >
                            Expense Amount
                          </label>

                          <validation-provider
                            :rules="{
                              required: true
                            }"
                            v-slot="validationContext"
                          >
                            <b-form-input
                              id="input-expense-amount"
                              type="number"
                              step="100"
                              v-model="updateEventStatus.expenseForm.amount"
                              lazy-formatter
                              :formatter="toPositiveNumber"
                              :state="getValidationState(validationContext)"
                              aria-describedby="input-expense-amount-feedback"
                            />

                            <b-form-invalid-feedback id="input-expense-amount-feedback">
                              {{ validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                          </validation-provider>
                        </b-form-group>
                      </b-col>

                      <b-col class="pt-2" cols="12">
                        <b-form-group class="text-start">
                          <label
                            class="py-1"
                            for="textarea-expense-remarks"
                            style="font-family: 'Bebas Neue', cursive;"
                          >
                            Remarks
                          </label>

                          <validation-provider
                            :rules="{
                              max: 300
                            }"
                            v-slot="validationContext"
                          >
                            <b-form-textarea
                              id="textarea-expense-remarks"
                              rows="3"
                              max-rows="8"
                              v-model="updateEventStatus.expenseForm.remarks"
                              placeholder="Ex: Used for cleaning"
                              :state="getValidationState(validationContext)"
                              aria-describedby="textarea-expense-remarks-feedback"
                            />

                            <b-form-invalid-feedback id="textarea-expense-remarks-feedback">
                              {{ validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                          </validation-provider>
                        </b-form-group>
                      </b-col>

                      <b-col class="pt-3" cols="12">
                        <b-row>
                          <b-col cols="12" md="6">
                            <b-button
                              class="w-100"
                              @click="updateEventStatus.showExpenseForm = false"
                            >
                              Cancel
                            </b-button>
                          </b-col>

                          <b-col cols="12" md="6">
                            <b-button
                              class="w-100"
                              variant="success"
                              :disabled="invalid"
                              @click="addExpense"
                            >
                              Submit
                            </b-button>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-container>
                </validation-observer>
              </b-card>
            </b-collapse>
          </b-col>
        </b-row>
      </b-container>

      <template #modal-footer>
        <b-container>
          <b-row>
            <b-col class="text-center" cols="12">
              <b-button
                variant="outline-primary"
                size="sm"
                class="float-right"
                @click="updateEventStatus.confirmModal = true"
              >
                {{
                  updateEventStatus.status === 'ENDED' ? 'End Event' : 'Cancel Event'
                }}
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </b-modal>

    <b-modal v-model="updateEventStatus.confirmModal" size="md">
      <b-container>
        <b-row>
          <b-col cols="12">
            <h1 class="text-center">
              Are you sure of the details?
            </h1>
          </b-col>
        </b-row>
      </b-container>

      <template #modal-footer>
        <b-container>
          <b-row>
            <b-col class="text-center" cols="12">
              <b-button
                variant="success"
                size="sm"
                class="float-right"
                @click="updateStatus(updateEventStatus.status)"
              >
                CONFIRM
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </b-modal>

    <EventUpdateModal
      :show="updateEvent.modal"
      :current-event="updateEvent.event"
      @update="patchEvent"
      @close="updateEvent.modal = false"
    />
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, max } from 'vee-validate/dist/rules'
import { mapGetters } from 'vuex'
import { cloneDeep, pickBy, identity } from 'lodash'

import EventUpdateModal from '../../components/events/EventUpdateModal'

import validationMixin from '../../mixins/validation'
import formattersMixin from '../../mixins/formatters'

import { apiClient } from '../../axios'
import EventVolunteerRepository from '../../repositories/events/volunteers'
import EventExpenseRepository from '../../repositories/events/expenses'

const logo = require('../../assets/aralpinoywords.png')

const eventVolunteerRepository = new EventVolunteerRepository(apiClient)
const eventExpenseRepository = new EventExpenseRepository(apiClient)

extend('required', {
  ...required,
  message: 'This field is required'
})
extend('max', {
  ...max,
  message: 'This field must be less than or equal to {length} characters'
})

export default {
  name: 'EventDetails',
  components: {
    EventUpdateModal,
    ValidationObserver,
    ValidationProvider
  },
  mixins: [
    validationMixin,
    formattersMixin
  ],
  data () {
    return {
      logo,
      event: null,
      isLoadingEvent: false,
      showModal: false,
      currentPage: 1,
      canEndEvent: false,
      eventVolunteers: {
        results: [],
        total: 0,
        pagination: {
          perPage: 5,
          currentPage: 1
        },
        fields: [
          { key: 'volunteerName', label: 'Volunteer' },
          { key: 'eventJob.name', label: 'Role' },
          { key: 'action', label: 'Action' }
        ]
      },
      eventExpenses: {
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
      },
      eventJobFields: [
        { key: 'name', label: 'Title' },
        { key: 'description', label: 'Description' },
        { key: 'slots.max', label: 'Number of Volunteers Needed' },
        { key: 'skills', label: 'Skills' }
      ],
      eventQuestionFields: [
        { key: 'label', label: 'Question' }
      ],
      eventIkdFields: [
        { key: 'item.name', label: 'Item' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'usedQuantity', label: 'Used' }
      ],
      updateEventStatus: {
        modal: false,
        confirmModal: false,
        status: '',
        itemsUsed: [],
        ikdFields: [
          { key: 'item.name', label: 'Item' },
          { key: 'quantity', label: 'Number of Used Items', class: 'text-center' }
        ],
        showExpenseForm: false,
        expenseForm: {
          type: '',
          amount: 1,
          remarks: ''
        },
        expenses: [],
        expenseFields: [
          { key: 'amount', label: 'Amount' },
          { key: 'type', label: 'Type of expense' },
          { key: 'remarks', label: 'Remarks' },
          { key: 'action', label: 'Action' }
        ]
      },
      updateEvent: {
        modal: false,
        event: null
      }
    }
  },
  computed: {
    ...mapGetters(['token']),
    eventId () {
      return this.$route.params.id
    },
    monetaryDonationReached () {
      if (this.event === null) {
        return false
      }

      const {
        current,
        target
      } = this.event.goals.monetaryDonation

      return current >= target
    },
    monetaryDonationCurrentLabel () {
      if (this.event === null) {
        return ''
      }

      const {
        current,
        target
      } = this.event.goals.monetaryDonation

      if (current >= target) {
        const currentCurrency = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'PHP'
        }).format(current)

        const targetCurrency = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'PHP'
        }).format(target)

        return `We have reached our goal! (${currentCurrency} / ${targetCurrency})`
      }

      const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP'
      }).format(current)

      return currency
    },
    monetaryDonationTargetLabel () {
      if (this.event === null) {
        return ''
      }

      const {
        current,
        target
      } = this.event.goals.monetaryDonation

      if (current >= target) {
        return ''
      }

      const difference = target - current
      const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP'
      }).format(difference)

      return `We still need ${currency} to reach our goal!`
    },
    volunteerGoalReached () {
      if (this.event === null) {
        return false
      }

      const {
        current,
        target
      } = this.event.goals.numVolunteers

      return current >= target
    },
    volunteerGoalCurrentLabel () {
      if (this.event === null) {
        return ''
      }

      const {
        current,
        target
      } = this.event.goals.numVolunteers

      if (current >= target) {
        return `We have reached our goal! (${current} / ${target} have volunteered)`
      }

      const volunteerNoun = current === 1 ? 'volunteer' : 'volunteers'

      return `${current} ${volunteerNoun}`
    },
    volunteerGoalTargetLabel () {
      if (this.event === null) {
        return ''
      }

      const {
        current,
        target
      } = this.event.goals.numVolunteers

      if (current >= target) {
        return ''
      }

      const difference = target - current
      const volunteerNoun = difference === 1 ? 'volunteer' : 'volunteers'

      return `We still need ${difference} ${volunteerNoun}!`
    },
    eventVolunteersPageOffset () {
      return (this.eventVolunteers.pagination.currentPage - 1) * this.eventVolunteers.pagination.perPage
    },
    eventExpensesPageOffset () {
      return (this.eventExpenses.pagination.currentPage - 1) * this.eventExpenses.pagination.perPage
    },
    hasIkdItems () {
      if (this.event === null) {
        return false
      }

      return Array.isArray(this.event.ikds) && this.event.ikds.length > 0
    },
    hasMonetaryGoal () {
      if (this.event === null) {
        return false
      }

      return this.event.goals.monetaryDonation.current > 0
    }
  },
  created () {
    const authHeader = `Bearer ${this.token}`
    eventVolunteerRepository.setAuthorizationHeader(authHeader)
    eventExpenseRepository.setAuthorizationHeader(authHeader)

    this.getEvent()
  },
  methods: {
    async getEvent () {
      this.isLoadingEvent = true
      const eventId = this.eventId

      try {
        const {
          data: event
        } = await apiClient.get(`/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        this.event = event
        this.updateEvent.event = event

        if (new Date() > new Date(event.date.start)) {
          this.canEndEvent = true
        }

        if (event.status === 'UPCOMING') {
          if (Array.isArray(event.ikds) && event.ikds.length > 0) {
            for (const ikd of event.ikds) {
              this.updateEventStatus.itemsUsed.push({
                item: ikd.item,
                quantity: 0,
                maxQuantity: ikd.quantity
              })
            }
          }
        }
      } finally {
        this.isLoadingEvent = false
      }
    },
    async getEventVolunteers (ctx) {
      const perPage = this.eventVolunteers.pagination.perPage
      const pageOffset = this.eventVolunteersPageOffset

      const { results, total } = await eventVolunteerRepository.list({
        eventId: this.eventId
      }, {
        limit: perPage,
        offset: pageOffset,
        expand: true
      })

      this.eventVolunteers.total = total

      return results
    },
    async getEventExpenses (ctx) {
      const perPage = this.eventExpenses.pagination.perPage
      const pageOffset = this.eventExpensesPageOffset

      const { results, total } = await eventExpenseRepository.list({
        eventId: this.eventId
      }, {
        limit: perPage,
        offset: pageOffset,
        expand: true
      })

      this.eventExpenses.total = total

      return results
    },
    patchEvent (event) {
      Object.assign(this.event, cloneDeep(event))

      this.event = pickBy(this.event, identity)
    },
    async preUpdateStatus (status) {
      this.updateEventStatus.status = status

      if (this.hasIkdItems || this.hasMonetaryGoal) {
        this.updateEventStatus.modal = true
      } else {
        this.updateEventStatus.confirmModal = true
      }
    },
    async updateStatus (status) {
      this.isLoadingEvent = true
      this.updateEventStatus.modal = false
      this.updateEventStatus.confirmModal = false

      const eventId = this.eventId
      let itemsUnused
      let expenses

      if (this.updateEventStatus.itemsUsed.length > 0) {
        itemsUnused = []

        for (const { item, quantity, maxQuantity } of this.updateEventStatus.itemsUsed) {
          const unUsedQuantity = maxQuantity - quantity

          if (unUsedQuantity === 0) {
            continue
          }

          itemsUnused.push({
            sku: item.sku,
            quantity: unUsedQuantity
          })
        }
      }

      if (this.updateEventStatus.expenses.length > 0) {
        expenses = []

        for (const { type, amount, remarks } of this.updateEventStatus.expenses) {
          expenses.push({
            type,
            amount,
            remarks
          })
        }
      }

      try {
        await apiClient.patch(`/events/${eventId}/status`, {
          status,
          itemsUnused,
          expenses
        }, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        this.event.status = status
      } finally {
        this.isLoadingEvent = false
      }
    },
    validateItemQuantity (value, maxQuantity) {
      const parsedNumber = Number(value)

      if (isNaN(parsedNumber) || parsedNumber < 0) {
        return 0
      }

      if (parsedNumber > maxQuantity) {
        return maxQuantity
      }

      return parsedNumber
    },
    addExpense () {
      this.updateEventStatus.showExpenseForm = false

      const { type, amount, remarks } = this.updateEventStatus.expenseForm

      this.updateEventStatus.expenses.push({
        type,
        amount: Number(amount).toPrecision(2),
        remarks
      })

      this.updateEventStatus.expenseForm = {
        type: '',
        amount: 1,
        remarks: ''
      }
    },
    removeExpense (index) {
      this.updateEventStatus.expenses.splice(index, 1)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

.h4 {
  font-family: 'Bebas Neue', cursive;
  text-align: left;
  line-height: 1.8;
}
.fixed {
  display: inline;
  position: fixed;
  right: 15px;
  bottom: 15px;
  z-index: 99999;
}
</style>
