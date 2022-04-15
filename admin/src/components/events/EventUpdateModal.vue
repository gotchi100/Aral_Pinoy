<template>
  <b-modal
    v-model="modal"
    size="xl"
    title="Edit Event"
    hide-footer
    @hide="$emit('close')"
  >
    <b-container v-if="event !== null">
      <b-row>
        <b-col cols="12">
          <b-container fluid>
            <b-alert
              :show="!!errorMessage"
              variant="danger"
            >
              {{ errorMessage }}
            </b-alert>

            <b-row>
              <b-col cols="12">
                <validation-observer v-slot="{ invalid, changed, reset }">
                  <validation-provider
                    v-slot="validationContext"
                    :rules="{
                      required: true,
                      max: 100
                    }"
                  >
                    <div class="input-group mb-3">
                      <span class="input-group-text">
                        Name
                      </span>

                      <b-form-input
                        id="update-event-name"
                        v-model="event.name"
                        type="text"
                        class="form-control"
                        :state="getValidationState(validationContext)"
                        aria-describedby="update-event-name-feedback"
                        :disabled="loading.name"
                      />

                      <button
                        class="btn btn-outline-success"
                        type="button"
                        :disabled="invalid || !changed || loading.name"
                        @click="updateEvent({ name: event.name }, 'name', reset)"
                      >
                        <b-spinner
                          v-if="loading.name"
                          style="width: 1rem; height: 1rem;"
                        />
                        <template v-else>
                          <b-icon icon="file-earmark-check-fill" />
                        </template>
                      </button>

                      <b-form-invalid-feedback id="update-event-name-feedback">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </div>
                  </validation-provider>
                </validation-observer>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12">
                <validation-observer v-slot="{ invalid, changed, reset }">
                  <validation-provider
                    v-slot="validationContext"
                    :rules="{
                      required: true,
                      max: 500
                    }"
                  >
                    <div class="input-group mb-3">
                      <span class="input-group-text">
                        Location Name
                      </span>

                      <b-form-input
                        id="update-event-name"
                        v-model="event.location.name"
                        type="text"
                        class="form-control"
                        :state="getValidationState(validationContext)"
                        aria-describedby="update-event-location-name-feedback"
                        :disabled="loading['location.name']"
                      />

                      <button
                        class="btn btn-outline-success"
                        type="button"
                        :disabled="invalid || !changed || loading['location.name']"
                        @click="updateEvent({ location: { name: event.location.name } }, 'location.name', reset)"
                      >
                        <b-spinner
                          v-if="loading['location.name']"
                          style="width: 1rem; height: 1rem;"
                        />
                        <template v-else>
                          <b-icon icon="file-earmark-check-fill" />
                        </template>
                      </button>

                      <b-form-invalid-feedback id="update-event-location-name-feedback">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </div>
                  </validation-provider>
                </validation-observer>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12">
                <validation-observer v-slot="{ invalid, changed, reset }">
                  <validation-provider
                    v-slot="validationContext"
                    :rules="{
                      max: 5000
                    }"
                  >
                    <span>
                      Description
                    </span>

                    <div class="input-group mb-3">
                      <b-form-textarea
                        id="update-event-description"
                        v-model="event.description"
                        class="form-control"
                        :state="getValidationState(validationContext)"
                        aria-describedby="update-event-description-feedback"
                        :disabled="loading.description"
                        rows="4"
                      />

                      <button
                        class="btn btn-outline-success"
                        type="button"
                        :disabled="invalid || !changed || loading.description"
                        @click="updateEvent({ description: event.description }, 'description', reset)"
                      >
                        <b-spinner
                          v-if="loading.description"
                          style="width: 1rem; height: 1rem;"
                        />
                        <template v-else>
                          <b-icon icon="file-earmark-check-fill" />
                        </template>
                      </button>

                      <b-form-invalid-feedback id="update-event-description-feedback">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </div>
                  </validation-provider>
                </validation-observer>
              </b-col>
            </b-row>

            <validation-observer v-slot="{ changed, reset }">
              <b-card>
                <b-container>
                  <b-row>
                    <b-col>
                      <b-form-group
                        label="Start Date:"
                        style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;"
                      >
                        <validation-provider>
                          <b-form-datepicker
                            v-model="eventDate.start.date"
                            class="mb-2"
                            :min="nextMonth"
                            :state="eventDate.start.validDate"
                            :disabled="loading.date"
                            required
                          />
                        </validation-provider>
                      </b-form-group>
                    </b-col>

                    <b-col>
                      <b-form-group
                        label="Start Time:"
                        style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;"
                      >
                        <validation-provider>
                          <b-form-timepicker
                            v-model="eventDate.start.time"
                            locale="en"
                            minutes-step="10"
                            :state="eventDate.start.validTime"
                            :disabled="loading.date"
                            required
                          />
                        </validation-provider>
                      </b-form-group>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-group
                        label="End Date:"
                        style="font-family:'Bebas Neue', cursive;"
                      >
                        <validation-provider>
                          <b-form-datepicker
                            v-model="eventDate.end.date"
                            class="mb-2"
                            :min="eventDate.start.date"
                            :state="eventDate.end.validDate"
                            :disabled="loading.date"
                            required
                          />
                        </validation-provider>
                      </b-form-group>
                    </b-col>

                    <b-col>
                      <b-form-group
                        label="End Time:"
                        style="font-family:'Bebas Neue', cursive;"
                      >
                        <validation-provider>
                          <b-form-timepicker
                            v-model="eventDate.end.time"
                            locale="en"
                            minutes-step="10"
                            :state="eventDate.end.validTime"
                            :disabled="loading.date"
                            required
                          />
                        </validation-provider>
                      </b-form-group>
                    </b-col>
                  </b-row>

                  <b-row
                    class="pt-3"
                    align-h="end"
                  >
                    <b-col cols="1">
                      <b-button
                        variant="outline-success"
                        :disabled="!changed || !areEventDatesValid() || loading.date"
                        @click="updateEvent({ date: event.date }, 'date', reset)"
                      >
                        <b-spinner
                          v-if="loading.date"
                          style="width: 1rem; height: 1rem;"
                        />
                        <template v-else>
                          <b-icon icon="file-earmark-check-fill" />
                        </template>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </b-card>
            </validation-observer>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, max } from 'vee-validate/dist/rules'
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import {
  addMonths,
  isSameDay
} from 'date-fns'

import validationMixins from '../../mixins/validation'
import EventRepository from '../../repositories/events'
import { apiClient } from '../../axios'

const eventRepository = new EventRepository(apiClient)
const nextMonth = addMonths(new Date(), 1)

extend('required', {
  ...required,
  message: 'This field is required'
})
extend('max', {
  ...max,
  message: 'This field must be less than or equal to {length} characters'
})

const ERROR_MAP = {
  400: true,
  404: {
    event: 'Event does not exist!'
  },
  409: {
    non_upcoming_event: 'Canceled or ended events cannot be updated',
    version_conflict: 'Event was recently updated. Please try again'
  }
}

export default {
  name: 'EventUpdateModal',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [validationMixins],
  props: {
    show: {
      type: Boolean,
      required: true
    },
    currentEvent: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      modal: false,
      event: null,
      nextMonth,
      eventDate: {
        start: {
          date: nextMonth,
          time: '00:00:00',
          validDate: null,
          validTime: null
        },
        end: {
          date: nextMonth,
          time: '01:00:00',
          validDate: null,
          validTime: null
        }
      },
      isLoading: false,
      loading: {
        name: false,
        description: false,
        date: false,
        'location.name': false
      },
      errorMessage: ''
    }
  },
  computed: {
    ...mapGetters(['token']),
    eventId () {
      if (this.currentEvent === null) {
        return
      }

      return this.currentEvent._id
    }
  },
  watch: {
    show (val) {
      this.modal = val
    },
    currentEvent (val) {
      this.event = cloneDeep(val)

      const startDate = new Date(val.date.start)
      const startTimeHours = startDate.getHours().toString().padStart(2, '0')
      const startTimeMinutes = startDate.getMinutes().toString().padStart(2, '0')

      this.eventDate.start = {
        date: startDate,
        time: `${startTimeHours}:${startTimeMinutes}:00`
      }

      const endDate = new Date(val.date.end)
      const endTimeHours = endDate.getHours().toString().padStart(2, '0')
      const endTimeMinutes = endDate.getMinutes().toString().padStart(2, '0')

      this.eventDate.end = {
        date: endDate,
        time: `${endTimeHours}:${endTimeMinutes}:00`
      }
    },
    'eventDate.start.date' (value) {
      this.setEventStartDate(new Date(value), this.eventDate.start.time)
      this.evaluateDates()
    },
    'eventDate.start.time' (value) {
      this.setEventStartDate(new Date(this.eventDate.start.date), value)
      this.evaluateDates()
    },
    'eventDate.end.date' (value) {
      this.setEventEndDate(new Date(value), this.eventDate.end.time)
      this.evaluateDates()
    },
    'eventDate.end.time' (value) {
      this.setEventEndDate(new Date(this.eventDate.end.date), value)
      this.evaluateDates()
    }
  },
  created () {
    eventRepository.setAuthorizationHeader(`Bearer ${this.token}`)
  },
  methods: {
    async updateEvent (update = {}, loadField, reset) {
      this.errorMessage = ''

      this.updateLoading(loadField, true)

      if (update.description !== undefined && update.description === '') {
        update.description = null
      }

      try {
        await eventRepository.update(this.eventId, update)

        reset()
        this.$emit('update', update)
      } catch (error) {
        const data = error.response?.data

        if (data) {
          const { status, message } = data

          const statusMessageMap = ERROR_MAP[status]

          if (statusMessageMap === undefined) {
            this.errorMessage = 'An internal server error has occurred'

            return
          }

          const errorMessage = statusMessageMap[message]

          if (errorMessage === undefined) {
            this.errorMessage = 'An internal server error has occurred'

            return
          }

          this.errorMessage = errorMessage
        }
      } finally {
        this.updateLoading(loadField, false)
      }
    },
    updateLoading (loadField, flag) {
      if (!Array.isArray(loadField)) {
        this.loading[loadField] = flag

        return
      }

      for (const field of loadField) {
        this.loading[field] = flag
      }
    },
    setEventStartDate (date, time) {
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()

      const [hours, minutes] = time.split(':')

      this.event.date.start = new Date(year, month, day, hours, minutes, 0, 0)
    },
    setEventEndDate (date, time) {
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()

      const [hours, minutes] = time.split(':')

      this.event.date.end = new Date(year, month, day, hours, minutes, 0, 0)
    },
    evaluateDates () {
      const startDate = new Date(this.eventDate.start.date)
      const startTime = this.eventDate.start.time
      const endDate = new Date(this.eventDate.end.date)

      if (!isSameDay(startDate, endDate)) {
        if (startDate > endDate) {
          this.eventDate.start.validDate = false
          this.eventDate.start.validTime = false

          this.eventDate.end.validDate = false
          this.eventDate.end.validTime = false
        } else {
          this.eventDate.start.validDate = true
          this.eventDate.start.validTime = true

          this.eventDate.end.validDate = true
          this.eventDate.end.validTime = true
        }

        return
      }

      this.eventDate.start.validDate = true
      this.eventDate.end.validDate = true

      const endTime = this.eventDate.end.time

      if (startTime >= endTime) {
        this.eventDate.start.validTime = false
        this.eventDate.end.validTime = false
      } else {
        this.eventDate.start.validTime = true
        this.eventDate.end.validTime = true
      }
    },
    areEventDatesValid () {
      const validStartDate = this.eventDate.start.validDate
      const validStartTime = this.eventDate.start.validTime

      const validEndDate = this.eventDate.end.validDate
      const validEndTime = this.eventDate.end.validTime

      return validStartDate && validStartTime && validEndDate && validEndTime
    }
  }
}
</script>
