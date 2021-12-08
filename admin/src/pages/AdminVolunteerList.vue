<template>
  <div class="volunteerlist">
    <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
      <b-container fluid>
        <b-row>
          <b-col cols="12">
            <h1 style="font-family:'Bebas Neue', cursive;">
              Volunteers
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

        <b-row class="pt-4">
          <b-col cols="12">
            <b-table
              :items="getUsers"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              stacked="md"
              style="background:white"
              show-empty
              small
              primary-key="_id"
            >
              <template #cell(email)="row">
                <b-link :to="`/view-volunteer-profile/${row.item._id}`">{{ row.value }}</b-link>
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
            ></b-pagination>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const axios = require('axios').default

export default {
  name: 'VolunteerList',
  data () {
    return {
      users: [],
      total: 0,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 20],
      fields: [
        { key: 'email', label: 'Email', class: 'text-center' },
        { key: 'name', label: 'Full Name', sortDirection: 'desc' },
        { key: 'contactNumber', label: 'Contact Number', class: 'text-center' }
      ]
    }
  },
  computed: {
    ...mapGetters(['token']),
    pageOffset () {
      return (this.currentPage - 1) * this.perPage
    }
  },
  methods: {
    async getUsers (ctx) {
      const queryString = new URLSearchParams()

      queryString.set('limit', this.perPage)
      queryString.set('offset', this.pageOffset)

      const { data } = await axios.get(`http://localhost:3000/users?filters.roles[]=volunteer&${queryString.toString()}`, {
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
.volunteerlist {
  position: relative;
}
.volunteerlist:before {
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
