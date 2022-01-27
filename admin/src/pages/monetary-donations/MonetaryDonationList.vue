<template>
  <div>
    <b-container class="py-5">
      <b-row>
        <b-col cols="12">
          <b-card style="border-radius: 20px;">
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Monetary Donations Received
                  </h1>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <b-tabs pills card>
                    <b-tab title="Donated to Aral Pinoy Organization" disabled>
                      <!-- <b-row>
                        <b-col cols="12">
                          <b-container>
                            <b-row>
                              <b-col cols="4">
                                <b-form-group
                                  style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                                  label="Per page"
                                  label-for="per-page-select"
                                  content-cols="12"
                                >
                                  <b-form-select
                                    id="per-page-select"
                                    class="w-25"
                                    v-model="orgTransactionPerPage"
                                    :options="pageOptions"
                                  ></b-form-select>
                                </b-form-group>
                              </b-col>
                            </b-row>
                          </b-container>
                        </b-col>
                      </b-row>

                      <b-row class="pt-4">
                        <b-col cols="12">
                          <b-table
                            :items="getOrganizationTransactions"
                            :fields="orgTransactionFields"
                            :current-page="orgTransactionCurrentPage"
                            :per-page="orgTransactionPerPage"
                            stacked="md"
                            style="background:white"
                            show-empty
                            small
                            primary-key="_id"
                          >
                          <template #cell(date)="row">
                              {{
                                new Date(row.value).toLocaleString('en-us', {
                                  dateStyle: 'medium'
                                })
                              }}
                            </template>

                            <template #cell(name)="row">
                              {{ row.value.first }} {{ row.value.last }}
                            </template>

                            <template #cell(contact)="row">
                              <template v-if="checkOrganizationContacts(row.item.receiver.organization.contacts)">
                                <span v-if="row.item.receiver.organization.contacts.length === 1">
                                  {{row.item.receiver.organization.contacts[0].name}} &lt;{{row.item.receiver.organization.contacts[0].contactMethods[0].value}}&gt;
                                </span>

                                <b-dropdown
                                  v-else
                                  text="See List"
                                  style="width: 100%"
                                  menu-class="w-100"
                                  variant="outline-primary"
                                >
                                  <b-dropdown-item
                                    v-for="(contact, index) in row.item.receiver.organization.contacts"
                                    :key="index"
                                    disabled
                                  >
                                    <span style="color: black">
                                      {{contact.name}} &lt;{{contact.contactMethods[0].value}}&gt;
                                    </span>
                                  </b-dropdown-item>
                                </b-dropdown>
                              </template>
                            </template>

                            <template #cell(status)="row">
                              <b-dropdown v-if="row.value==='PENDING'" :text="row.value" size="sm">
                              <b-dropdown-item
                                  @click="showTransactionStatusUpdateConfirmModal(row.item._id, 'COMPLETE')"
                                >
                                  COMPLETE
                                </b-dropdown-item>

                                <b-dropdown-item
                                  @click="showTransactionStatusUpdateConfirmModal(row.item._id, 'RETURNED')"
                                >
                                  RETURNED
                                </b-dropdown-item>
                              </b-dropdown>

                              <span v-else>
                                {{ row.value }}
                              </span>
                            </template>
                          </b-table>
                        </b-col>
                      </b-row>

                      <b-row class="pt-4 justify-content-md-center">
                          <b-col cols="6" class="my-1">
                            <b-pagination
                              v-model="orgTransactionCurrentPage"
                              :total-rows="orgTransactionTotal"
                              :per-page="orgTransactionPerPage"
                              align="fill"
                              size="sm"
                              class="my-0"
                            ></b-pagination>
                          </b-col>
                      </b-row> -->
                    </b-tab>

                    <b-tab title="Donated to Aral Pinoy Events" active>
                      <b-row>
                        <b-col cols="12">
                          <b-container>
                            <b-row>
                              <b-col cols="4">
                                <b-form-group
                                  style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                                  label="Per page"
                                  label-for="per-page-select"
                                  content-cols="12"
                                >
                                  <b-form-select
                                    id="per-page-select"
                                    class="w-25"
                                    v-model="events.pagination.perPage"
                                    :options="pageOptions"
                                  ></b-form-select>
                                </b-form-group>
                              </b-col>

                              <!-- TODO: Implement search for inkind donation outbound transactions for organizations -->
                              <!-- <b-col>
                                <br>
                                <b-input-group size="sm">
                                  <p style="font-size: 20px; font-family:'Bebas Neue', cursive;">Search &nbsp; &nbsp; </p>
                                  <b-form-input
                                    id="filter-input"
                                    v-model="filter"
                                    type="search"
                                    placeholder="Type to Search" style="height:30px; width:300px; border-radius: 10px;"
                                  ></b-form-input>
                                </b-input-group>
                                <br>
                              </b-col> -->
                            </b-row>
                          </b-container>
                        </b-col>
                      </b-row>

                      <b-row class="pt-4">
                        <b-col cols="12">
                          <b-table
                            :items="getEvents"
                            :fields="events.fields"
                            :current-page="events.pagination.currentPage"
                            :per-page="events.pagination.perPage"
                            stacked="md"
                            style="background:white"
                            show-empty
                            primary-key="_id"
                            hover
                            @row-clicked="showEventDonations"
                          >
                            <template #cell(startDate)="{ item }">
                              {{
                                new Date(item.date.start).toLocaleString('en-us', {
                                  dateStyle: 'medium'
                                })
                              }}
                            </template>

                            <template #cell(name)="{ item }">
                              <b-link :to="`/events/${item._id}`">
                                {{ item.name }}
                              </b-link>
                            </template>

                            <template #cell(donationGoal)="{ item }">
                              {{
                                new Intl.NumberFormat('en-us', {
                                  style: 'currency',
                                  currency: 'PHP'
                                }).format(item.goals.monetaryDonation.target)
                              }}
                            </template>

                            <template #cell(donationCurrent)="{ item }">
                              {{
                                new Intl.NumberFormat('en-us', {
                                  style: 'currency',
                                  currency: 'PHP'
                                }).format(item.goals.monetaryDonation.current)
                              }}
                            </template>
                          </b-table>
                        </b-col>
                      </b-row>

                      <MonetaryDonationEventDonationList
                        :show="eventDonations.modal"
                        :event="eventDonations.event"
                      />

                      <b-row class="pt-4 justify-content-md-center">
                        <b-col cols="6" class="my-1">
                          <b-pagination
                            v-model="events.pagination.currentPage"
                            :total-rows="events.total"
                            :per-page="events.pagination.perPage"
                            align="fill"
                            size="sm"
                            class="my-0"
                          ></b-pagination>
                        </b-col>
                      </b-row>
                    </b-tab>
                  </b-tabs>
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
import EventRepository from '../../repositories/events'
import MonetaryDonationEventDonationList from '../../components/monetary-donations/MonetaryDonationEventDonationList'

const logo = require('../../assets/aralpinoywords.png')

const eventRepository = new EventRepository(apiClient)

export default {
  name: 'MonetaryDonationList',
  components: {
    MonetaryDonationEventDonationList
  },
  data () {
    return {
      logo,
      pageOptions: [5, 10, 20],
      events: {
        results: [],
        total: 0,
        pagination: {
          perPage: 5,
          currentPage: 1
        },
        fields: [
          { key: 'startDate', label: 'Date' },
          { key: 'name', label: 'Event Name' },
          { key: 'donationGoal', label: 'Donation Goal', class: 'text-end' },
          { key: 'donationCurrent', label: 'Donation Collection', class: 'text-end' },
          { key: 'status', label: 'Event Status' }
        ]
      },
      eventDonations: {
        modal: false,
        event: {}
      }
    }
  },
  created () {
    eventRepository.setAuthorizationHeader(`Bearer ${this.token}`)
  },
  computed: {
    ...mapGetters(['token']),
    eventsPageOffset () {
      return (this.events.pagination.currentPage - 1) * this.events.pagination.perPage
    }
  },
  methods: {
    async getEvents (ctx) {
      const perPage = this.events.pagination.perPage
      const pageOffset = this.eventsPageOffset

      const { results, total } = await eventRepository.list({
        hasMonetaryGoal: true
      }, {
        limit: perPage,
        offset: pageOffset,
        sort: {
          field: 'date.start',
          order: 'asc'
        }
      })

      this.events.total = total

      return results
    },
    showEventDonations (event) {
      this.eventDonations.modal = true
      this.eventDonations.event = {
        _id: event._id,
        name: event.name
      }
    }
  }
}
</script>
