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

                      <b-col v-if="event.status === undefined" class="text-end" cols="12" md="6">
                        <b-dropdown
                          text="Update Status"
                          variant="primary"
                          no-flip
                        >
                          <b-dropdown-item @click="cancelEventModal = true">
                            <strong style="color: red">CANCEL</strong>
                          </b-dropdown-item>
                          <b-dropdown-item @click="endEventModal = true">
                            <strong style="color: blue">END</strong>
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

              <b-row v-if="event.description !== undefined" class="py-4">
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
                      Items to be used for the Event
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
                        ></b-table>
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

    <b-modal v-model="showModal" size="xl">
      <b-container>
        <b-row>
          <b-col cols="12">
            <b-card>
              <b-row>
                <b-col>
                  <b-button>Download List</b-button>
                </b-col>
                <b-col>
                  <b-input-group size="sm">
                    <p style="font-size: 20px; font-family:'Bebas Neue', cursive;">Search &nbsp; &nbsp; </p>
                    <b-form-input
                      id="filter-input"
                      type="search"
                      placeholder="Type to Search" style="height:30px; width:300px; border-radius: 10px;"
                    ></b-form-input>
                  </b-input-group>
                </b-col>
              </b-row>
              <b-table
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="5"
                stacked="md"
                show-empty
                small
              ></b-table>
            <b-col class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="6"
                :per-page="5"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
            </b-col>
            </b-card>
          </b-col>

          <b-col cols="12">
            <b-card style="margin-top:20px;">
              <b-container>
                <b-row>
                  <b-col cols="12">
                    <h2>Role</h2>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col cols="12">
                    <h5>Trash Collector</h5>
                    <b-progress height="2rem" style="border-radius:30px;" :max="20">
                      <b-progress-bar :value="14" label="6 volunteers more are needed for this role"></b-progress-bar>
                    </b-progress>
                  </b-col>

                  <b-col cols="12">
                    <h5>Trash Bag Distributor</h5>
                    <b-progress height="2rem" style="border-radius:30px;" :max="20">
                      <b-progress-bar :value="12" label="8 volunteers more are needed for this role"></b-progress-bar>
                    </b-progress>
                  </b-col>
                </b-row>
              </b-container>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>

    <b-modal v-model="endEventModal" size="md">
      <b-container>
        <b-row>
          <b-col cols="12">
            <h1 class="text-center">
              Are you sure you want to <strong style="color: blue">END</strong> the event?
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
                @click="updateStatus('ENDED')"
              >
                CONFIRM
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </b-modal>

    <b-modal v-model="cancelEventModal" size="md">
      <b-container>
        <b-row>
          <b-col cols="12">
            <h1 class="text-center">
              Are you sure you want to <strong style="color: red">CANCEL</strong> the event?
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
                @click="updateStatus('CANCELED')"
              >
                CONFIRM
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </b-modal>
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
      showModal: false,
      currentPage: 1,
      items: [
        { name: 'John Anghel', contactNumber: '+639123456789', role: 'Trash Collector' },
        { name: 'Test Dawkins', contactNumber: '+639123356789', role: 'Trash Bag Distributor' },
        { name: 'Marco Sullivan', contactNumber: '+639323456789', role: 'Trash Collector' },
        { name: 'Zayn Bontoc', contactNumber: '+639123856789', role: 'Trash Bag Distributor' },
        { name: 'Arlyn Jimenez', contactNumber: '+639023456789', role: 'Trash Collector' },
        { name: 'Fredrick Gomez', contactNumber: '+639127456789', role: 'Trash Collector' }
      ],
      fields: [
        { key: 'name', label: 'Name', sortable: true, class: 'text-center' },
        { key: 'contactNumber', label: 'Contact Number', sortable: true, class: 'text-center' },
        { key: 'role', label: 'Role', sortable: true, class: 'text-center' }
      ],
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
        { key: 'quantity', label: 'Quantity' }
      ],
      endEventModal: false,
      cancelEventModal: false
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
    },
    async updateStatus (status) {
      this.isLoadingEvent = true
      this.endEventModal = false
      this.cancelEventModal = false

      const eventId = this.eventId

      try {
        await apiClient.patch(`/events/${eventId}/status`, {
          status
        }, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        this.event.status = status
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
.fixed {
  display: inline;
  position: fixed;
  right: 15px;
  bottom: 15px;
  z-index: 99999;
}
</style>
