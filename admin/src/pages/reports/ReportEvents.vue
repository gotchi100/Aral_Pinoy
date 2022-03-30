<template>
  <div>
    <b-container class="py-5">
      <b-row>
        <b-col cols="12">
          <b-card style="border-radius: 20px;">
            <b-container fluid>
              <!-- User Interface controls -->
              <h2 style="font-family:'Bebas Neue', cursive;">
                Completed Events
              </h2>
              <b-row>
                <b-container class="bv-example-row">
                  <b-row>
                    <b-col>
                      <b-col
                        sm="5"
                        md="6"
                        class="my-1"
                      >
                        <b-form-group
                          style="font-size: 15px; font-family:'Bebas Neue', cursive;"
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
                          />
                        </b-form-group>
                      </b-col>
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
                          placeholder="Type to Search for Events"
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
                <template #cell(name)="row">
                  {{ row.value.first }} {{ row.value.last }}
                </template>

                <template #cell(actions)="row">
                  <b-button
                    size="sm"
                    class="mr-1"
                    @click="info(row.item, row.index, $event.target)"
                  >
                    Info modal
                  </b-button>
                  <b-button
                    size="sm"
                    @click="row.toggleDetails"
                  >
                    {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                  </b-button>
                </template>

                <template #row-details="row">
                  <b-card>
                    <ul>
                      <li
                        v-for="(value, key) in row.item"
                        :key="key"
                      >
                        {{ key }}: {{ value }}
                      </li>
                    </ul>
                  </b-card>
                </template>
              </b-table>
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
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' },
        { event: 'Zatangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' },
        { event: 'Batangas Coastal Cleanup', date: '09/27/21', venue: 'Batangas' }
      ],
      fields: [
        { key: 'date', label: 'Date', sortable: true, class: 'text-center' },
        { key: 'event', label: 'Event', sortable: true, class: 'text-center' },
        { key: 'venue', label: 'Venue', sortable: true, class: 'text-center' }
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
