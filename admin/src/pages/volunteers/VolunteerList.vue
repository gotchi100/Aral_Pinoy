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
                    Volunteers
                  </h1>
                </b-col>
              </b-row>

              <b-row class="my-2">
                <b-col cols="12">
                  <b-container>
                    <b-row
                      class="mb-4"
                      align-v="center"
                      align-h="around"
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
                    </b-row>
                  </b-container>
                </b-col>
              </b-row>

              <b-row class="pt-4">
                <b-col cols="12">
                  <b-table
                    :items="getUsers"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :filter="searchFilter"
                    stacked="md"
                    style="background:white"
                    show-empty
                    small
                    primary-key="_id"
                  >
                    <template #cell(email)="row">
                      <b-link :to="`/volunteers/${row.item._id}`">
                        {{ row.value }}
                      </b-link>
                    </template>

                    <template #cell(name)="row">
                      {{ row.item.firstName }} {{ row.item.lastName }}
                    </template>
                  </b-table>
                </b-col>
              </b-row>

              <b-row class="pt-4">
                <b-col cols="12">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="total"
                    :per-page="perPage"
                    align="center"
                  />
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
import { mapGetters } from 'vuex'
import { apiClient } from '../../axios'
import UserRepository from '../../repositories/users'

const userRepository = new UserRepository(apiClient)

export default {
  name: 'VolunteerList',
  data () {
    return {
      users: [],
      total: 0,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 20],
      searchFilter: '',
      fields: [
        { key: 'email', label: 'Email' },
        { key: 'lastName', label: 'Last Name', sortable: true },
        { key: 'firstName', label: 'First Name', sortable: true },
        { key: 'contactNumber', label: 'Contact Number' }
      ]
    }
  },
  computed: {
    ...mapGetters(['token']),
    pageOffset () {
      return (this.currentPage - 1) * this.perPage
    }
  },
  created () {
    userRepository.setAuthorizationHeader(`Bearer ${this.token}`)
  },
  methods: {
    async getUsers (ctx) {
      const {
        filter,
        sortBy,
        sortDesc
      } = ctx

      const limit = this.perPage
      const offset = this.pageOffset
      const sort = {}

      if (sortBy !== undefined && sortBy !== '') {
        sort.field = sortBy
        sort.order = sortDesc ? 'desc' : 'asc'
      }

      const { results, total } = await userRepository.list({
        name: filter,
        roles: ['volunteer']
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
