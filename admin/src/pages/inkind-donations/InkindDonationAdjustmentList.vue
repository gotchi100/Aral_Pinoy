<template>
  <div>
    <b-container class="py-5">
      <b-row>
        <b-col cols="12">
          <b-card style="border-radius: 20px;">
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
                            v-model="perPage"
                            class="w-25"
                            :options="pageOptions"
                          />
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

                    <template #cell(sumQuantity)="{ item }">
                      {{ item.item.quantity + item.quantity }}
                    </template>

                    <template #cell(receipt)="{ item }">
                      <a
                        v-if="!!item.receiptImageUrl"
                        :href="item.receiptImageUrl"
                        target="_blank"
                      >
                        See Image
                      </a>
                    </template>
                  </b-table>
                </b-col>
              </b-row>

              <b-row class="pt-4 justify-content-md-center">
                <b-col
                  cols="6"
                  class="my-1"
                >
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="total"
                    :per-page="perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                  />
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const { apiClient } = require('../../axios')

export default {
  data () {
    return {
      pageOptions: [5, 10, 20],
      fields: [
        { key: 'date', label: 'Date' },
        { key: 'item.sku', label: 'SKU' },
        { key: 'item.name', label: 'Item' },
        { key: 'item.category.name', label: 'Category' },
        { key: 'reason', label: 'Reason' },
        { key: 'item.quantity', label: 'Previous Quantity' },
        { key: 'quantity', label: 'Adjustment' },
        { key: 'sumQuantity', label: 'New Quantity' },
        { key: 'receipt', label: 'Receipt' }
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
      queryString.set('sort.field', 'date')
      queryString.set('sort.order', 'desc')

      const { data } = await apiClient.get(`/inkind-donation-transactions?${queryString.toString()}`, {
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
