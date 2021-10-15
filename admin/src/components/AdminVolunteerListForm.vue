<template>
  <b-container fluid style="background:green">
    <!-- User Interface controls -->
    <h1 style="color:white">
        Volunteer List
    </h1>
    <b-row>
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <b-col sm="5" md="6" class="my-1">
              <b-form-group
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
              <p style="color:white; font-size: 20px" >Search &nbsp; &nbsp; </p>
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
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
      <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
        <pre>{{ infoModal.content }}</pre>
      </b-modal>
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
</template>

<script>
export default {
  data () {
    return {
      items: [
        { email: 'Macdonald@gmail.com', name: { first: 'Dickerson', last: 'Macdonald' }, number: 90857489714 },
        { email: 'Shaw@gmail.com', name: { first: 'Larsen', last: 'Shaw' }, number: 90857475714 },
        {
          email: 'Navarro@gmail.com',
          name: { first: 'Mini', last: 'Navarro' },
          number: 98857489714,
          _rowVariant: 'success'
        },
        { email: 'Wilson@gmail.com', name: { first: 'Geneva', last: 'Wilson' } },
        { email: 'Carney@gmail.com', name: { first: 'Jami', last: 'Carney' } },
        { email: 'Dunlap@gmail.com', name: { first: 'Essie', last: 'Dunlap' } },
        { email: 'Macdonald@gmail.com', name: { first: 'Thor', last: 'Macdonald' } },
        {
          email: 'Shaw@gmail.com',
          name: { first: 'Larsen', last: 'Shaw' },
          _cellVariants: { email: 'danger', isActive: 'warning' }
        },
        { email: 'Navarro@gmail.com', name: { first: 'Mitzi', last: 'Navarro' } },
        { email: 'Wilson@gmail.com', name: { first: 'Genevieve', last: 'Wilson' } },
        { email: 'Carney@gmail.com', name: { first: 'John', last: 'Carney' } },
        { email: 'Dunlap@gmail.com', name: { first: 'Dick', last: 'Dunlap' } }
      ],
      fields: [
        { key: 'name', label: 'Full Name', sortable: true, sortDirection: 'desc' },
        { key: 'email', label: 'Email', sortable: true, class: 'text-center' },
        { key: 'number', label: 'Contact Number', sortable: true, class: 'text-center' },
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
        { key: 'actions', label: 'Actions' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: 'Show a lot' }],
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
    resetInfoModal () {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
