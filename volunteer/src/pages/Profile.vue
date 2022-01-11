<template>
  <div>
    <b-container>
      <b-row class="py-5">
        <b-col cols="12">
          <img :src="logo" style="width: 320px; height: 150px">
        </b-col>
      </b-row>

      <b-row class="pb-4">
        <b-col cols="12">
          <b-card bg-variant="light" style="border-radius: 20px;">
            <h3 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">User Profile</h3>
            <b-container fluid>
              <b-row class="my-1">
                <label class="name" for="input-small" style="font-family:'Bebas Neue', cursive;">First Name</label>
                <b-col>
                  <b-form-input v-model="profile.firstName" :disabled="!isDisabled"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <label class="name" for="input-small" style="font-family:'Bebas Neue', cursive;">Last Name</label>
                <b-col>
                  <b-form-input v-model="profile.lastName" :disabled="!isDisabled"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <label class="cnum" for="input-small" style="font-family:'Bebas Neue', cursive;">Contact Number</label>
                <b-col>
                  <b-form-input v-model="profile.contactNumber" :disabled="!isDisabled"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <label class="email" for="input-small" style="font-family:'Bebas Neue', cursive;">Gender</label>
                <b-col>
                  <b-form-input v-model="profile.gender" :disabled="!isDisabled"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <label class="email" for="input-small" style="font-family:'Bebas Neue', cursive;">Home Address</label>
                <b-col>
                  <b-form-input v-model="profile.address.home" :disabled="!isDisabled"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <label class="email" for="input-small" style="font-family:'Bebas Neue', cursive;">Skills</label>
                <b-col>
                  <b-form-input :value="skillNames" disabled></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <label class="email" for="input-small" style="font-family:'Bebas Neue', cursive;">Email Address</label>
                <b-col>
                  <b-form-input v-model="profile.email" :disabled="!isDisabled"></b-form-input>
                </b-col>
              </b-row>
              <b-button pill variant="danger" @click="isDisabled = true" v-show="!isDisabled" style="margin: 8px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
                Edit
              </b-button>
              <b-button pill variant="danger" @click="isDisabled = false" v-show="isDisabled" style="margin: 8px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
                Save
              </b-button>
            </b-container>
          </b-card>
        </b-col>
      </b-row>

      <b-row class="pb-4">
        <b-col cols="12">
          <b-card class="mb-5" style="border-radius: 20px;">
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Events Attended
                  </h1>
                </b-col>
              </b-row>

              <b-row class="pb-4">
                <b-col cols="4">
                  <b-form-group style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                    label="Per page"
                    label-for="per-page-select"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                  >
                    <b-form-select
                      v-model="eventVolunteers.pagination.perPage"
                      :options="pageOptions"
                      style="width: 25%"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>

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
                    <template #cell(event)="{ item }">
                      <b-link :to="`/events/${item.event._id}`">
                        {{ item.event.name }}
                      </b-link>
                    </template>

                    <template #cell(startDate)="{ item }">
                      <span>
                        {{
                          new Date(item.event.date.start).toLocaleString('en-us', {
                            dateStyle: 'short',
                            timeStyle: 'short'
                          })
                        }}
                      </span>
                    </template>

                    <template #cell(status)="{ item }">
                      <span v-if="item.event.status !== undefined">
                        {{ item.event.status }}
                      </span>
                      <span v-else>
                        UPCOMING
                      </span>
                    </template>

                    <template #cell(action)="{ item }">
                      <b-link
                        v-if="item.event.status === 'ENDED'"
                        :to="`/events/${item.event._id}/evaluation`"
                      >
                        Evaluation
                      </b-link>

                      <b-link
                        v-else
                        :to="`/events/${item.event._id}`"
                      >
                        Unjoin
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
            </b-container>
          </b-card>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12">
          <b-card class="mb-5" style="border-radius: 20px;">
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Donation History
                  </h1>
                </b-col>
              </b-row>

              <b-row class="pb-4">
                <b-col cols="4">
                  <b-form-group style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                    label="Per page"
                    label-for="per-page-select"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                  >
                    <b-form-select
                      v-model="eventDonations.pagination.perPage"
                      :options="pageOptions"
                      style="width: 25%"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <b-table
                    :items="getEventDonations"
                    :fields="eventDonations.fields"
                    :current-page="eventDonations.pagination.currentPage"
                    :per-page="eventDonations.pagination.perPage"
                    show-empty
                    small
                    stacked="md"
                    style="background:white"
                  >
                    <template #cell(createdAt)="{ value }">
                      <span v-if="value !== undefined && value !== ''">
                        {{
                          new Date(value).toLocaleString('en-us', {
                            dateStyle: 'short',
                            timeStyle: 'short'
                          })
                        }}
                      </span>
                    </template>

                    <template #cell(event)="{ item }">
                      <b-link :to="`/events/${item.event._id}`">
                        {{ item.event.name }}
                      </b-link>
                    </template>
                  </b-table>
                </b-col>
              </b-row>

              <b-row class="justify-content-md-center">
                <b-col cols="6" class="my-1">
                  <b-pagination
                    v-model="eventDonations.pagination.currentPage"
                    :total-rows="eventDonations.total"
                    :per-page="eventDonations.pagination.perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                  ></b-pagination>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { get } from 'lodash'

import { apiClient } from '../axios'
import Footer from '../components/Footer.vue'
import EventDonationRepository from '../repositories/events/donations'
import EventVolunteerRepository from '../repositories/events/volunteers'

const logo = require('../assets/aralpinoywords.png')

const eventDonationRepository = new EventDonationRepository(apiClient)
const eventVolunteerRepository = new EventVolunteerRepository(apiClient)

export default {
  components: {
    Footer
  },
  data () {
    return {
      logo,
      isDisabled: false,
      profile: {
        firstName: '',
        lastName: '',
        contactNumber: '',
        email: '',
        gender: '',
        skills: [],
        address: {
          home: ''
        }
      },
      password: '',
      cpassword: '',
      items: [
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Upcoming', action: 'Unjoin' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed', action: 'Evaluation' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Upcoming', action: 'Unjoin' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed', action: 'Evaluation' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Upcoming', action: 'Unjoin' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed', action: 'Evaluation' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Upcoming', action: 'Unjoin' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed', action: 'Evaluation' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Upcoming', action: 'Unjoin' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed', action: 'Evaluation' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Upcoming', action: 'Unjoin' },
        { date: '09/27/21', event: 'Zatangas Coastal Cleanup', venue: 'Batangas', status: 'Completed', action: 'Evaluation' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Upcoming', action: 'Unjoin' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed', action: 'Evaluation' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Upcoming', action: 'Unjoin' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed', action: 'Evaluation' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Upcoming', action: 'Unjoin' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed', action: 'Evaluation' }
      ],
      choices: [
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', amount: '3,500.50', payee: 'BPI Aral Pinoy Org Inc.' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', amount: '4,500.00', payee: 'BPI Aral Pinoy Org Inc.' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', amount: '13,500.00', payee: 'PayMaya Aral Pinoy Org Inc.' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', amount: '3,500.50', payee: 'PayMaya Aral Pinoy Org Inc.' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', amount: '3,500.50', payee: 'PayMaya Aral Pinoy Org Inc.' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', amount: '2,500.50', payee: 'BPI Aral Pinoy Org Inc.' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', amount: '1,500.50', payee: 'BPI Aral Pinoy Org Inc.' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', amount: '3,500.50', payee: 'BPI Aral Pinoy Org Inc.' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', amount: '3,500.50', payee: 'PayMaya Aral Pinoy Org Inc.' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', amount: '8,500.50', payee: 'BPI Aral Pinoy Org Inc.' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', amount: '3,500.50', payee: 'BPI Aral Pinoy Org Inc.' },
        { event: 'Zatangas Coastal Cleanup', date: '09/27/21', amount: '3,500.50', payee: 'BPI Aral Pinoy Org Inc.' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', amount: '4,500.50', payee: 'BPI Aral Pinoy Org Inc.' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', amount: '3,500.50', payee: 'PayMaya Aral Pinoy Org Inc.' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', amount: '3,500.50', payee: 'PayMaya Aral Pinoy Org Inc.' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', amount: '3,500.50', payee: 'BPI Aral Pinoy Org Inc.' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', amount: '3,500.50', payee: 'BPI Aral Pinoy Org Inc.' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', amount: '3,500.50', payee: 'PayMaya Aral Pinoy Org Inc.' }
      ],
      fields: [
        { key: 'event', label: 'Event', sortable: true, class: 'text-center' },
        { key: 'date', label: 'Date', sortable: true, class: 'text-center' },
        { key: 'venue', label: 'Venue', sortable: true, class: 'text-center' },
        { key: 'status', label: 'Status', sortable: true, class: 'text-center' },
        { key: 'action', label: 'Action', sortable: true, class: 'text-center' }
      ],
      fielders: [
        { key: 'event', label: 'Event', sortable: true, class: 'text-center' },
        { key: 'date', label: 'Date', sortable: true, class: 'text-center' },
        { key: 'amount', label: 'Amount', sortable: true, class: 'text-center' },
        { key: 'payee', label: 'Paid To', sortable: true, class: 'text-center' }
      ],
      totalRows: 1,
      currentPage: 1,
      currentPages: 1,
      perPage: 5,
      perPages: 5,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filters: null,
      filterOn: [],
      filterOns: [],
      eventVolunteers: {
        results: [],
        total: 0,
        pagination: {
          perPage: 5,
          currentPage: 1
        },
        fields: [
          { key: 'event', label: 'Event' },
          { key: 'startDate', label: 'Date' },
          { key: 'event.location.name', label: 'Venue' },
          { key: 'status', label: 'Status' },
          { key: 'action', label: 'Action' }
        ]
      },
      eventDonations: {
        results: [],
        total: 0,
        pagination: {
          perPage: 5,
          currentPage: 1
        },
        fields: [
          { key: '_id', label: 'Reference Number' },
          { key: 'createdAt', label: 'Transaction Date' },
          { key: 'amount', label: 'Amount' },
          { key: 'event', label: 'Event' },
          { key: 'status', label: 'Status' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['user', 'token']),
    sortOption () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    },
    sortOptions () {
      // Create an options list from our fields
      return this.fielders
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    },
    skillNames () {
      const skillNames = []

      if (!Array.isArray(this.profile.skills)) {
        return ''
      }

      for (const skill of this.profile.skills) {
        skillNames.push(skill.name)
      }

      return skillNames.join(', ')
    },
    eventDonationsPageOffset () {
      return (this.eventDonations.pagination.currentPage - 1) * this.eventDonations.pagination.perPage
    },
    eventVolunteersPageOffset () {
      return (this.eventVolunteers.pagination.currentPage - 1) * this.eventVolunteers.pagination.perPage
    }
  },
  created () {
    eventDonationRepository.setAuthorizationHeader(`Bearer ${this.token}`)
    eventVolunteerRepository.setAuthorizationHeader(`Bearer ${this.token}`)

    const user = this.user

    this.profile.firstName = user.firstName
    this.profile.lastName = user.lastName
    this.profile.contactNumber = user.contactNumber
    this.profile.email = user.email
    this.profile.gender = user.gender
    this.profile.skills = user.skills

    if (user.address !== undefined && user.address.home !== undefined) {
      this.profile.address.home = user.address.home
    }
  },
  mounted () {
    // Set the initial number of items
    this.totalRows = this.items.length
    this.totalRows = this.choices.length
  },
  methods: {
    async getEventVolunteers (ctx) {
      const userId = this.user._id

      const perPage = this.eventVolunteers.pagination.perPage
      const pageOffset = this.eventVolunteersPageOffset

      const { results, total } = await eventVolunteerRepository.list({
        userId,
        eventStatuses: ['UPCOMING', 'ENDED']
      }, {
        limit: perPage,
        offset: pageOffset,
        expand: true
      })

      this.eventVolunteers.total = total

      return results
    },
    async getEventDonations (ctx) {
      const userId = this.user._id

      const perPage = this.eventDonations.pagination.perPage
      const pageOffset = this.eventDonationsPageOffset

      const { results, total } = await eventDonationRepository.list({
        userId
      }, {
        limit: perPage,
        offset: pageOffset,
        expand: true,
        sort: {
          field: 'updatedAt',
          order: 'desc'
        }
      })

      this.eventDonations.total = total

      return results
    },
    getValueFromPath (object, path, defaultValue) {
      return get(object, path, defaultValue)
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
      this.currentPages = 1
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
</style>
