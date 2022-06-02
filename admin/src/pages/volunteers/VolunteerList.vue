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
                      <b-col
                        cols="12"
                        md="4"
                      >
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

                      <b-col
                        cols="12"
                        md="4"
                      >
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

                      <b-col
                        cols="12"
                        md="4"
                      >
                        <b-row align-v="center">
                          <b-col cols="4">
                            <label
                              for="per-page-select"
                              style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                            >
                              Filter by Skills&nbsp;&nbsp;
                            </label>
                          </b-col>

                          <b-col>
                            <b-form-tags>
                              <template>
                                <ul
                                  class="list-inline d-inline-block mb-2"
                                >
                                  <li
                                    v-for="(skill, index) in skillsFilter"
                                    :key="index"
                                    class="list-inline-item"
                                  >
                                    <b-form-tag
                                      class="bg-success"
                                      @remove="removeSkill(index)"
                                    >
                                      {{ skill.name }}
                                    </b-form-tag>
                                  </li>
                                </ul>
                              </template>

                              <b-dropdown
                                text="Add Skill"
                                style="width: 100%"
                                menu-class="w-100"
                                size="sm"
                                variant="primary"
                              >
                                <b-dropdown-form>
                                  <b-form-group
                                    label="Search Skill"
                                    label-for="skill-search"
                                    @submit.stop.prevent
                                  >
                                    <b-form-input
                                      id="skill-search"
                                      debounce="500"
                                      size="sm"
                                      @update="searchSkills"
                                    />
                                  </b-form-group>
                                </b-dropdown-form>
                                <b-dropdown-divider />

                                <b-dropdown-item
                                  v-for="skill in skillOptions"
                                  :key="skill._id"
                                  @click="selectSkill(skill)"
                                >
                                  {{ skill.name }} <span style="color: grey; font-size: 12px">{{ skill.description }}</span>
                                </b-dropdown-item>
                              </b-dropdown>
                            </b-form-tags>
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
                    ref="usersTable"
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

                    <template #cell(skills)="{ value }">
                      <span
                        v-for="skill in value"
                        :key="skill._id"
                        class="badge bg-secondary mx-1"
                      >
                        {{ skill.name }}
                      </span>
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
import SkillRepository from '../../repositories/skills'

const userRepository = new UserRepository(apiClient)
const skillRepository = new SkillRepository(apiClient)

const SORT_MAP = {
  firstName: 'firstName',
  lastName: 'lastName',
  eventsVolunteeredCount: 'eventsVolunteeredCount'
}

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
        { key: 'contactNumber', label: 'Contact Number' },
        { key: 'skills', label: 'Skills' },
        { key: 'eventsVolunteeredCount', label: 'Number of Events Volunteered', sortable: true }
      ],
      skillsFilter: [],
      skillOptions: []
    }
  },
  computed: {
    ...mapGetters(['token']),
    pageOffset () {
      return (this.currentPage - 1) * this.perPage
    }
  },
  created () {
    const authHeader = `Bearer ${this.token}`

    userRepository.setAuthorizationHeader(authHeader)
    skillRepository.setAuthorizationHeader(authHeader)
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
        sort.field = SORT_MAP[sortBy]
        sort.order = sortDesc ? 'desc' : 'asc'
      }

      const skillIds = this.skillsFilter.map((skill) => skill._id)

      const { results, total } = await userRepository.list({
        name: filter,
        roles: ['volunteer'],
        skillIds
      }, {
        limit,
        offset,
        sort,
        countVolunteeredEvents: true
      })

      this.total = total

      return results
    },
    async searchSkills (value) {
      const { results } = await skillRepository.list({
        name: value
      }, {
        limit: 10,
        offset: 0,
        sort: {
          field: 'name',
          order: 'asc'
        }
      })

      this.skillOptions = results
    },
    selectSkill (skill) {
      const skills = this.skillsFilter

      for (const existingSkill of skills) {
        if (existingSkill._id === skill._id) {
          return
        }
      }

      skills.push(skill)

      this.$refs.usersTable.refresh()
    },
    removeSkill (index) {
      const skills = this.skillsFilter

      skills.splice(index, 1)

      this.$refs.usersTable.refresh()
    }
  }
}
</script>
