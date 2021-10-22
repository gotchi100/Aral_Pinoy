<template>
<div class="volunteerlist">
  <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
  <b-container fluid>
    <!-- User Interface controls -->
    <h1 style="font-family:'Bebas Neue', cursive;">
        Officers
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
        <b-link :to="`/officers/${row.item._id}`">{{ row.value }}</b-link>
      </template>

      <template #cell(name)="row">
        {{ row.item.firstName }} {{ row.item.lastName }}
      </template>
    </b-table>
  <b-row>
    <b-col cols="10"></b-col>
    <b-col>
      <b-button to="/add-user" pill variant="danger" style="margin-top: 12px; margin-bottom: 12px; display: inline-block; font-size: 16px; width: 150px;">
          Add an Officer
      </b-button>
    </b-col>
  </b-row>
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
</template>

<script>
export default {
  data () {
    return {
      items: [
        { _id: '6172cd711ff80470e0fe0dd4', email: 'John@gmail.com', firstName: 'John', lastName: 'John', contactNumber: '+6391857489714' },
        { _id: '6172cd753b5075450daf5a5c', email: 'Kaarl@gmail.com', firstName: 'Karl', lastName: 'Karl', contactNumber: '+6390857475614' },
        { _id: '6172cd789f8997dbb37d42ba', email: 'Joshua@gmail.com', firstName: 'Joshua', lastName: 'Joshua', contactNumber: '+6398857489714' },
        { _id: '6172cd7ca5b93fac5e85f86b', email: 'Christian@gmail.com', firstName: 'Christian', lastName: 'Christian', contactNumber: '+6348857489712' }
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
