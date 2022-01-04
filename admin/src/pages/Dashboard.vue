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
              <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; font-size: 20px; text-align: left;">Latest Donations Collected</h2>
              <b-col>
                <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1200px; border-radius: 20px; margin-top:40px;">
                <b-container fluid>
                  <!-- User Interface controls -->
                  <h3 style="font-family:'Bebas Neue', cursive;">
                      In-Kind Donations
                  </h3>
                  <b-row>
                    <b-container class="bv-example-row">
                      <b-row>
                        <b-col>
                          <b-col sm="5" md="6" class="my-1">
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
                                id="per-page-select"
                                v-model="perPage"
                                :options="pageOptions"
                                size="sm"
                              ></b-form-select>
                            </b-form-group>
                          </b-col>
                        </b-col>
                        <b-col>
                        </b-col>
                        <b-col>
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
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-row>

                  <!-- Main table element -->
                  <b-table
                    :items="items"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :filter="filter"
                    :filter-included-fields="filterOn"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :sort-direction="sortDirection"
                    stacked="md"
                    show-empty
                    small
                    @filtered="onFiltered"
                    style="background:white"
                  >
                    <template #cell(event)="row">
                      <b-link :to="`/events/${row.index}`">{{ row.value }}</b-link>
                    </template>
                  </b-table>
                <b-row>
                  <b-col></b-col>
                  <b-col>
                      <b-col class="my-1">
                        <b-pagination
                          v-model="currentPage"
                          :total-rows="totalRows"
                          :per-page="perPage"
                          align="fill"
                          size="sm"
                          class="my-0"
                        ></b-pagination>
                      </b-col>
                  </b-col>
                  <b-col></b-col>
                </b-row>
                <b-row>
                  <b-col cols="9"></b-col>
                    <b-col>
                      <b-button to="/inkind-donations" pill variant="danger" style="margin-top: 12px; margin-bottom: 12px; display: inline-block; font-size: 16px; width: 250px;">
                        View More In-Kind Donations
                      </b-button>
                  </b-col>
                </b-row>
                </b-container>
              </b-card>
              </b-col>
              <b-col>
                <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1200px; border-radius: 20px; margin-top:40px;">
                <b-container fluid>
                  <!-- User Interface controls -->
                  <h3 style="font-family:'Bebas Neue', cursive;">
                      Monetary Donations
                  </h3>
                  <b-row>
                    <b-container class="bv-example-row">
                      <b-row>
                        <b-col>
                          <b-col sm="5" md="6" class="my-1">
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
                                id="per-page-select"
                                v-model="perPages"
                                :options="pageOptionss"
                                size="sm"
                              ></b-form-select>
                            </b-form-group>
                          </b-col>
                        </b-col>
                        <b-col>
                        </b-col>
                        <b-col>
                          <br>
                          <b-input-group size="sm">
                            <p style="font-size: 20px; font-family:'Bebas Neue', cursive;">Search &nbsp; &nbsp; </p>
                            <b-form-input
                              id="filter-input"
                              v-model="filters"
                              type="search"
                              placeholder="Type to Search" style="height:30px; width:300px; border-radius: 10px;"
                            ></b-form-input>
                          </b-input-group>
                          <br>
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-row>

                  <!-- Main table element -->
                  <b-table
                    :items="choices"
                    :fields="fielders"
                    :current-page="currentPages"
                    :per-page="perPages"
                    :filter="filters"
                    :filter-included-fielders="filterOns"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :sort-direction="sortDirection"
                    stacked="md"
                    show-empty
                    small
                    @filtered="onFiltered"
                    style="background:white"
                  >
                    <template #cell(event)="row">
                      <b-link :to="`/events/${row.index}`">{{ row.value }}</b-link>
                    </template>
                  </b-table>
                <b-row>
                  <b-col></b-col>
                  <b-col>
                      <b-col class="my-1">
                        <b-pagination
                          v-model="currentPages"
                          :total-rows="totalRows"
                          :per-page="perPages"
                          align="fill"
                          size="sm"
                          class="my-0"
                        ></b-pagination>
                      </b-col>
                  </b-col>
                  <b-col></b-col>
                </b-row>
                <b-row>
                  <b-col cols="9"></b-col>
                    <b-col>
                      <b-button to="/monetary-list" pill variant="danger" style="margin-top: 12px; margin-bottom: 12px; display: inline-block; font-size: 16px; width: 250px;">
                        View More Monetary Donations
                      </b-button>
                  </b-col>
                </b-row>
                </b-container>
              </b-card>
              </b-col>
            </b-container>
        </b-card>
       </b-col>
     </b-row>
   </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  isSameDay,
  intervalToDuration,
  formatDuration
} from 'date-fns'

const logo = require('../assets/aralpinoywords.png')
const { apiClient } = require('../axios')

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
    this.getEvents()
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

        return `We have reached our goal! (${currentCurrency} / ${targetCurrency})`
      }

      const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP'
      }).format(current)

      return currency
    },
    getMonetaryDonationTargetLabel ({ current, target }) {
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
    getVolunteerGoalCurrentLabel ({ current, target }) {
      if (current >= target) {
        return `We have reached our goal! (${current} / ${target} have volunteered)`
      }

      const volunteerNoun = current === 1 ? 'volunteer' : 'volunteers'

      return `${current} ${volunteerNoun}`
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
