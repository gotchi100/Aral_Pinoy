<template>
  <div>
    <b-container class="py-5">
      <b-row>
        <b-col cols="12">
          <b-card
            class="card"
            style="border-radius: 20px;"
          >
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Events
                  </h1>
                </b-col>
              </b-row>

              <b-row class="my-2">
                <b-col cols="12">
                  <b-container>
                    <b-row
                      class="mb-4"
                      align-v="center"
                    >
                      <b-col cols="4">
                        <b-row align-v="center">
                          <b-col cols="3">
                            <label
                              for="per-page-select"
                              style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                            >
                              Per Page&nbsp;&nbsp;
                            </label>
                          </b-col>

                          <b-col>
                            <select
                              v-model="perPage"
                              class="form-select form-select-sm"
                              aria-label="Default select example"
                            >
                              <option
                                v-for="option in pageOptions"
                                :key="option"
                              >
                                {{ option }}
                              </option>
                            </select>
                          </b-col>
                        </b-row>
                      </b-col>

                      <b-col cols="4">
                        <b-row align-v="center">
                          <b-col cols="3">
                            <label
                              for="filter-eventName"
                              style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                            >
                              Search&nbsp;&nbsp;
                            </label>
                          </b-col>

                          <b-col>
                            <b-form-input
                              id="filter-eventName"
                              v-model="searchFilter"
                              class="form-control"
                              type="search"
                              size="sm"
                              debounce="500"
                            />
                          </b-col>
                        </b-row>
                      </b-col>

                      <b-col cols="4">
                        <b-dropdown
                          class="w-50"
                          size="sm"
                          text="Filter by Status"
                        >
                          <b-dropdown-form style="width: 100%">
                            <div
                              v-for="option in statusOptions"
                              :key="option"
                              class="form-check form-switch"
                            >
                              <label
                                class="form-check-label"
                                :for="`status-checkbox-${option}`"
                              >
                                {{ option }}
                              </label>

                              <input
                                :id="`status-checkbox-${option}`"
                                v-model="statusFilters"
                                class="form-check-input"
                                type="checkbox"
                                :value="option"
                              >
                            </div>
                          </b-dropdown-form>
                        </b-dropdown>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-col>
              </b-row>

              <b-row class="pt-4">
                <b-col cols="12">
                  <b-table
                    ref="eventsTable"
                    :items="getEvents"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :filter="searchFilter"
                    stacked="md"
                    show-empty
                    small
                    primary-key="_id"
                    style="background:white"
                  >
                    <template #cell(name)="row">
                      <b-link :to="`/events/${row.item._id}`">
                        {{ row.value }}
                      </b-link>
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
                  </b-table>
                </b-col>
              </b-row>

              <b-row align-h="end">
                <b-col cols="2">
                  <b-button
                    to="/events/pre-add"
                    pill
                    variant="danger"
                    style="margin-top: 12px; margin-bottom: 12px; display: inline-block; font-size: 16px; width: 145px;"
                  >
                    Create an Event
                  </b-button>
                </b-col>
              </b-row>

              <b-row class="justify-content-md-center">
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
import EventRepository from '../../repositories/events'
import { apiClient } from '../../axios'

const eventRepository = new EventRepository(apiClient)

const EVENT_SORT_FIELDS_MAP = {
  name: 'name',
  date: 'date.start'
}

export default {
  data () {
    return {
      fields: [
        { key: 'name', label: 'Event Name', sortable: true },
        { key: 'date', label: 'Date', sortable: true },
        { key: 'location.name', label: 'Venue' },
        { key: 'status', label: 'Status' }
      ],
      events: [],
      total: 0,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 20],
      searchFilter: '',
      statusFilters: ['UPCOMING'],
      statusOptions: ['UPCOMING', 'ENDED', 'CANCELED']
    }
  },
  computed: {
    ...mapGetters(['token']),
    pageOffset () {
      return (this.currentPage - 1) * this.perPage
    }
  },
  watch: {
    statusFilters (val) {
      if (val.length === 0) {
        return
      }

      this.$refs.eventsTable.refresh()
    }
  },
  created () {
    eventRepository.setAuthorizationHeader(`Bearer ${this.token}`)
  },
  methods: {
    async getEvents (ctx) {
      const {
        sortBy,
        sortDesc,
        filter
      } = ctx

      const limit = this.perPage
      const offset = this.pageOffset
      const sort = {}

      if (sortBy !== undefined && sortBy !== '') {
        sort.field = EVENT_SORT_FIELDS_MAP[sortBy]
        sort.order = sortDesc ? 'desc' : 'asc'
      }

      const { results, total } = await eventRepository.list({
        name: filter,
        status: this.statusFilters
      }, {
        limit,
        offset,
        sort
      })

      this.total = total

      return results
    }
  }
}
</script>
