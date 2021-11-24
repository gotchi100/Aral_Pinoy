<template>
<div class="categorylist">
  <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
  <b-container fluid>
    <!-- User Interface controls -->
    <h1 style="font-family:'Bebas Neue', cursive;">
        Categories
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
      <!-- <template #cell(email)="row">
        <b-link :to="`/officers/${row.item._id}`">{{ row.value }}</b-link>
      </template>

      <template #cell(name)="row">
        {{ row.item.firstName }} {{ row.item.lastName }}
      </template> -->
      <template #cell(actions)="row">
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          Delete
        </b-button>
        <!-- <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button> -->
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
    <b-col cols="9"></b-col>
    <b-col>
      <b-button @click="showModal = !showModal" pill variant="danger" style="margin-top: 12px; margin-bottom: 12px; display: inline-block; font-size: 16px; width: 200px;">
        Add a Category Entry
      </b-button>
    </b-col>
  </b-row>
  <b-row class="justify-content-md-center">
    <b-col cols="6" class="my-1">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="fill"
      ></b-pagination>
    </b-col>
  </b-row>
  <b-modal v-model="showModal" size="xl" hide-footer>
    <div>
      <div class="addskill">
        <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1100px; border-radius: 20px; margin-top: 40px;">
          <b-container fluid>
              <h1 style="font-family:'Bebas Neue', cursive;" no-body class="text-center">
                  Add a Category Entry
              </h1>
            <b-row class="my-1">
              <label class="skill" for="input-small">Category Name</label>
              <b-col>
                <b-form-input v-model="skill"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col>
                  <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="accepted" unchecked-value="not_accepted">
                      &nbsp; Requires Best Before Date?
                  </b-form-checkbox>
              </b-col>
              <b-col>
                  <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="accepted" unchecked-value="not_accepted">
                      &nbsp; Requires Expiration Date?
                  </b-form-checkbox>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="5"></b-col>
              <b-col>
                <b-button @click="showModaltwo = !showModaltwo" pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 150px;">
                  Add Category
                </b-button>
              </b-col>
            </b-row>
          </b-container>
          <b-modal v-model="showModaltwo" size="xl">
            <b-container fluid>
                  <h1 style="font-family:'Bebas Neue', cursive; text-align:center;">
                      Are you sure with all the details?
                  </h1>
                  <!-- <b-row>
                    <b-col cols="5"></b-col>
                    <b-col>
                      <b-button type="submit" variant="success">Yes</b-button>
                      &nbsp;
                      <b-button type="reset" variant="danger">No</b-button>
                    </b-col>
                  </b-row> -->
              </b-container>
          </b-modal>
        </b-card>
      </div>
    </div>
  </b-modal>
  </b-container>
</b-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { _id: '6172cd711ff80470e0fe0dd4', category: 'Food', bestbefore: 'Yes', expiration: 'Yes' },
        { _id: '6172cd753b5075450daf5a5c', category: 'School Supply', bestbefore: 'No', expiration: 'No' },
        { _id: '6172cd789f8997dbb37d42ba', category: 'Apparel', bestbefore: 'No', expiration: 'No' },
        { _id: '6172cd7ca5b93fac5e85f86b', category: 'Material', bestbefore: 'No', expiration: 'No' }
      ],
      fields: [
        { key: 'category', label: 'Category', sortable: true, class: 'text-center' },
        { key: 'bestbefore', label: 'Requires Best Before Date?', sortable: true, class: 'text-center' },
        { key: 'expiration', label: 'Requires Expiration Date?', sortable: true, class: 'text-center' },
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
      skill: '',
      description: '',
      showModal: false,
      showModaltwo: false
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

<style scoped>
.categorylist {
position: relative;
}
.categorylist:before {
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
