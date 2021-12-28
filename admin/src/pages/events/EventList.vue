<template>
  <div>
    <b-container class="py-5">
      <b-row>
        <b-col cols="12">
          <b-card class="card" style="border-radius: 20px;">
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Events
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
                      <!-- TODO: Search by email or full name -->
                      <!-- <b-col cols="4">
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

              <!-- Main table element -->
              <b-row class="pt-4">
                <b-col cols="12">
                  <b-table
                    :items="getEvents"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    stacked="md"
                    show-empty
                    small
                    primary-key="_id"
                    style="background:white"
                  >
                    <template #cell(name)="row">
                      <b-link :to="`/events/${row.item._id}`">{{ row.value }}</b-link>
                    </template>

                    <template #cell(date)="row">
                      {{
                        new Date(row.item.date.start).toLocaleString('en-us', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })
                      }}
                      -
                      {{
                        new Date(row.item.date.end).toLocaleString('en-us', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })
                      }}
                    </template>

                    <template #cell(status)="row">
                      {{ row.value || '-' }}
                    </template>
                  </b-table>
                </b-col>
              </b-row>

              <b-row align-h="end">
                <b-col cols="2">
                  <b-button to="/events/add" pill variant="danger" style="margin-top: 12px; margin-bottom: 12px; display: inline-block; font-size: 16px; width: 145px;">
                    Create an Event
                  </b-button>
                </b-col>
              </b-row>

              <b-row class="justify-content-md-center">
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
      fields: [
        { key: 'name', label: 'Event Name', class: 'text-center' },
        { key: 'date', label: 'Date', class: 'text-center' },
        { key: 'location.name', label: 'Venue', class: 'text-center' },
        { key: 'status', label: 'Status', class: 'text-center' }
      ],
      events: [],
      total: 0,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 20]
    }
  },
  computed: {
    ...mapGetters(['token']),
    pageOffset () {
      return (this.currentPage - 1) * this.perPage
    }
  },
  methods: {
    async getEvents (ctx) {
      const queryString = new URLSearchParams()

      queryString.set('limit', this.perPage)
      queryString.set('offset', this.pageOffset)

      const { data } = await apiClient.get(`/events?${queryString.toString()}`, {
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
