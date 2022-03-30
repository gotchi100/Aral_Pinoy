<template>
  <b-modal
    v-model="modal"
    size="xl"
    hide-footer
    @hide="$emit('close')"
  >
    <b-overlay
      :show="isLoading"
      rounded="sm"
    >
      <b-card>
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

          <b-row>
            <b-col cols="12">
              <h4
                style="font-family:'Bebas Neue', cursive;"
                no-body
              >
                Total Amount Received:
                {{
                  new Intl.NumberFormat('en-us', {
                    style: 'currency',
                    currency: 'PHP'
                  }).format(event.totalDonation)
                }}
              </h4>
            </b-col>
          </b-row>

          <b-row class="pt-4">
            <b-col cols="12">
              <b-table
                :items="getEventDonations"
                :fields="eventDonations.fields"
                :current-page="eventDonations.pagination.currentPage"
                :per-page="eventDonations.pagination.perPage"
                stacked="md"
                style="background:white"
                show-empty
                small
                primary-key="_id"
                hover
                @row-clicked="showDonationReceipt"
              >
                <template #cell(createdAt)="{ value }">
                  {{
                    new Date(value).toLocaleString('en-us', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })
                  }}
                </template>

                <template #cell(amount)="{ value }">
                  {{
                    new Intl.NumberFormat('en-us', {
                      style: 'currency',
                      currency: 'PHP'
                    }).format(value)
                  }}
                </template>

                <template #cell(donor)="{ item }">
                  <span v-if="item.user !== undefined">
                    <b-link :to="`/volunteers/${item.user._id}`">
                      {{ item.user.firstName }} {{ item.user.lastName }}
                    </b-link>
                  </span>
                  <span v-else>
                    Anonymous
                  </span>
                </template>

                <template #cell(eventName)="{ item }">
                  <b-link :to="`/events/${item.event._id}`">
                    {{ item.event.name }}
                  </b-link>
                </template>

                <template #cell(status)="{ value }">
                  {{ value.toUpperCase() }}
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
                v-model="eventDonations.pagination.currentPage"
                :total-rows="eventDonations.total"
                :per-page="eventDonations.pagination.perPage"
                align="fill"
                size="sm"
                class="my-0"
              />
            </b-col>
          </b-row>
        </b-container>
      </b-card>
    </b-overlay>

    <b-modal
      v-model="donationReceipt.modal"
      size="xl"
      hide-footer
    >
      <div>
        <div class="addskill">
          <b-card
            class="card"
            style="display: inline-block; height: 100%; overflow: auto; width: 1100px; border-radius: 20px; margin-top: 40px;"
          >
            <b-container fluid>
              <h1
                style="font-family:'Bebas Neue', cursive;"
                no-body
                class="text-center"
              >
                <b-row>
                  <b-col>Donation Detail</b-col>
                  <b-col />
                  <b-col>
                    <img
                      :src="logo"
                      style="margin-left: 25px; width: 200px; height: 60px"
                    >
                  </b-col>
                </b-row>
              </h1>

              <hr style="height:20px;">

              <b-row class="mb-4">
                <b-col
                  cols="6"
                  class="text-center"
                >
                  Reference Number
                </b-col>

                <b-col cols="6">
                  <b-form-input
                    v-model="donationReceipt.form.referenceNumber"
                    readonly
                  />
                </b-col>
              </b-row>

              <b-row>
                <b-col
                  cols="6"
                  class="text-center"
                >
                  Sent To
                </b-col>

                <b-col cols="6">
                  <b-form-input
                    v-model="donationReceipt.form.eventName"
                    readonly
                  />
                </b-col>
              </b-row>

              <hr style="height:20px;">

              <b-row class="mb-4">
                <b-col
                  cols="6"
                  class="text-center"
                >
                  Date Received
                </b-col>

                <b-col cols="6">
                  <b-form-input
                    v-model="donationReceipt.form.createdAt"
                    readonly
                  />
                </b-col>
              </b-row>

              <b-row class="mb-4">
                <b-col
                  cols="6"
                  class="text-center"
                >
                  Donated By
                </b-col>

                <b-col cols="6">
                  <b-form-input
                    v-model="donationReceipt.form.donor.name"
                    readonly
                  />
                </b-col>
              </b-row>

              <b-row>
                <b-col
                  cols="6"
                  class="text-center"
                >
                  Contact Details
                </b-col>

                <b-col>
                  <b-form-input
                    v-model="donationReceipt.form.donor.contact"
                    readonly
                  />
                </b-col>
              </b-row>

              <hr style="height:20px;">

              <b-row>
                <b-col
                  cols="6"
                  class="text-center"
                >
                  Amount
                </b-col>

                <b-col>
                  <b-form-input
                    v-model="donationReceipt.form.amount"
                    readonly
                  />
                </b-col>
              </b-row>

              <hr style="height:20px;">

              <b-row>
                <b-col />
                <b-col class="text-center">
                  Thank you for the donation!
                </b-col>
                <b-col />
              </b-row>
            </b-container>
          </b-card>
        </div>
      </div>
    </b-modal>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import { apiClient } from '../../axios'
import EventDonationRepository from '../../repositories/events/donations'

const logo = require('../../assets/aralpinoywords.png')

const eventDonationRepository = new EventDonationRepository(apiClient)

export default {
  name: 'MonetaryDonationEventDonationList',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    event: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      logo,
      modal: false,
      isLoading: false,
      eventDonations: {
        results: [],
        total: 0,
        pagination: {
          perPage: 5,
          currentPage: 1
        },
        fields: [
          { key: 'createdAt', label: 'Transaction Date & Time' },
          { key: 'amount', label: 'Total Amount Received' },
          { key: 'donor', label: 'Donor' }
        ]
      },
      donationReceipt: {
        modal: false,
        form: {
          referenceNumber: '',
          eventName: '',
          createdAt: '',
          donor: {
            name: '',
            contact: ''
          },
          amount: 0
        }
      }
    }
  },
  computed: {
    ...mapGetters(['token']),
    eventId () {
      return this.event._id
    },
    eventDonationsPageOffset () {
      return (this.eventDonations.pagination.currentPage - 1) * this.eventDonations.pagination.perPage
    },
    eventTotalDonationAmount () {
      return this.event.totalDonation
    }
  },
  watch: {
    show (val) {
      this.modal = val
    }
  },
  created () {
    eventDonationRepository.setAuthorizationHeader(`Bearer ${this.token}`)
  },
  methods: {
    async getEventDonations (ctx) {
      const perPage = this.eventDonations.pagination.perPage
      const pageOffset = this.eventDonationsPageOffset

      const eventId = this.eventId

      const { results, total } = await eventDonationRepository.list({
        eventId,
        status: 'success'
      }, {
        limit: perPage,
        offset: pageOffset,
        expand: true,
        sort: {
          field: 'createdAt',
          order: 'desc'
        }
      })

      this.eventDonations.total = total

      return results
    },
    showDonationReceipt (eventDonation) {
      let donorName = 'Anonymous'
      let contact = ''

      if (eventDonation.user !== undefined) {
        donorName = `${eventDonation.user.firstName} ${eventDonation.user.lastName}`
      }

      if (eventDonation.metadata !== undefined && eventDonation.metadata.contactDetails) {
        contact = eventDonation.metadata.contactDetails.email
      }

      const form = {
        referenceNumber: eventDonation._id,
        eventName: eventDonation.event.name,
        createdAt: new Date(eventDonation.createdAt).toLocaleString('en-us', {
          dateStyle: 'medium',
          timeStyle: 'short'
        }),
        donor: {
          name: donorName,
          contact
        },
        amount: new Intl.NumberFormat('en-us', {
          style: 'currency',
          currency: 'PHP'
        }).format(eventDonation.amount)
      }

      this.donationReceipt.form = form
      this.donationReceipt.modal = true
    }
  }
}
</script>
