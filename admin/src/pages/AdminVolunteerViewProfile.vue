<template>
    <body>
    <div>
      <div class="image">
        <img :src="logo" style="width: 320px; height: 150px">
      </div>
      <b-card class="card" bg-variant="light" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px;">
      <h3 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">User Profile</h3>
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
         <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
          <b-container fluid>
            <!-- User Interface controls -->
            <h1 style="font-family:'Bebas Neue', cursive;">
                Events Attended
            </h1>
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

          </b-container>
        </b-card>
      <br><br>
       <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
        <b-container fluid>
          <!-- User Interface controls -->
          <h1 style="font-family:'Bebas Neue', cursive;">
              Donation History
          </h1>
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

        </b-container>
      </b-card>
     </div>
     <br>
     <Footer />
    </body>
</template>

<script>
import { mapGetters } from 'vuex'

const logo = require('../assets/aralpinoywords.png')
const axios = require('axios').default

export default {
  data () {
    return {
      logo,
      user: null,
      isLoadingUser: false,
      items: [
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed' },
        { date: '09/27/21', event: 'Zatangas Coastal Cleanup', venue: 'Batangas', status: 'Completed' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed' },
        { date: '09/27/21', event: 'Batangas Coastal Cleanup', venue: 'Batangas', status: 'Completed' }
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
        { key: 'status', label: 'Status', sortable: true, class: 'text-center' }
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
      filterOns: []
    }
  },
  created () {
    this.getUser()
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
    },
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
    async getUser () {
      this.isLoadingUser = true

      const { id } = this.$route.params

      try {
        const { data } = await axios.get(`http://localhost:3000/users/${id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        this.user = data
      } finally {
        this.isLoadingUser = false
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

.image {
  padding-top: 50px;
  padding-bottom: 25px;
}
body {
  background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
  url('https://rs.projects-abroad.ie/v1/hero/product-5b5b2f57d7d1b.[1600].jpeg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
