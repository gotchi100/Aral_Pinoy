<template>
  <div class="suggestion">
    <b-card
      class="card"
      style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;"
    >
      <b-container fluid>
        <!-- User Interface controls -->
        <h1 style="font-family:'Bebas Neue', cursive;">
          Volunteer Suggestion List
        </h1>
        <b-row>
          <b-container class="bv-example-row">
            <b-row>
              <b-col>
                <br>
                <b-row>
                  <b-col>
                    <b-row class="my-1">
                      <b-col sm="2">
                        <label for="input-small">Location:</label>
                      </b-col>
                      <b-col sm="10">
                        <b-form-input
                          id="input-small"
                          size="sm"
                          placeholder="Batangas"
                          disabled
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
              <b-col />
              <b-col>
                <br>
                <b-input-group size="sm">
                  <p style="font-size: 20px; font-family:'Bebas Neue', cursive;">
                    Search &nbsp; &nbsp;
                  </p>
                  <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    placeholder="Type to Search"
                    style="height:30px; width:300px; border-radius: 10px;"
                  />
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
          style="background:white"
          @filtered="onFiltered"
        >
          <!-- <template #cell(email)="row">
        <b-link :to="`/officers/${row.item._id}`">{{ row.value }}</b-link>
      </template> -->

          <template #cell(name)="row">
            {{ row.item.firstName }} {{ row.item.lastName }}
          </template>
        </b-table>
        <b-row>
          <b-col cols="8" />
          <b-col>
            <b-button
              pill
              variant="danger"
              style="margin-top: 12px; margin-bottom: 12px; display: inline-block; font-size: 16px; width: 150px;"
            >
              Email Blast
            </b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col />
          <b-col>
            <b-col class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              />
            </b-col>
          </b-col>
          <b-col />
        </b-row>
      </b-container>
    </b-card>
    <b-card
      class="card"
      style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;"
    >
      <h1>Skills Needed</h1>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-small">Math Tutor:</label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            id="input-small"
            size="sm"
            placeholder="5"
            disabled
            style="width:100px"
          />
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-small">English Tutor:</label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            id="input-small"
            size="sm"
            placeholder="5"
            disabled
            style="width:100px"
          />
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
        { _id: '6172cd711ff80470e0fe0dd4', email: 'John@gmail.com', firstName: 'John', lastName: 'John', contactNumber: '+6391857489714', skills: 'Math,English', location: 'Batangas' },
        { _id: '6172cd753b5075450daf5a5c', email: 'Kaarl@gmail.com', firstName: 'Karl', lastName: 'Karl', contactNumber: '+6390857475614', skills: 'Math,English', location: 'Laguna' },
        { _id: '6172cd789f8997dbb37d42ba', email: 'Joshua@gmail.com', firstName: 'Joshua', lastName: 'Joshua', contactNumber: '+6398857489714', skills: 'English', location: 'Batangas' },
        { _id: '6172cd7ca5b93fac5e85f86b', email: 'Christian@gmail.com', firstName: 'Christian', lastName: 'Christian', contactNumber: '+6348857489712', skills: 'Math', location: 'Batangas' },
        { _id: '6172cd7ca5b93fac5e85f86b', email: 'bob@gmail.com', firstName: 'Bobby', lastName: 'Bob', contactNumber: '+6348857489712', skills: 'Math', location: 'Batangas' },
        { _id: '6172cd7ca5b93fac5e85f86b', email: 'bob@gmail.com', firstName: 'test', lastName: 'Bob', contactNumber: '+6348857489712', skills: 'Math', location: 'Batangas' }
      ],
      fields: [
        { key: 'name', label: 'Full Name', sortable: true, class: 'text-center' },
        { key: 'contactNumber', label: 'Contact Number', sortable: true, sortDirection: 'desc' },
        { key: 'email', label: 'Email', sortable: true, class: 'text-center' },
        { key: 'skills', label: 'Skills', sortable: true, class: 'text-center' },
        { key: 'location', label: 'Location', sortable: true, class: 'text-center' }
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
.suggestion {
position: relative;
}
.suggestion:before {
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
