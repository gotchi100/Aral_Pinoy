<template>
<div class="volunteerlist">
  <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
  <b-container fluid>
    <!-- User Interface controls -->
    <h1 style="font-family:'Bebas Neue', cursive;">
        Volunteers
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
      <template #cell(email)="row">
        <b-link :to="`/volunteers/${row.index}`">{{ row.value }}</b-link>
      </template>

      <template #cell(name)="row">
        {{ row.item.firstName }} {{ row.item.lastName }}
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
  <b-row>
    <b-col cols="10"></b-col>
    <b-col>
      <b-button to="/view-volunteer-profile" pill variant="danger" style="margin-top: 12px; margin-bottom: 12px; display: inline-block; font-size: 16px; width: 150px;">
          (Temp view volunteer profile)
      </b-button>
    </b-col>
  </b-row>
</b-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { email: 'Macdonald@gmail.com', firstName: 'Dickerson', lastName: 'Macdonald', contactNumber: '091857489714' },
        { email: 'Shaw@gmail.com', firstName: 'Larsen', lastName: 'Shaw', contactNumber: '090857475614' },
        { email: 'Navarro@gmail.com', firstName: 'Mini', lastName: 'Navarro', contactNumber: '098857489714' },
        { email: 'Wilson@gmail.com', firstName: 'Geneva', lastName: 'Wilson', contactNumber: '048857489712' },
        { email: 'Carney@gmail.com', firstName: 'Jami', lastName: 'Carney', contactNumber: '068857489712' },
        { email: 'Dunlap@gmail.com', firstName: 'Essie', lastName: 'Dunlap', contactNumber: '018857489712' },
        { email: 'Macdonald@gmail.com', firstName: 'Thor', lastName: 'Macdonald', contactNumber: '088857489712' },
        { email: 'Navarro@gmail.com', firstName: 'Mitzi', lastName: 'Navarro', contactNumber: '098857689712' },
        { email: 'Wilson@gmail.com', firstName: 'Genevieve', lastName: 'Wilson', contactNumber: '098837489712' },
        { email: 'Carney@gmail.com', firstName: 'John', lastName: 'Carney', contactNumber: '096857489712' },
        { email: 'Dunlap@gmail.com', firstName: 'Dick', lastName: 'Dunlap', contactNumber: '099857489712' },
        { email: 'Macdonald@gmail.com', firstName: 'Dickerson', lastName: 'Macdonald', contactNumber: '091857489714' },
        { email: 'Shaw@gmail.com', firstName: 'Larsen', lastName: 'Shaw', contactNumber: '090857475614' },
        { email: 'Navarro@gmail.com', firstName: 'Mini', lastName: 'Navarro', contactNumber: '098857489714' },
        { email: 'Wilson@gmail.com', firstName: 'Geneva', lastName: 'Wilson', contactNumber: '048857489712' },
        { email: 'Carney@gmail.com', firstName: 'Jami', lastName: 'Carney', contactNumber: '068857489712' },
        { email: 'Dunlap@gmail.com', firstName: 'Essie', lastName: 'Dunlap', contactNumber: '018857489712' },
        { email: 'Macdonald@gmail.com', firstName: 'Thor', lastName: 'Macdonald', contactNumber: '088857489712' },
        { email: 'Navarro@gmail.com', firstName: 'Mitzi', lastName: 'Navarro', contactNumber: '098857689712' },
        { email: 'Wilson@gmail.com', firstName: 'Genevieve', lastName: 'Wilson', contactNumber: '098837489712' },
        { email: 'Carney@gmail.com', firstName: 'John', lastName: 'Carney', contactNumber: '096857489712' },
        { email: 'Dunlap@gmail.com', firstName: 'Dick', lastName: 'Dunlap', contactNumber: '099857489712' }
      ],
      fields: [
        { key: 'email', label: 'Email', sortable: true, class: 'text-center' },
        { key: 'name', label: 'Full Name', sortable: true, sortDirection: 'desc' },
        { key: 'contactNumber', label: 'Contact Number', sortable: true, class: 'text-center' }
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
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>
.volunteerlist {
position: relative;
}
.volunteerlist:before {
background-image: url('https://rs.projects-abroad.ie/v1/hero/product-5b5b2f57d7d1b.[1600].jpeg');
content: ' ';
display: block;
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
opacity: 0.4;
background-repeat: no-repeat;
background-size: cover;
padding-top: 695px;
}
</style>
