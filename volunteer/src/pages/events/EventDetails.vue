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
                                Status: <i>{{ event.status !== undefined ? event.status : '-' }}</i>
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

                          <b-row v-if="event.goals.numVolunteers.target !== 0" class="pb-4">
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

                          <b-row v-if="hasGoals">
                            <b-col cols="12">
                              <b-card>
                                <b-container fluid>
                                  <b-row class="text-center" align-h="center">
                                    <b-col
                                      v-if="event.goals.numVolunteers.target !== 0"
                                      class="m-1"
                                      cols="12"
                                      md="4"
                                    >
                                      <b-button
                                        variant="primary"
                                        style="width: 100%"
                                        :disabled="volunteerGoalReached"
                                      >
                                        VOLUNTEER
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
                                      >
                                        DONATE
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
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const logo = require('../../assets/aralpinoywords.png')
const { apiClient } = require('../../axios')

export default {
  name: 'EventDetails',
  data () {
    return {
      logo,
      event: null,
      isLoadingEvent: false,
      eventJobFields: [
        { key: 'name', label: 'Title' },
        { key: 'description', label: 'Description' },
        { key: 'requirements.max', label: 'Number of Volunteers Needed' },
        { key: 'skills', label: 'Skills' }
      ]
    }
  },
  created () {
    this.getEvent()
  },
  computed: {
    ...mapGetters(['token']),
    eventId () {
      return this.$route.params.id
    },
    hasGoals () {
      if (this.event === null) {
        return false
      }

      return this.event.goals.numVolunteers.target !== 0 || this.event.goals.monetaryDonation.target !== 0
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

      const volunteerNoun = target - current === 1 ? 'volunteer' : 'volunteers'

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
    }
  },
  methods: {
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
