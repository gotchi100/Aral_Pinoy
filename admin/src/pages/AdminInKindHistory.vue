<template>
<div class="inkindlist">
  <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
  <b-container fluid>
    <!-- User Interface controls -->
    <h1 style="font-family:'Bebas Neue', cursive;">
        In-Kind Transaction History
    </h1>
    <b-tabs pills card>
      <b-tab title="Aral Pinoy Events" active>
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

            <template #cell(status)="row">
              <b-dropdown id="dropdown-1" :text="row.value" class="m-md-2" size="sm" v-if="row.value==='Pending'">
                <b-dropdown-item>Complete</b-dropdown-item>
                <b-dropdown-item>Returned</b-dropdown-item>
              </b-dropdown>
              <span v-else>
                {{row.value}}
              </span>
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
        </b-card-text>
      </b-tab>
      <b-tab title="External Organizations">
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

            <template #cell(status)="row">
              <b-dropdown id="dropdown-1" :text="row.value" class="m-md-2" size="sm" v-if="row.value==='Pending'">
                <b-dropdown-item>Complete</b-dropdown-item>
                <b-dropdown-item>Returned</b-dropdown-item>
              </b-dropdown>
              <span v-else>
                {{row.value}}
              </span>
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
          <b-col></b-col>
          <b-col>
              <b-col class="my-1">
                <b-pagination
                  v-model="currentPage2"
                  :total-rows="totalRows2"
                  :per-page="perPage2"
                  align="fill"
                  size="sm"
                  class="my-0"
                ></b-pagination>
              </b-col>
          </b-col>
          <b-col></b-col>
        </b-row>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-container>
</b-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { date: '9/27/21', item: 'Unicef Shirt Large', qty: 20, qtyh: 20, ctgry: 'Apparel', event: 'Batangas Coastal Cleanup', status: 'Pending' },
        { date: '9/27/21', item: 'Unicef Shirt Medium', qty: 20, qtyh: 20, ctgry: 'Apparel', event: 'Manila Coastal Cleanup', status: 'Outgoing' },
        { date: '9/27/21', item: 'Unicef Shirt Small', qty: 40, qtyh: 40, ctgry: 'Apparel', event: 'Paranaque Costal Cleanup', status: 'Complete' },
        { date: '9/27/21', item: 'Monggol Volume 2 Pencil', qty: 300, qtyh: 30, ctgry: 'School Material', event: 'Rizal Tutoring Community', status: 'Complete' },
        { date: '9/27/21', item: 'Nissin Cup Noodles', qty: 250, qtyh: 25, ctgry: 'Food', event: 'QC Tree Planting', status: 'Void' },
        { date: '9/27/21', item: 'Unicef Shirt Large', qty: 20, qtyh: 20, ctgry: 'Apparel', event: 'Batangas Coastal Cleanup', status: 'Complete' },
        { date: '9/27/21', item: 'Unicef Shirt Medium', qty: 20, qtyh: 20, ctgry: 'Apparel', event: 'Manila Coastal Cleanup', status: 'Outgoing' },
        { date: '9/27/21', item: 'Unicef Shirt Small', qty: 40, qtyh: 40, ctgry: 'Apparel', event: 'Paranaque Costal Cleanup', status: 'Complete' },
        { date: '9/27/21', item: 'Monggol Volume 2 Pencil', qty: 300, qtyh: 30, ctgry: 'School Material', event: 'Rizal Tutoring Community', status: 'Complete' },
        { date: '9/27/21', item: 'Zissin Cup Noodles', qty: 250, qtyh: 25, ctgry: 'Food', event: 'QC Tree Planting', status: 'Void' }
      ],
      fields: [
        { key: 'date', label: 'Date Sent', sortable: true, class: 'text-center' },
        { key: 'item', label: 'Item', sortable: true, class: 'text-center' },
        { key: 'qty', label: 'QTY Donated', sortable: true, class: 'text-center' },
        { key: 'ctgry', label: 'Category', sortable: true, class: 'text-center' },
        { key: 'event', label: 'Event', sortable: true, class: 'text-center' },
        { key: 'status', label: 'Status', sortable: true, class: 'text-center' },
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
        { date: '9/27/21', item: 'Unicef Shirt Large', qty: 20, qtyh: 20, ctgry: 'Apparel', organization: 'Red Cross Philippines', status: 'Pending' },
        { date: '9/27/21', item: 'Unicef Shirt Medium', qty: 20, qtyh: 20, ctgry: 'Apparel', organization: 'PAWS Philippines', status: 'Outgoing' },
        { date: '9/27/21', item: 'Unicef Shirt Small', qty: 40, qtyh: 40, ctgry: 'Apparel', organization: 'PAWS Philippines', status: 'Complete' },
        { date: '9/27/21', item: 'Monggol Volume 2 Pencil', qty: 300, qtyh: 30, ctgry: 'School Material', organization: 'Rizal Foundation Inc.', status: 'Complete' },
        { date: '9/27/21', item: 'Nissin Cup Noodles', qty: 250, qtyh: 25, ctgry: 'Food', organization: 'QC Government', status: 'Void' },
        { date: '9/27/21', item: 'Unicef Shirt Large', qty: 20, qtyh: 20, ctgry: 'Apparel', organization: 'Red Cross Philippines', status: 'Complete' },
        { date: '9/27/21', item: 'Unicef Shirt Medium', qty: 20, qtyh: 20, ctgry: 'Apparel', organization: 'PAWS Philippines', status: 'Outgoing' },
        { date: '9/27/21', item: 'Unicef Shirt Small', qty: 40, qtyh: 40, ctgry: 'Apparel', organization: 'PAWS Philippines', status: 'Complete' },
        { date: '9/27/21', item: 'Monggol Volume 2 Pencil', qty: 300, qtyh: 30, ctgry: 'School Material', organization: 'Rizal Foundation Inc.', status: 'Complete' },
        { date: '9/27/21', item: 'Jissin Cup Noodles', qty: 250, qtyh: 25, ctgry: 'Food', organization: 'QC Government', status: 'Pending' }
      ],
      fields2: [
        { key: 'date', label: 'Date Sent', sortable: true, class: 'text-center' },
        { key: 'item', label: 'Item', sortable: true, class: 'text-center' },
        { key: 'qty', label: 'QTY Donated', sortable: true, class: 'text-center' },
        { key: 'ctgry', label: 'Category', sortable: true, class: 'text-center' },
        { key: 'organization', label: 'Organization', sortable: true, class: 'text-center' },
        { key: 'status', label: 'Status', sortable: true, class: 'text-center' },
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
        id2: 'info-modal2',
        title2: '',
        content2: ''
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
