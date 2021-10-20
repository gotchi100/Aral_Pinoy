<template>
    <body>
    <div>
      <div class="image">
        <img :src="logo" style="width: 320px; height: 150px">
      </div>
      <b-card class="card" bg-variant="light" style="display: inline-block; max-height:50rem; width: 1000px; border-radius: 20px;">
      <h3 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">User Profile</h3>
        <b-container fluid>
          <b-row class="my-1">
            <label class="name" for="input-small" style="font-family:'Bebas Neue', cursive;">First Name</label>
            <b-col>
              <b-form-input v-model="name" :disabled="!isDisabled"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <label class="name" for="input-small" style="font-family:'Bebas Neue', cursive;">First Name</label>
            <b-col>
              <b-form-input v-model="name" :disabled="!isDisabled"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <label class="cnum" for="input-small" style="font-family:'Bebas Neue', cursive;">Contact Number</label>
            <b-col>
              <b-form-input v-model="cnum" :disabled="!isDisabled"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <label class="email" for="input-small" style="font-family:'Bebas Neue', cursive;">Email Address</label>
            <b-col>
              <b-form-input v-model="email" :disabled="!isDisabled"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
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
          </b-button>
        </b-container>
      </b-card>
       <b-card class="card" bg-variant="light" style="display: inline-block; height: 450px; width: 1000px; border-radius: 20px; margin-top:20px;">
        <h3 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">Volunteer Events</h3>
        <b-container fluid>
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
            <template #cell(name)="row">
              {{ row.value.first }} {{ row.value.last }}
            </template>

            <template #cell(actions)="row">
              <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
                Info modal
              </b-button>
              <b-button size="sm" @click="row.toggleDetails">
                {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
              </b-button>
            </template>

            <template #row-details="row">
              <b-card>
                <ul>
                  <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                </ul>
              </b-card>
            </template>
          </b-table>
              <!-- Info modal -->
            <!-- <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
              <pre>{{ infoModal.content }}</pre>
            </b-modal> -->
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
       <b-card class="card" bg-variant="light" style="display: inline-block; height: 450px; width: 1000px; border-radius: 20px; margin-top:20px;">
        <h3 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">Donation History</h3>
        <b-container fluid>
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
            <template #cell(name)="row">
              {{ row.value.first }} {{ row.value.last }}
            </template>

            <template #cell(actions)="row">
              <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
                Info modal
              </b-button>
              <b-button size="sm" @click="row.toggleDetails">
                {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
              </b-button>
            </template>

            <template #row-details="row">
              <b-card>
                <ul>
                  <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                </ul>
              </b-card>
            </template>
          </b-table>
              <!-- Info modal -->
            <!-- <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
              <pre>{{ infoModal.content }}</pre>
            </b-modal> -->
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
     </div>
     <br>
     <Footer />
    </body>
</template>

<script>
import Footer from '../components/Footer.vue'
const logo = require('../assets/aralpinoywords.png')

export default {
  components: {
    Footer
  },
  data () {
    return {
      logo,
      isDisabled: false,
      items: [
        { email: 'Macdonald@gmail.com', name: { first: 'Dickerson', last: 'Macdonald' }, number: 91857489714 },
        { email: 'Shaw@gmail.com', name: { first: 'Larsen', last: 'Shaw' }, number: 90857475614 },
        { email: 'Navarro@gmail.com', name: { first: 'Mini', last: 'Navarro' }, number: 98857489714 },
        { email: 'Wilson@gmail.com', name: { first: 'Geneva', last: 'Wilson' }, number: 48857489712 },
        { email: 'Carney@gmail.com', name: { first: 'Jami', last: 'Carney' }, number: 68857489712 },
        { email: 'Dunlap@gmail.com', name: { first: 'Essie', last: 'Dunlap' }, number: 18857489712 },
        { email: 'Macdonald@gmail.com', name: { first: 'Thor', last: 'Macdonald' }, number: 88857489712 },
        { email: 'Navarro@gmail.com', name: { first: 'Mitzi', last: 'Navarro' }, number: 98857689712 },
        { email: 'Wilson@gmail.com', name: { first: 'Genevieve', last: 'Wilson' }, number: 98837489712 },
        { email: 'Carney@gmail.com', name: { first: 'John', last: 'Carney' }, number: 96857489712 },
        { email: 'Dunlap@gmail.com', name: { first: 'Dick', last: 'Dunlap' }, number: 99857489712 },
        { email: 'Macdonald@gmail.com', name: { first: 'Dickerson', last: 'Macdonald' }, number: 91857489714 },
        { email: 'Shaw@gmail.com', name: { first: 'Larsen', last: 'Shaw' }, number: 90857475614 },
        { email: 'Navarro@gmail.com', name: { first: 'Mini', last: 'Navarro' }, number: 98857489714 },
        { email: 'Wilson@gmail.com', name: { first: 'Geneva', last: 'Wilson' }, number: 48857489712 },
        { email: 'Carney@gmail.com', name: { first: 'Jami', last: 'Carney' }, number: 68857489712 },
        { email: 'Dunlap@gmail.com', name: { first: 'Essie', last: 'Dunlap' }, number: 18857489712 },
        { email: 'Macdonald@gmail.com', name: { first: 'Thor', last: 'Macdonald' }, number: 88857489712 },
        { email: 'Navarro@gmail.com', name: { first: 'Mitzi', last: 'Navarro' }, number: 98857689712 },
        { email: 'Wilson@gmail.com', name: { first: 'Genevieve', last: 'Wilson' }, number: 98837489712 },
        { email: 'Carney@gmail.com', name: { first: 'John', last: 'Carney' }, number: 96857489712 },
        { email: 'Dunlap@gmail.com', name: { first: 'Dick', last: 'Dunlap' }, number: 99857489712 }
      ],
      fields: [
        { key: 'name', label: 'Full Name', sortable: true, sortDirection: 'desc' },
        { key: 'email', label: 'Email', sortable: true, class: 'text-center' },
        { key: 'number', label: 'Contact Number', sortable: true, class: 'text-center' }
        // {
        //   key: 'isActive',
        //   label: 'Is Active',
        //   formatter: (value, key, item) => {
        //     return value ? 'Yes' : 'No'
        //   },
        //   sortable: true,
        //   sortByFormatted: true,
        //   filterByFormatted: true
        // },
        // { key: 'actions', label: 'Actions' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, { value: 100, text: 'Show a lot' }],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      }
    }
  },
  computed: {
    sortOption () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  mounted () {
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  methods: {
    info (item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    // resetInfoModal () {
    //   this.infoModal.title = ''
    //   this.infoModal.content = ''
    // },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
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
