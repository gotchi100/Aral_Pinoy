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

            <b-container v-else-if="event !== null" fluid>
              <b-row class="pb-4">
                <b-col cols="12">
                  <b-card style="border-radius: 20px;">
                    <b-row>
                      <b-col cols="12" md="6">
                        <h1 class="text-start" style="font-family:'Bebas Neue', cursive;">
                          {{ event.name }}
                        </h1>
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
                              <b-img
                                v-if="event.logoUrl !== undefined"
                                :src="event.logoUrl"
                                fluid
                                alt="event logo"
                                style="border: 1px solid"
                              />

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

                          <b-row v-if="event.goals.monetaryDonation.target !== 0" class="pb-4">
                            <b-col cols="12">
                              <b-progress height="2rem" style="border-radius:30px;" :max="event.goals.monetaryDonation.target">
                                <b-progress-bar
                                  variant="success"
                                  :value="event.goals.monetaryDonation.current"
                                  :label="getMonetaryDonationCurrentLabel(event.goals.monetaryDonation.current, event.goals.monetaryDonation.target)"
                                ></b-progress-bar>

                                <b-progress-bar
                                  variant="danger"
                                  :value="monetaryDonationReached ? 0 : event.goals.monetaryDonation.target"
                                  :label="getMonetaryDonationTargetLabel(event.goals.monetaryDonation.current, event.goals.monetaryDonation.target)"
                                ></b-progress-bar>
                              </b-progress>
                            </b-col>
                          </b-row>

                          <b-row v-if="event.goals.numVolunteers.target !== 0" class="pb-4">
                            <b-col cols="12">
                              <b-progress height="2rem" style="border-radius:30px;" :max="event.goals.numVolunteers.target">
                                <b-progress-bar
                                  variant="success"
                                  :value="event.goals.numVolunteers.current"
                                  :label="getVolunteerGoalCurrentLabel(event.goals.numVolunteers.current, event.goals.numVolunteers.target)"
                                ></b-progress-bar>

                                <b-progress-bar
                                  variant="danger"
                                  :value="volunteerGoalReached ? 0 : event.goals.numVolunteers.target"
                                  :label="getVolunteerGoalTargetLabel(event.goals.numVolunteers.current, event.goals.numVolunteers.target)"
                                ></b-progress-bar>
                              </b-progress>
                            </b-col>
                          </b-row>

                          <b-row v-if="hasGoals">
                            <b-col cols="12">
                              <b-card>
                                <b-container fluid>
                                  <b-row class="text-center" align-h="center">
                                    <template v-if="event.status === 'UPCOMING'">
                                      <b-col
                                        v-if="event.goals.numVolunteers.target !== 0 && !hasAlreadyVolunteered"
                                        class="m-1"
                                        cols="12"
                                        md="4"
                                      >
                                        <b-button
                                          variant="primary"
                                          style="width: 100%"
                                          :disabled="volunteerGoalReached || hasAlreadyVolunteered"
                                          @click="volunteerModal = true"
                                        >
                                          VOLUNTEER
                                        </b-button>
                                      </b-col>

                                      <b-col
                                        v-if="hasAlreadyVolunteered"
                                        class="m-1"
                                        cols="12"
                                        md="4"
                                      >
                                        <b-button
                                          variant="outline-danger"
                                          style="width: 100%"
                                          @click="unjoinEventModal = true"
                                        >
                                          UNJOIN
                                        </b-button>
                                      </b-col>

                                      <b-col
                                        v-if="event.goals.monetaryDonation.target !== 0"
                                        class="m-1"
                                        cols="12"
                                        md="4"
                                      >
                                        <b-button
                                          variant="success"
                                          style="width: 100%"
                                          :disabled="monetaryDonationReached"
                                          @click="donationModal = true"
                                        >
                                          DONATE
                                        </b-button>
                                      </b-col>
                                    </template>

                                    <b-col
                                      v-else-if="event.status === 'ENDED' && hasAlreadyVolunteered"
                                      class="m-1"
                                      cols="12"
                                      md="4"
                                    >
                                      <b-button
                                        variant="primary"
                                        style="width: 100%"
                                        :disabled="hasAlreadyEvaluation"
                                        @click="$router.push({ path: `/events/${eventId}/evaluation` })"
                                      >
                                        {{
                                          hasAlreadyEvaluation ? 'Thank you for the evaluation' : 'Answer Evaluation'
                                        }}
                                      </b-button>
                                    </b-col>

                                    <b-col
                                      v-else-if="event.status === 'CANCELED'"
                                      class="m-1"
                                      cols="12"
                                      md="4"
                                    >
                                      <b-button
                                        variant="outline-danger"
                                        style="width: 100%"
                                        disabled
                                      >
                                        Event has been cancelled
                                      </b-button>
                                    </b-col>
                                  </b-row>
                                </b-container>
                              </b-card>
                            </b-col>
                          </b-row>
                        </b-container>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>

              <b-row v-if="event.description !== undefined" class="pb-4">
                <b-col cols="12">
                  <b-card style="border-radius: 20px;">
                    <h1 class="text-start" style="font-family:'Bebas Neue', cursive;">
                      Event Description
                    </h1>

                    <p class="text-start">
                      {{ event.description }}
                    </p>
                  </b-card>
                </b-col>
              </b-row>

              <b-row v-if="Array.isArray(event.sdgs)" class="pb-4">
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

              <event-donation-modal
                :event="{ _id: event._id, name: event.name}"
                :show="donationModal"
                @close="donationModal = false"
              ></event-donation-modal>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-modal
      v-if="event !== null && Array.isArray(event.jobs)"
      v-model="volunteerModal"
      size="xl"
      hide-footer
    >
      <b-container>
        <b-row>
          <b-col cols="12">
            <b-card style="margin-top:20px;">
              <b-container>
                <b-row class="pb-3">
                  <b-col cols="12">
                    <h2>Roles</h2>
                  </b-col>
                </b-row>

                <b-row class="pb-5" v-for="job in event.jobs" :key="job.name">
                  <b-col cols="12">
                    <h5>{{ job.name }}</h5>

                    <b-row align-v="center" align-h="center">
                      <b-col cols="10">
                        <b-progress height="2rem" :max="job.slots.max">
                          <b-progress-bar
                            variant="success"
                            :value="job.slots.current"
                            :label="getVolunteerGoalCurrentLabel(job.slots.current, job.slots.max)"
                          ></b-progress-bar>

                          <b-progress-bar
                            variant="danger"
                            :value="job.slots.max"
                            :label="getVolunteerGoalTargetLabel(job.slots.current, job.slots.max)"
                          ></b-progress-bar>
                        </b-progress>
                      </b-col>

                      <b-col cols="2">
                        <b-button
                          variant="success"
                          :disabled="job.slots.current >= job.slots.max"
                          @click="selectEventJob(job.name)"
                        >
                          JOIN THIS ROLE
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-container>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>

    <b-modal
      v-model="unjoinEventModal"
      @ok="unjoinEvent"
      @cancel="unjoinEventModal = false"
    >
      <b-container>
        <b-row>
          <b-col cols="12">
            <h5>
              Are you sure you want to unjoin this event?
            </h5>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>

    <b-modal
      v-model="confirmEventVolunteerModal"
      @ok="createEventVolunteer(eventJobName)"
      @cancel="eventJobName = null"
    >
      <b-container>
        <b-row>
          <b-col cols="12">
            <h5>
              Please confirm your registration:
              <br /><br />
              Role: <strong>{{ eventJobName }}</strong>
            </h5>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>

    <b-modal v-model="donationStatusModal" size="lg" hide-footer>
      <b-container>
        <b-row>
          <b-col cols="12" style="text-align: center">
            <h1
              :style="donationStatus.success ? 'color: green;' : 'color: red'"
            >
              <b-icon
                :icon="donationStatus.success ? 'check-circle' : 'x-circle'"
              />
            </h1>
            <h6>
              Reference ID: {{ donationStatus.referenceNumber }}
            </h6>
          </b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col cols="12">
            <h2 style="text-align: center">
              {{
                donationStatus.success
                ? 'Thank you for your donation!'
                : 'It seems there was a problem with your transaction.'
              }}
            </h2>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <h6 style="text-align: center">
              For issues or concerns, please contact us at <a href="">support@aralpinoy.xyz</a>
            </h6>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import EventDonationModal from '../../components/EventDonationModal'
import { apiClient } from '../../axios'

const logo = require('../../assets/aralpinoywords.png')

export default {
  name: 'EventDetails',
  components: {
    EventDonationModal
  },
  data () {
    return {
      logo,
      event: null,
      eventVolunteer: null,
      isLoadingEvent: false,
      donationModal: false,
      donationStatusModal: false,
      donationStatus: {
        success: false,
        referenceNumber: ''
      },
      volunteerModal: false,
      unjoinEventModal: false,
      confirmEventVolunteerModal: false,
      eventJobName: null
    }
  },
  async created () {
    if (this.user !== null) {
      await this.getEventVolunteer()
    }

    this.getEvent()

    if (this.hasDonationStatus) {
      this.showDonationStatusModal()
    }
  },
  computed: {
    ...mapGetters(['user', 'token']),
    eventId () {
      return this.$route.params.id
    },
    hasGoals () {
      if (this.event === null) {
        return false
      }

      return this.event.goals.numVolunteers.target !== 0 || this.event.goals.monetaryDonation.target !== 0
    },
    hasAlreadyVolunteered () {
      return this.eventVolunteer !== null
    },
    hasAlreadyEvaluation () {
      if (this.eventVolunteer === null) {
        return false
      }

      return this.eventVolunteer.hasEventEvaluation
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
    hasDonationStatus () {
      const {
        donationSuccess,
        referenceNumber
      } = this.$route.query

      if (donationSuccess === undefined || donationSuccess === '') {
        return false
      }

      if (referenceNumber === undefined || referenceNumber === '') {
        return false
      }

      return true
    }
  },
  methods: {
    async showDonationStatusModal () {
      const {
        donationSuccess,
        referenceNumber
      } = this.$route.query

      this.donationStatus = {
        success: donationSuccess === 'true',
        referenceNumber
      }

      this.$router.replace({
        path: this.$route.path
      })

      this.donationStatusModal = true
    },
    async getEvent () {
      this.isLoadingEvent = true
      const eventId = this.eventId

      try {
        const { data } = await apiClient.get(`/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        this.event = data
      } finally {
        this.isLoadingEvent = false
      }
    },
    async getEventVolunteer () {
      const userId = this.user._id
      const eventId = this.eventId

      const queryString = new URLSearchParams()

      queryString.set('limit', 1)
      queryString.set('filters.userId', userId)
      queryString.set('filters.eventId', eventId)

      const { data } = await apiClient.get(`/event-volunteers?${queryString.toString()}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      if (data.total === 0) {
        return
      }

      this.eventVolunteer = data.results[0]
    },
    async createEventVolunteer (eventJobName) {
      if (this.user === null) {
        return this.$router.push({ path: '/login' })
      }

      const userId = this.user._id
      const eventId = this.eventId

      await apiClient.post('/event-volunteers', {
        userId,
        eventId,
        eventJobName
      }, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      this.$router.go()
    },
    async unjoinEvent () {
      if (this.user === null) {
        return this.$router.push({ path: '/login' })
      }

      if (this.eventVolunteer === null) {
        return
      }

      const id = this.eventVolunteer._id

      await apiClient.delete(`/event-volunteers/${id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      this.$router.go()
    },
    selectEventJob (jobName) {
      this.eventJobName = jobName

      if (this.eventJobName) {
        this.confirmEventVolunteerModal = true
      }
    },
    getMonetaryDonationCurrentLabel (current, target) {
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
    getMonetaryDonationTargetLabel (current, target) {
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
    getVolunteerGoalCurrentLabel (current, target) {
      if (current >= target) {
        return `We have reached our goal! (${current} / ${target} have volunteered)`
      }

      const volunteerNoun = current === 1 ? 'volunteer' : 'volunteers'

      return `${current} ${volunteerNoun}`
    },
    getVolunteerGoalTargetLabel (current, target) {
      if (current >= target) {
        return ''
      }

      const difference = target - current
      const volunteerNoun = difference === 1 ? 'volunteer' : 'volunteers'

      return `We still need ${difference} ${volunteerNoun}!`
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
</style>
