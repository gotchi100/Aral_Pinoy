<template>
  <div>
   <b-container class="py-5">
     <b-row class="pb-5">
       <b-col cols="12">
         <b-card style="border-radius: 20px;">
          <b-container fluid>
            <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; font-size: 20px; text-align: left;">
              <b-link to="/events">Upcoming Events <b-icon icon="chevron-right" /></b-link>
            </h2>

            <b-row>
              <b-col
                v-for="event in events.results"
                :key="event._id"
                cols="12"
                md="3"
              >
                <b-card style="border-radius: 20px;">
                  <b-link :to="`/events/${event._id}`" style="font-size:20px;">
                    {{ event.name }}
                  </b-link><br>

                  <b-row style="text-align: left">
                    <b-col v-if="event.location !== undefined" class="pb-2" cols="12">
                      <b-icon icon="geo-alt"></b-icon> {{ event.location.name }}
                    </b-col>

                    <b-col class="pb-2" cols="12">
                      <b-icon icon="calendar"></b-icon>
                      {{
                        new Date(event.date.start).toLocaleString('en-us', {
                          dateStyle: 'short',
                          timeStyle: 'short'
                        })
                      }}
                    </b-col>

                    <b-col class="pb-3" cols="12">
                      <b-icon icon="clock"></b-icon> {{ getDurationBetweenDates(event.date.start, event.date.end) }}
                    </b-col>
                  </b-row>

                  <b-row v-if="event.goals.monetaryDonation.target !== 0">
                    <b-col class="pt-2" cols="12">
                      <b-progress height="1.5rem" :max="event.goals.monetaryDonation.target">
                        <b-progress-bar
                          variant="success"
                          :value="event.goals.monetaryDonation.current"
                          :label="getMonetaryDonationCurrentLabel(event.goals.monetaryDonation)"
                        ></b-progress-bar>

                        <b-progress-bar
                          variant="danger"
                          :value="hasGoalReached(event.goals.monetaryDonation) ? 0 : event.goals.monetaryDonation.target"
                          :label="getMonetaryDonationTargetLabel(event.goals.monetaryDonation)"
                        ></b-progress-bar>
                      </b-progress>
                    </b-col>
                  </b-row>

                  <b-row v-if="event.goals.numVolunteers.target !== 0">
                    <b-col class="pt-2" cols="12">
                      <b-progress height="1.5rem" :max="event.goals.numVolunteers.target">
                        <b-progress-bar
                          variant="success"
                          :value="event.goals.numVolunteers.current"
                          :label="getVolunteerGoalCurrentLabel(event.goals.numVolunteers)"
                        ></b-progress-bar>

                        <b-progress-bar
                          variant="danger"
                          :value="hasGoalReached(event.goals.numVolunteers) ? 0 : event.goals.numVolunteers.target"
                          :label="getVolunteerGoalTargetLabel(event.goals.numVolunteers)"
                        ></b-progress-bar>
                      </b-progress>
                    </b-col>
                  </b-row>
                </b-card>
              </b-col>
            </b-row>
          </b-container>
      </b-card>
       </b-col>
     </b-row>

     <b-row class="pb-5">
       <b-col cols="12">
         <b-card style="border-radius: 20px;">
          <b-container fluid>
              <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; font-size: 20px; text-align: left;">SDG Campaign</h2>
              <b-row>
                <b-col>
                  <b-card style="margin-left:100px; margin-bottom:20px; width: 250px; height:250px;" img-src="https://cdn.iconscout.com/icon/free/png-256/chart-growth-1913955-1624750.png" img-alt="Card image" img-top>
                    <b-row>
                      <label for="input-small" style="font-family:'Bebas Neue', cursive;">No Poverty</label>
                    </b-row>
                    <b-row>
                      <b-button to="/edit-sdg1"  v-if="isDisabled">SDG #1</b-button>
                    </b-row>
                  </b-card>
                </b-col>
                <b-col>
                  <b-card style="margin-left:50px; margin-right:50px; margin-bottom:20px; width: 250px; height:250px;" img-src="https://cdn.iconscout.com/icon/free/png-256/chart-growth-1913955-1624750.png" img-alt="Card image" img-top>
                    <b-row>
                      <label for="input-small" style="font-family:'Bebas Neue', cursive;">Quality Education</label>
                    </b-row>
                    <b-row>
                      <b-button to="/edit-sdg4"  v-if="isDisabled">SDG #4</b-button>
                    </b-row>
                  </b-card>
                </b-col>
                <b-col>
                  <b-card style="margin-right:100px; margin-bottom:20px; width: 250px; height:250px;" img-src="https://cdn.iconscout.com/icon/free/png-256/chart-growth-1913955-1624750.png" img-alt="Card image" img-top>
                    <b-row>
                      <label for="input-small" style="font-family:'Bebas Neue', cursive;">Climate Action</label>
                    </b-row>
                    <b-row>
                      <b-button to="/edit-sdg13"  v-if="isDisabled">SDG #13</b-button>
                    </b-row>
                  </b-card>
                  </b-col>
              </b-row>
              <b-row>
                <b-col cols="10"></b-col>
                <b-col>
                    <b-button style="margin-top:60px;" @click="isDisabled = true"  pill variant="danger" v-show="!isDisabled">Edit SDG</b-button>
                    <b-button style="margin-top:60px;" @click="isDisabled = false"  pill variant="danger" v-show="isDisabled">Cancel</b-button>
                </b-col>
              </b-row>
            </b-container>
        </b-card>
       </b-col>
     </b-row>

     <b-row class="pb-5">
       <b-col cols="12">
         <b-card style="border-radius: 20px;">
          <b-container fluid>
              <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; font-size: 20px; text-align: left;">Income & Expense Report</h2>
              <b-img center src="https://www.syncfusion.com/blogs/wp-content/uploads/2021/02/Stacked-column-chart-showing-the-past-years%E2%80%99-income-and-expense-details-along-with-categories..jpg" style="width: 592px; height:390px;" alt="Center image"></b-img>
              <h4>Sample Data Visualization</h4>
            </b-container>
        </b-card>
       </b-col>
     </b-row>

     <b-row>
       <b-col cols="12">
         <b-card style="border-radius: 20px;">
          <b-container fluid>
              <h2 style="font-family:'Bebas Neue', cursive; text-align: left;">
                Latest Donations Collected
              </h2>

              <b-row class="mb-4">
                <b-col cols="12">
                  <b-card style="border-radius: 20px;">
                    <b-container fluid>
                      <b-row class="mb-3">
                        <b-col cols="12">
                          <h3 style="font-family:'Bebas Neue', cursive;">
                            In-Kind Donations
                          </h3>
                        </b-col>
                      </b-row>

                      <b-row class="mb-3">
                        <b-col cols="12">
                          <b-table
                            :items="groupedIkd.results"
                            :fields="groupedIkd.fields"
                            :current-page="1"
                            :per-page="5"
                            stacked="md"
                            show-empty
                            small
                            hover
                          ></b-table>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col cols="12">
                          <b-button
                            to="/inkind-donations"
                            pill
                            variant="danger"
                          >
                            View More In-Kind Donations
                          </b-button>
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-card>
                </b-col>
              </b-row>

              <b-row class="mb-4">
                <b-col cols="12">
                  <b-card style="border-radius: 20px;">
                    <b-container fluid>
                      <b-row class="mb-3">
                        <b-col cols="12">
                          <h3 style="font-family:'Bebas Neue', cursive;">
                            Monetary Donations
                          </h3>
                        </b-col>
                      </b-row>

                      <b-row class="mb-3">
                        <b-col cols="12">
                          <b-table
                            :items="eventDonations.results"
                            :fields="eventDonations.fields"
                            :current-page="1"
                            :per-page="5"
                            stacked="md"
                            show-empty
                            small
                            hover
                          >
                            <template #cell(volunteerName)="{ item }">
                              <b-link
                                v-if="item.user !== undefined"
                                :to="`/volunteers/${item.user._id}`"
                              >
                                {{ item.user.firstName }} {{ item.user.lastName }}
                              </b-link>

                              <span v-else>
                                Anonymous
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

                            <template #cell(contact)="{ item }">
                              <span v-if="getValueFromPath(item, 'metadata.contactDetails.email') !== undefined">
                                <a :href="`mailto:${getValueFromPath(item, 'metadata.contactDetails.email')}`">
                                  {{ getValueFromPath(item, 'metadata.contactDetails.email') }}
                                </a>
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

                      <b-row>
                        <b-col cols="12">
                          <b-button
                            to="/monetary-donations"
                            pill
                            variant="danger"
                          >
                            View More Monetary Donations
                          </b-button>
                        </b-col>
                      </b-row>
                    </b-container>
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
import { get } from 'lodash'
import {
  isSameDay,
  intervalToDuration,
  formatDuration
} from 'date-fns'
import { apiClient } from '../axios'
import InkindDonationRepository from '../repositories/inkind-donations'
import EventDonationRepository from '../repositories/events/donations'

const logo = require('../assets/aralpinoywords.png')

const inkindDonationRepository = new InkindDonationRepository(apiClient)
const eventDonationRepository = new EventDonationRepository(apiClient)

export default {
  name: 'Register',
  data () {
    return {
      logo,
      isDisabled: false,
      items: [
        { date: '9/27/21', item: 'Unicef Shirt Large', qty: 20, ctgry: 'Apparel', bestbefore: 'N/A', expiration: 'N/A' },
        { date: '9/27/21', item: 'Unicef Shirt Medium', qty: 20, ctgry: 'Apparel', bestbefore: 'N/A', expiration: 'N/A' },
        { date: '9/27/21', item: 'Unicef Shirt Small', qty: 40, ctgry: 'Apparel', bestbefore: 'N/A', expiration: 'N/A' },
        { date: '9/27/21', item: 'Monggol Volume 2 Pencil', qty: 300, ctgry: 'School Material', bestbefore: 'N/A', expiration: 'N/A' },
        { date: '9/27/21', item: 'Nissin Cup Noodles', qty: 250, ctgry: 'Food', bestbefore: '10/15/25', expiration: '10/20/25' },
        { date: '9/27/21', item: 'FUnicef Shirt Large', qty: 20, ctgry: 'Apparel', bestbefore: 'N/A', expiration: 'N/A' },
        { date: '9/27/21', item: 'FUnicef Shirt Medium', qty: 20, ctgry: 'Apparel', bestbefore: 'N/A', expiration: 'N/A' },
        { date: '9/27/21', item: 'FUnicef Shirt Small', qty: 40, ctgry: 'Apparel', bestbefore: 'N/A', expiration: 'N/A' },
        { date: '9/27/21', item: 'Bonggol Volume 2 Pencil', qty: 300, ctgry: 'School Material', bestbefore: 'N/A', expiration: 'N/A' },
        { date: '9/27/21', item: 'Zissin Cup Noodles', qty: 250, ctgry: 'Food', bestbefore: '10/15/25', expiration: '10/20/25' },
        { date: '9/27/21', item: 'Bnicef Shirt Large', qty: 20, ctgry: 'Apparel', bestbefore: 'N/A', expiration: 'N/A' },
        { date: '9/27/21', item: 'Bnicef Shirt Medium', qty: 20, ctgry: 'Apparel', bestbefore: 'N/A', expiration: 'N/A' },
        { date: '9/27/21', item: 'Bnicef Shirt Small', qty: 40, ctgry: 'Apparel', bestbefore: 'N/A', expiration: 'N/A' },
        { date: '9/27/21', item: 'Nonggol Volume 2 Pencil', qty: 300, ctgry: 'School Material', bestbefore: 'N/A', expiration: 'N/A' },
        { date: '9/27/21', item: 'Missin Cup Noodles', qty: 250, ctgry: 'Food', bestbefore: '10/15/25', expiration: '10/20/25' },
        { date: '9/27/21', item: 'Ynicef Shirt Large', qty: 20, ctgry: 'Apparel', bestbefore: 'N/A', expiration: 'N/A' },
        { date: '9/27/21', item: 'Ynicef Shirt Medium', qty: 20, ctgry: 'Apparel', bestbefore: 'N/A', expiration: 'N/A' },
        { date: '9/27/21', item: 'Ynicef Shirt Small', qty: 40, ctgry: 'Apparel', bestbefore: 'N/A', expiration: 'N/A' },
        { date: '9/27/21', item: 'Yonggol Volume 2 Pencil', qty: 300, ctgry: 'School Material', bestbefore: 'N/A', expiration: 'N/A' },
        { date: '9/27/21', item: 'Pissin Cup Noodles', qty: 250, ctgry: 'Food', bestbefore: '10/15/25', expiration: '10/20/25' }
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
        { key: 'date', label: 'Date', sortable: true, class: 'text-center' },
        { key: 'item', label: 'Item', sortable: true, class: 'text-center' },
        { key: 'qty', label: 'Quantity', sortable: true, class: 'text-center' },
        { key: 'ctgry', label: 'Category', sortable: true, class: 'text-center' },
        { key: 'bestbefore', label: 'Best Before', sortable: true, class: 'text-center' },
        { key: 'expiration', label: 'Expiration Date', sortable: true, class: 'text-center' }
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
      pageOptions: [5, 10, { value: 100, text: 'Show a lot' }],
      pageOptionss: [5, 10, { value: 100, text: 'Show a lot' }],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filters: null,
      filterOn: [],
      filterOns: [],
      isLoadingEvents: false,
      events: {
        results: []
      },
      groupedIkd: {
        results: [],
        fields: [
          { key: '_id', label: 'Item Group' },
          { key: 'quantity', label: 'Quantity' }
        ]
      },
      eventDonations: {
        results: [],
        fields: [
          { key: 'createdAt', label: 'Transaction Date & Time' },
          { key: 'amount', label: 'Amount' },
          { key: 'volunteerName', label: 'Donor' },
          { key: 'contact', label: 'Contact' },
          { key: 'event', label: 'Event' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['token']),
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
    }
  },
  created () {
    inkindDonationRepository.setAuthorizationHeader(`Bearer ${this.token}`)
    eventDonationRepository.setAuthorizationHeader(`Bearer ${this.token}`)

    this.getEvents()
    this.getGroupedIkd()
    this.getEventDonations()
  },
  mounted () {
    // Set the initial number of items
    this.totalRows = this.items.length
    this.totalRows = this.choices.length
  },
  methods: {
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
      this.currentPages = 1
    },
    async getEvents () {
      this.isLoadingEvents = true

      const queryString = new URLSearchParams()

      queryString.set('limit', 4)
      queryString.set('filters.status', 'UPCOMING')
      queryString.set('sort.field', 'date.start')
      queryString.set('sort.order', 'asc')

      try {
        const { data } = await apiClient.get(`/events?${queryString.toString()}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        this.events.results = data.results
      } finally {
        this.isLoadingEvents = false
      }
    },
    async getGroupedIkd () {
      const { results } = await inkindDonationRepository.list({}, {
        limit: 5,
        offset: 0,
        grouped: true
      })

      this.groupedIkd.results = results
    },
    async getEventDonations () {
      const { results } = await eventDonationRepository.list({
        status: 'success'
      }, {
        limit: 5,
        offset: 0,
        expand: true,
        sort: {
          field: 'createdAt',
          order: 'desc'
        }
      })

      this.eventDonations.results = results
    },
    getValueFromPath (object, path, defaultValue) {
      return get(object, path, defaultValue)
    },
    isSameDay (firstDate, secondDate) {
      return isSameDay(new Date(firstDate), new Date(secondDate))
    },
    getDurationBetweenDates (start, end) {
      const duration = intervalToDuration({
        start: new Date(start),
        end: new Date(end)
      })

      return formatDuration(duration)
    },
    hasGoalReached ({ current, target }) {
      return current >= target
    },
    getMonetaryDonationCurrentLabel ({ current, target }) {
      if (current >= target) {
        const currentCurrency = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'PHP'
        }).format(current)

        const targetCurrency = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'PHP'
        }).format(target)

        return `${currentCurrency} / ${targetCurrency}`
      }

      return ''
    },
    getMonetaryDonationTargetLabel ({ current, target }) {
      if (current >= target) {
        const currency = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'PHP'
        }).format(current)

        return currency
      }

      const difference = target - current
      const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP'
      }).format(difference)

      return `We still need ${currency} to reach our goal!`
    },
    getVolunteerGoalCurrentLabel ({ current, target }) {
      if (current >= target) {
        const volunteerNoun = target === 1 ? 'volunteer' : 'volunteers'

        return `${current} / ${target} ${volunteerNoun}`
      }

      return ''
    },
    getVolunteerGoalTargetLabel ({ current, target }) {
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
