<template>
  <div class="inkindlist">
    <b-card style="display: inline-block; width: 1300px; border-radius: 20px; margin-top:40px;">
      <b-container fluid>
        <b-row>
          <b-col cols="12">
            <h1 style="font-family:'Bebas Neue', cursive;">
              In-Kind Inventory Adjustments
            </h1>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <b-container>
              <b-row>
                <b-col cols="4">
                  <b-form-group
                    style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                    label="Per page"
                    label-for="per-page-select"
                    content-cols="12"
                  >
                    <b-form-select
                      id="per-page-select"
                      class="w-25"
                      v-model="perPage"
                      :options="pageOptions"
                    ></b-form-select>
                  </b-form-group>
                </b-col>

                <!-- TODO: Implement search for inkind donation transactions -->
                <!-- <b-col>
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
                </b-col> -->
              </b-row>
            </b-container>
          </b-col>
        </b-row>

        <b-row class="pt-4">
          <b-col cols="12">
            <b-table
              :items="getTransactions"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              stacked="md"
              style="background:white"
              show-empty
              small
              primary-key="_id"
            >
              <template #cell(date)="row">
                {{
                  new Date(row.value).toLocaleString('en-us', {
                    dateStyle: 'medium'
                  })
                }}
              </template>
            </b-table>
          </b-col>
        </b-row>

        <b-row class="pt-4 justify-content-md-center">
            <b-col cols="6" class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="total"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
            </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const axios = require('axios').default

export default {
  data () {
    return {
      pageOptions: [5, 10, 20],
      fields: [
        { key: 'date', label: 'Date' },
        { key: 'item.sku', label: 'SKU' },
        { key: 'item.name', label: 'Item' },
        { key: 'item.category.name', label: 'Category' },
        { key: 'quantity', label: 'Quantity' }
      ],
      total: 0,
      currentPage: 1,
      perPage: 5
    }
  },
  computed: {
    ...mapGetters(['token']),
    pageOffset () {
      return (this.currentPage - 1) * this.perPage
    }
  },
  methods: {
    async getTransactions (ctx) {
      const queryString = new URLSearchParams()

      queryString.set('limit', this.perPage)
      queryString.set('offset', this.pageOffset)

      const { data } = await axios.get(`http://localhost:3000/inkind-donation-transactions?${queryString.toString()}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      const { results, total } = data

      this.total = total

      return results
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
