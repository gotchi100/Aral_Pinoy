<template>
  <div>
    <div class="py-5">
      <img :src="logo" style="width: 320px; height: 150px">
    </div>

    <b-container v-if="isLoadingUser" style="height: 100vh">
      <b-row class="vh-100" align-h="center">
        <b-col cols="12" align-self="center">
          <b-spinner style="width: 10rem; height: 10rem;" />
        </b-col>
      </b-row>
    </b-container>

    <b-container v-else>
      <b-row class="pb-4">
        <b-col cols="12">
          <b-card style="border-radius: 20px;">
            <h3 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">
              User Profile
            </h3>

            <b-container fluid>
              <b-row class="my-1">
                <label for="input-small" style="font-family:'Bebas Neue', cursive;">First Name</label>
                <b-col>
                  <b-skeleton v-if="isLoadingUser" type="input"></b-skeleton>
                  <b-form-input v-else v-model="user.firstName" disabled></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label for="input-small" style="font-family:'Bebas Neue', cursive;">Last Name</label>
                <b-col>
                  <b-skeleton v-if="isLoadingUser" type="input"></b-skeleton>
                  <b-form-input v-else v-model="user.lastName" disabled></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label for="input-small" style="font-family:'Bebas Neue', cursive;">Contact Number</label>
                <b-col>
                  <b-skeleton v-if="isLoadingUser" type="input"></b-skeleton>
                  <b-form-input v-else v-model="user.contactNumber" disabled></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label for="input-small" style="font-family:'Bebas Neue', cursive;">Gender</label>
                <b-col>
                  <b-skeleton v-if="isLoadingUser" type="input"></b-skeleton>
                  <b-form-input v-else v-model="user.gender" disabled></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label for="input-small" style="font-family:'Bebas Neue', cursive;">Date of Birth</label>
                <b-col>
                  <b-skeleton v-if="isLoadingUser" type="input"></b-skeleton>
                  <b-form-input v-else v-model="birthDate" disabled></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label for="input-small" style="font-family:'Bebas Neue', cursive;">Home Address</label>
                <b-col>
                  <b-skeleton v-if="isLoadingUser" type="input"></b-skeleton>
                  <b-form-input v-else v-model="homeAddress" disabled></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label for="input-small" style="font-family:'Bebas Neue', cursive;">Email Address</label>
                <b-col>
                  <b-skeleton v-if="isLoadingUser" type="input"></b-skeleton>
                  <b-form-input v-else v-model="user.email" disabled></b-form-input>
                </b-col>
              </b-row>
              <!-- <b-row class="my-1">
                <label class="change" for="input-small" style="font-family:'Bebas Neue', cursive;">Change Password?</label>
              </b-row>
              <b-row class="my-1" v-if="isDisabled">
                <label class="password" for="input-small" style="font-family:'Bebas Neue', cursive;">New Password</label>
                <b-col>
                  <b-form-input v-model="password" :disabled="!isDisabled"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1" v-if="isDisabled">
                <label class="cpassword" for="input-small" style="font-family:'Bebas Neue', cursive;">Confirm Password</label>
                <b-col>
                  <b-form-input v-model="cpassword" :disabled="!isDisabled"></b-form-input>
                </b-col>
              </b-row>
              <b-button pill variant="danger" @click="isDisabled = true" v-show="!isDisabled" style="margin: 8px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
                    Edit
              </b-button>
              <b-button pill variant="danger" @click="isDisabled = false" v-show="isDisabled" style="margin: 8px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
                    Save
              </b-button> -->
            </b-container>
          </b-card>
        </b-col>
      </b-row>

      <b-row class="pb-4">
        <b-col cols="12">
          <b-card style="border-radius: 20px;">
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Events Volunteered
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
                      <span>
                        {{ item.event.status }}
                      </span>
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

      <b-row class="pb-4">
        <b-col cols="12">
          <b-card style="border-radius: 20px;">
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

                    <template #cell(amount)="{ value }">
                      <span>
                        {{
                          new Intl.NumberFormat('en-us', {
                            style: 'currency',
                            currency: 'PHP'
                          }).format(value)
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { apiClient } from '../../axios'
import EventDonationRepository from '../../repositories/events/donations'
import EventVolunteerRepository from '../../repositories/events/volunteers'

const logo = require('../../assets/aralpinoywords.png')

const eventDonationRepository = new EventDonationRepository(apiClient)
const eventVolunteerRepository = new EventVolunteerRepository(apiClient)

export default {
  name: 'VolunteerProfile',
  data () {
    return {
      logo,
      user: null,
      isLoadingUser: false,
      pageOptions: [5, 10, 15],
      eventVolunteers: {
        results: [],
        total: 0,
        pagination: {
          perPage: 5,
          currentPage: 1
        },
        fields: [
          { key: 'event', label: 'Event' },
          { key: 'startDate', label: 'Date & Time' },
          { key: 'event.location.name', label: 'Venue' },
          { key: 'status', label: 'Status' }
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
          { key: 'createdAt', label: 'Transaction Date & Time' },
          { key: 'amount', label: 'Amount' },
          { key: 'event', label: 'Event' },
          { key: 'status', label: 'Status' }
        ]
      }
    }
  },
  async created () {
    await this.getUser()

    eventDonationRepository.setAuthorizationHeader(`Bearer ${this.token}`)
    eventVolunteerRepository.setAuthorizationHeader(`Bearer ${this.token}`)
  },
  computed: {
    ...mapGetters(['token']),
    birthDate () {
      if (this.isLoadingUser) {
        return ''
      }

      if (!this.user.birthDate) {
        return ''
      }

      return new Date(this.user.birthDate).toLocaleString('en-us', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    homeAddress () {
      if (this.isLoadingUser) {
        return ''
      }

      if (!this.user.address || !this.user.address.home) {
        return ''
      }

      return this.user.address.home
    }
  },
  methods: {
    async getUser () {
      this.isLoadingUser = true

      const { id } = this.$route.params

      try {
        const { data } = await apiClient.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        this.user = data
      } finally {
        this.isLoadingUser = false
      }
    },
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
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
</style>
