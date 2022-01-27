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
                  </b-card>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-modal v-model="updateEventStatus.modal" size="md">
      <b-container>
        <b-row>
          <b-col cols="12">
            <h5>
              Items used in the Event
            </h5>
          </b-col>

          <b-col cols="12">
            <b-table
              :items="updateEventStatus.itemsUsed"
              :fields="updateEventStatus.fields"
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { apiClient } from '../../axios'
import EventVolunteerRepository from '../../repositories/events/volunteers'

const logo = require('../../assets/aralpinoywords.png')

const eventVolunteerRepository = new EventVolunteerRepository(apiClient)

export default {
  name: 'EventDetails',
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
      // items: [
      //   { name: 'John Anghel', contactNumber: '+639123456789', role: 'Trash Collector' },
      //   { name: 'Test Dawkins', contactNumber: '+639123356789', role: 'Trash Bag Distributor' },
      //   { name: 'Marco Sullivan', contactNumber: '+639323456789', role: 'Trash Collector' },
      //   { name: 'Zayn Bontoc', contactNumber: '+639123856789', role: 'Trash Bag Distributor' },
      //   { name: 'Arlyn Jimenez', contactNumber: '+639023456789', role: 'Trash Collector' },
      //   { name: 'Fredrick Gomez', contactNumber: '+639127456789', role: 'Trash Collector' }
      // ],
      // fields: [
      //   { key: 'name', label: 'Name', sortable: true, class: 'text-center' },
      //   { key: 'contactNumber', label: 'Contact Number', sortable: true, class: 'text-center' },
      //   { key: 'role', label: 'Role', sortable: true, class: 'text-center' }
      // ],
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
        fields: [
          { key: 'item.name', label: 'Item' },
          { key: 'quantity', label: 'Number of Used Items', class: 'text-center' }
        ]
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
    }
  },
  created () {
    eventVolunteerRepository.setAuthorizationHeader(`Bearer ${this.token}`)

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
    async preUpdateStatus (status) {
      this.updateEventStatus.status = status

      if (status !== 'CANCELED' && Array.isArray(this.event.ikds) && this.event.ikds.length > 0) {
        this.updateEventStatus.modal = true

        return
      }

      this.updateEventStatus.confirmModal = true
    },
    async updateStatus (status) {
      this.isLoadingEvent = true
      this.updateEventStatus.modal = false
      this.updateEventStatus.confirmModal = false

      const eventId = this.eventId
      let itemsUnused

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

      try {
        await apiClient.patch(`/events/${eventId}/status`, {
          status,
          itemsUnused
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
