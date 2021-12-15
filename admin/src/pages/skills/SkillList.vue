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
                    Skills
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
                    :items="getSkills"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    stacked="md"
                    style="background:white"
                    show-empty
                    small
                    primary-key="_id"
                  ></b-table>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="9"></b-col>
                <b-col>
                  <b-button @click="showModal = !showModal" pill variant="danger" style="margin-top: 12px; margin-bottom: 12px; display: inline-block; font-size: 16px; width: 150px;">
                      Add a Skill
                  </b-button>
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
            <b-modal v-model="showModal" size="xl" hide-footer>
              <div>
                <div class="addskill">
                  <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1100px; border-radius: 20px; margin-top: 40px;">
                    <b-container fluid>
                      <h1 style="font-family:'Bebas Neue', cursive;" no-body class="text-center">
                        Add a Skill
                      </h1>

                      <b-alert :show="!!errorMessage" variant="danger">
                        {{ errorMessage }}
                      </b-alert>

                      <b-row class="my-1">
                        <label class="skill" for="input-small">Skill Label</label>
                        <b-col>
                          <b-form-input v-model="name"></b-form-input>
                        </b-col>
                      </b-row>

                      <b-row class="my-1">
                        <label class="description" for="input-small">Skill Description</label>
                        <b-col>
                          <b-form-input v-model="description"></b-form-input>
                        </b-col>
                      </b-row>

                      <b-button
                        pill
                        variant="danger"
                        style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;"
                        :disabled="isAdding"
                        @click="addSkill"
                      >
                        <b-spinner v-if="isAdding"></b-spinner>
                        <span v-else>Add Skill</span>
                      </b-button>
                    </b-container>
                  </b-card>
                </div>
              </div>
            </b-modal>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const axios = require('axios').default

export default {
  name: 'SkillList',
  data () {
    return {
      skills: [],
      total: 0,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 20],
      fields: [
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' }
      ],
      showModal: false,
      name: '',
      description: '',
      isAdding: false,
      errorMessage: ''
    }
  },
  computed: {
    ...mapGetters(['token']),
    pageOffset () {
      return (this.currentPage - 1) * this.perPage
    }
  },
  methods: {
    async getSkills (ctx) {
      const queryString = new URLSearchParams()

      queryString.set('limit', this.perPage)
      queryString.set('offset', this.pageOffset)

      const { data } = await axios.get(`http://localhost:3000/skills?${queryString.toString()}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      const { results, total } = data

      this.total = total

      return results
    },
    async addSkill () {
      this.errorMessage = ''

      this.isAdding = true

      try {
        await axios.post('http://localhost:3000/skills', {
          name: this.name,
          description: this.description
        }, {
          headers: {
            authorization: `Bearer ${this.token}`
          }
        })

        this.$router.go()
      } catch (error) {
        if (error.response?.data?.code === 'SkillAlreadyExists') {
          this.errorMessage = 'This skill already exists!'
        }
      } finally {
        this.isAdding = false
      }
    }
  }
}
</script>
