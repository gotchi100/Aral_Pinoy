<template>
<div class="inkindlist">
  <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1400px; border-radius: 20px; margin-top:40px;">
  <b-container fluid>
    <!-- User Interface controls -->
    <h1 style="font-family:'Bebas Neue', cursive;">
      In-Kind Donations Inventory
    </h1>
    <b-link to="/incoming-history">Incoming History</b-link>
    <b-tabs pills card>
      <b-tab title="Compiled View" active>
        <b-card-text>
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

            <template #row-details="row">
              <b-card>
                <ul>
                  <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                </ul>
              </b-card>
            </template>
          </b-table>
          <b-row>
            <b-col cols="8"></b-col>
            <b-col>
              <b-button @click="showModal = !showModal" pill variant="danger" style="margin-top: 12px; margin-bottom: 12px; display: inline-block; font-size: 16px; width: 180px;">
                Add a Donation
              </b-button>
            </b-col>
            <b-col>
              <b-button to="/category-list" pill variant="danger" style="margin-top: 12px; margin-bottom: 12px; display: inline-block; font-size: 16px; width: 180px;">
                View Categories
              </b-button>
            </b-col>
          </b-row>
          <b-row class="justify-content-md-center">
            <b-col cols="6" class="my-1">
              <b-pagination
                v-model="currentPage2"
                :total-rows="totalRows2"
                :per-page="perPage2"
                align="fill"
              ></b-pagination>
            </b-col>
          </b-row>
        </b-card-text>
      </b-tab>
      <b-tab title="Detailed View">
        <b-card-text>
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
                        v-model="perPage2"
                        :options="pageOptions2"
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
                      v-model="filter2"
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
            :items="items2"
            :fields="fields2"
            :current-page="currentPage2"
            :per-page="perPage2"
            :filter="filter2"
            :filter-included-fields="filterOn2"
            :sort-by.sync="sortBy2"
            :sort-desc.sync="sortDesc2"
            :sort-direction="sortDirection2"
            stacked="md"
            show-empty
            small
            @filtered="onFiltered2"
            style="background:white"
          >
            <template #cell(name)="row">
              {{ row.value.first }} {{ row.value.last }}
            </template>

            <template #row-details="row">
              <b-card>
                <ul>
                  <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                </ul>
              </b-card>
            </template>
          </b-table>
          <b-row>
            <b-col cols="8"></b-col>
            <b-col>
              <b-button @click="showModal = !showModal" pill variant="danger" style="margin-top: 12px; margin-bottom: 12px; display: inline-block; font-size: 16px; width: 180px;">
                Add a Donation
              </b-button>
            </b-col>
            <b-col>
              <b-button to="/category-list" pill variant="danger" style="margin-top: 12px; margin-bottom: 12px; display: inline-block; font-size: 16px; width: 180px;">
                View Categories
              </b-button>
            </b-col>
          </b-row>
          <b-row class="justify-content-md-center">
            <b-col cols="6" class="my-1">
              <b-pagination
                v-model="currentPage2"
                :total-rows="totalRows2"
                :per-page="perPage2"
                align="fill"
              ></b-pagination>
            </b-col>
          </b-row>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-container>
  <b-modal v-model="showModal" size="xl" hide-footer>
    <div>
      <div class="addskill">
        <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1100px; border-radius: 20px; margin-top: 40px;">
          <b-container fluid>
              <h1 style="font-family:'Bebas Neue', cursive;" no-body class="text-center">
                  Add an in-kind donation
              </h1>
            <b-row class="my-1">
              <label class="skill" for="input-small">Item Name:</label>
              <b-col>
                <b-form-input v-model="skill"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
                <b-col>
                    <label class="skill" for="input-small">Quantity:</label>
                      <b-col>
                          <b-form-input type="number" placeholder="Enter the quantity based on the unit of measurement" required></b-form-input>
                      </b-col>
                </b-col>
                <b-col>
                    <label class="skill" for="input-small">Unit of Measurement:</label>
                      <b-col>
                          <b-form-select v-model="selected" :options="optionz"></b-form-select>
                      </b-col>
                </b-col>
            </b-row>
            <b-row class="my-1">
                <b-form-group label="Category:" style="text-align:left; margin-top:10px; margin-bottom:10px;">
                  <b-form-tags id="tags-with-dropdown" v-model="value" no-outer-focus class="mb-2" style="text-align:center;">
                    <template v-slot="{ tags, disabled, addTag, removeTag }" style="display: inline-block; height: 100%; overflow: auto;">
                      <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                        <li v-for="tag in tags" :key="tag" class="list-inline-item">
                          <b-form-tag
                            @remove="removeTag(tag)"
                            :title="tag"
                            :disabled="disabled"
                            variant="info"
                          >{{ tag }}</b-form-tag>
                        </li>
                      </ul>

                      <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100">
                        <template #button-content>
                          <b-icon icon="tag-fill"></b-icon> Category list
                        </template>
                        <b-dropdown-form @submit.stop.prevent="() => {}">
                          <b-form-group
                            label="Search Categories (ADD A 'ADD/VIEW A CATEGORY ENTRY' BUTTON HERE)"
                            label-for="tag-search-input"
                            label-cols-md="auto"
                            class="mb-0"
                            label-size="sm"
                            :description="searchDesc"
                            :disabled="disabled"
                          >
                            <b-form-input
                              v-model="search"
                              id="tag-search-input"
                              type="search"
                              size="sm"
                              autocomplete="off"
                              ></b-form-input>
                          </b-form-group>
                        </b-dropdown-form>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item-button
                          v-for="options in availableOptions"
                          :key="options"
                          @click="onOptionClick({ options, addTag })"
                        >
                          {{ options }}
                        </b-dropdown-item-button>
                        <b-dropdown-text v-if="availableOptions.length === 0">
                          There are no tags available to select
                        </b-dropdown-text>
                      </b-dropdown>
                    </template>
                  </b-form-tags>
                </b-form-group>
            </b-row>
            <b-row class="my-1">
              <b-col>
                  <label class="skill" for="input-small">Best Before Date:</label>
                  <b-form-datepicker id="start-datepicker" class="mb-2" required></b-form-datepicker>
              </b-col>
              <b-col>
                  <label class="skill" for="input-small">Expiration Date:</label>
                  <b-form-datepicker id="start-datepicker" class="mb-2" required></b-form-datepicker>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <label class="skill" for="input-small">Date Recieved:</label>
              <b-col>
                <b-form-datepicker id="start-datepicker" class="mb-2" required></b-form-datepicker>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <label class="skill" for="input-small">Donor:</label>
              <b-col>
                <b-form-input v-model="donor"></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="5"></b-col>
              <b-col>
                <b-button @click="showModaltwo = !showModaltwo" pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 150px;">
                  Add Donation
                </b-button>
              </b-col>
            </b-row>
          </b-container>
          <b-modal v-model="showModaltwo" size="xl">
            <b-container fluid>
                  <h1 style="font-family:'Bebas Neue', cursive; text-align:center;">
                      Are you sure with all the details?
                  </h1>
              </b-container>
          </b-modal>
        </b-card>
      </div>
    </div>
  </b-modal>
</b-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { item: 'Unicef Shirt', qty: 80, ctgry: 'Apparel' },
        { item: 'Monggol Pencil', qty: 300, ctgry: 'School Material' },
        { item: 'Nissin Cup Noodles', qty: 250, ctgry: 'Food' },
        { item: 'FUnicef Shirt', qty: 80, ctgry: 'Apparel' },
        { item: 'Bonggol Volume 2 Pencil', qty: 300, ctgry: 'School Material' },
        { item: 'Zissin Cup Noodles', qty: 250, ctgry: 'Food' },
        { item: 'Bnicef Shirt Large', qty: 20, ctgry: 'Apparel' },
        { item: 'Bnicef Shirt Medium', qty: 20, ctgry: 'Apparel' },
        { item: 'Bnicef Shirt Small', qty: 40, ctgry: 'Apparel' },
        { item: 'Nonggol Volume 2 Pencil', qty: 300, ctgry: 'School Material' },
        { item: 'Missin Cup Noodles', qty: 250, ctgry: 'Food' },
        { item: 'Ynicef Shirt Large', qty: 20, ctgry: 'Apparel' },
        { item: 'Ynicef Shirt Medium', qty: 20, ctgry: 'Apparel' },
        { item: 'Ynicef Shirt Small', qty: 40, ctgry: 'Apparel' },
        { item: 'Yonggol Volume 2 Pencil', qty: 300, ctgry: 'School Material' },
        { item: 'Pissin Cup Noodles', qty: 250, ctgry: 'Food' }
      ],
      fields: [
        { key: 'item', label: 'Item', sortable: true, class: 'text-center' },
        { key: 'qty', label: 'Quantity', sortable: true, class: 'text-center' },
        { key: 'ctgry', label: 'Category', sortable: true, class: 'text-center' },
        { key: 'actions', label: ' ' }
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
      },
      items2: [
        { date: '9/27/21', item: 'Unicef Shirt', description: 'Large', donor: 'Unicef Philippines', qty: 20, ctgry: 'Apparel', bestbefore: 'N/A', expiration: 'N/A' },
        { date: '9/27/21', item: 'Unicef Shirt', description: 'Medium', donor: 'Unicef Philippines', qty: 20, ctgry: 'Apparel', bestbefore: 'N/A', expiration: 'N/A' },
        { date: '9/27/21', item: 'Unicef Shirt', description: 'Small', donor: 'Unicef Philippines', qty: 40, ctgry: 'Apparel', bestbefore: 'N/A', expiration: 'N/A' },
        { date: '9/27/21', item: 'Monggol Pencil', description: 'Volume 2 ', donor: 'Monggol Philippines Inc.', qty: 300, ctgry: 'School Material', bestbefore: 'N/A', expiration: 'N/A' },
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
      fields2: [
        { key: 'item', label: 'Item', sortable: true, class: 'text-center' },
        { key: 'description', label: 'Description', sortable: true, class: 'text-center' },
        { key: 'donor', label: 'Donor', sortable: true, class: 'text-center' },
        { key: 'qty', label: 'Quantity', sortable: true, class: 'text-center' },
        { key: 'ctgry', label: 'Category', sortable: true, class: 'text-center' },
        { key: 'bestbefore', label: 'Best Before', sortable: true, class: 'text-center' },
        { key: 'expiration', label: 'Expiration Date', sortable: true, class: 'text-center' },
        { key: 'actions', label: ' ' }
      ],
      totalRows2: 1,
      currentPage2: 1,
      perPage2: 5,
      pageOptions2: [5, 10, { value: 100, text: 'Show a lot' }],
      sortBy2: '',
      sortDesc2: false,
      sortDirection2: 'asc',
      filter2: null,
      filterOn2: [],
      infoModal2: {
        id2: 'info-modal',
        title2: '',
        content2: ''
      },
      showModal: false,
      showModaltwo: false,
      selected: null,
      optionz: [
        { value: null, text: 'Please select the unit of measurement' },
        { value: 'a', text: 'gal' },
        { value: 'b', text: 'lb' },
        { value: 'c', text: 'ft' },
        { value: 'd', text: 'box' },
        { value: 'e', text: 'pc' },
        { value: 'f', text: 'pack' }
      ],
      options: ['Food', 'Apparel', 'School Supply', 'Material'],
      search: '',
      value: []
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
    },
    criteria () {
      // Compute the search criteria
      return this.search.trim().toLowerCase()
    },
    availableOptions () {
      const criteria = this.criteria
      // Filter out already selected options
      const options = this.options.filter(opt => this.value.indexOf(opt) === -1)
      if (criteria) {
        // Show only options that match criteria
        return options.filter(opt => opt.toLowerCase().indexOf(criteria) > -1)
      }
      // Show all options available
      return options
    },
    searchDesc () {
      if (this.criteria && this.availableOptions.length === 0) {
        return 'There are no tags matching your search criteria'
      }
      return ''
    }
  },
  mounted () {
    // Set the initial number of items
    this.totalRows = this.items.length
    this.totalRows2 = this.items.length
  },
  methods: {
    info (item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    info2 (item, index, button) {
      this.infoModal2.title2 = `Row index: ${index}`
      this.infoModal2.content2 = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal2.id2, button)
    },
    resetInfoModal () {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    resetInfoModal2 () {
      this.infoModal2.title2 = ''
      this.infoModal2.content2 = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    onFiltered2 (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows2 = filteredItems.length
      this.currentPage2 = 1
    },
    onOptionClick ({ options, addTag }) {
      addTag(options)
      this.search = ''
    }
  }
}
</script>

<style scoped>
.inkindlist {
position: relative;
}
.inkindlist:before {
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
