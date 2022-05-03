<template>
  <b-modal
    v-model="modal"
    size="xl"
    title="Edit Event Jobs"
    hide-footer
    @hide="$emit('close')"
  >
    <b-container>
      <b-row>
        <b-col cols="12">
          <b-container fluid>
            <b-alert
              :show="!!errorMessage"
              variant="danger"
            >
              {{ errorMessage }}
            </b-alert>

            <b-row class="py-3">
              <b-col cols="12">
                <b-row>
                  <b-col cols="12">
                    <b-table
                      :items="eventJobs"
                      :fields="eventJobFields"
                      show-empty
                      responsive
                      striped
                      primary-key="name"
                    >
                      <template #cell(skills)="{ item }">
                        <template v-if="item.skills.length > 0">
                          <b-form-tag
                            v-for="jobSkill in item.skills"
                            :key="jobSkill._id"
                            class="bg-success"
                            disabled
                          >
                            {{ jobSkill.name }}
                          </b-form-tag>
                        </template>
                      </template>

                      <template #cell(action)="{ index }">
                        <b-button
                          variant="danger"
                          @click="removeEventJob(index)"
                        >
                          <b-icon icon="trash" />
                        </b-button>
                      </template>
                    </b-table>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col cols="12">
                    <b-button
                      class="w-100 mb-3"
                      :disabled="showJobForm"
                      @click="showJobForm = true"
                    >
                      Add Role
                    </b-button>

                    <b-collapse v-model="showJobForm">
                      <b-card>
                        <validation-observer
                          v-slot="{ invalid: invalidRole }"
                        >
                          <b-container>
                            <b-row
                              align-h="center"
                              align-v="center"
                            >
                              <b-col cols="12">
                                <b-form-group class="text-start">
                                  <label
                                    class="py-1"
                                    for="input-job-name"
                                    style="font-family: 'Bebas Neue', cursive;"
                                  >
                                    Role Name:
                                  </label>

                                  <validation-provider
                                    v-slot="validationContext"
                                    :rules="{
                                      required: showJobForm === true,
                                      max: 50
                                    }"
                                  >
                                    <b-form-input
                                      id="input-job-name"
                                      v-model="jobForm.name"
                                      placeholder="Ex: Trash Collector"
                                      :state="getValidationState(validationContext)"
                                      aria-describedby="input-job-name-feedback"
                                    />

                                    <b-form-invalid-feedback id="input-job-name-feedback">
                                      {{ validationContext.errors[0] }}
                                    </b-form-invalid-feedback>
                                  </validation-provider>
                                </b-form-group>
                              </b-col>

                              <b-col
                                class="pt-2"
                                cols="12"
                              >
                                <b-form-group class="text-start">
                                  <label
                                    class="py-1"
                                    for="textarea-job-description"
                                    style="font-family: 'Bebas Neue', cursive;"
                                  >
                                    Role Description:
                                  </label>

                                  <validation-provider
                                    v-slot="validationContext"
                                    :rules="{
                                      max: 100
                                    }"
                                  >
                                    <b-form-textarea
                                      id="textarea-job-description"
                                      v-model="jobForm.description"
                                      rows="3"
                                      max-rows="8"
                                      placeholder="Ex: Picks up and remove waste from locations and takes the waste to a designated location for proper disposal"
                                      :state="getValidationState(validationContext)"
                                      aria-describedby="textarea-job-description-feedback"
                                    />

                                    <b-form-invalid-feedback id="textarea-job-description-feedback">
                                      {{ validationContext.errors[0] }}
                                    </b-form-invalid-feedback>
                                  </validation-provider>
                                </b-form-group>
                              </b-col>

                              <b-col
                                class="pt-2"
                                cols="12"
                              >
                                <b-form-group
                                  label="Number of Volunteers Needed"
                                  style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;"
                                >
                                  <b-form-input
                                    v-model="jobForm.requirements.max"
                                    type="number"
                                    step="1"
                                    lazy-formatter
                                    :formatter="toPositiveNumber"
                                    required
                                  />
                                </b-form-group>
                              </b-col>

                              <b-col
                                class="pt-2"
                                cols="12"
                              >
                                <b-form-tags>
                                  <template>
                                    <ul
                                      v-if="jobForm.skills.length > 0"
                                      class="list-inline d-inline-block mb-2"
                                    >
                                      <li
                                        v-for="(jobSkill, index) in jobForm.skills"
                                        :key="index"
                                        class="list-inline-item"
                                      >
                                        <b-form-tag
                                          class="bg-success"
                                          @remove="removeJobSkill(index)"
                                        >
                                          {{ jobSkill.name }}
                                        </b-form-tag>
                                      </li>
                                    </ul>
                                  </template>

                                  <b-dropdown
                                    text="Add Skill"
                                    style="width: 100%"
                                    menu-class="w-100"
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
                                          @update="searchSkills"
                                        />
                                      </b-form-group>
                                    </b-dropdown-form>
                                    <b-dropdown-divider />
                                    <b-dropdown-item
                                      v-for="skill in skillOptions"
                                      :key="skill._id"
                                      @click="selectJobSkill(skill)"
                                    >
                                      {{ skill.name }} <span style="color: grey; font-size: 12px">{{ skill.description }}</span>
                                    </b-dropdown-item>
                                  </b-dropdown>
                                </b-form-tags>
                              </b-col>

                              <b-col
                                cols="12"
                                md="6"
                              >
                                <b-button
                                  class="w-100 mt-3"
                                  @click="showJobForm = false"
                                >
                                  Cancel
                                </b-button>
                              </b-col>

                              <b-col
                                cols="12"
                                md="6"
                              >
                                <b-button
                                  class="w-100 mt-3"
                                  variant="success"
                                  :disabled="invalidRole"
                                  @click="addEventJob"
                                >
                                  Submit
                                </b-button>
                              </b-col>
                            </b-row>
                          </b-container>
                        </validation-observer>
                      </b-card>
                    </b-collapse>
                  </b-col>
                </b-row>

                <b-row
                  class="pt-3"
                  align-h="end"
                >
                  <b-col cols="1">
                    <b-button
                      variant="outline-secondary"
                      @click="resetJobs"
                    >
                      Reset
                    </b-button>
                  </b-col>

                  <b-col cols="1">
                    <b-button
                      variant="outline-success"
                      @click="updateEventJobs"
                    >
                      <b-spinner
                        v-if="isLoading"
                        style="width: 1rem; height: 1rem;"
                      />
                      <template v-else>
                        <b-icon icon="file-earmark-check-fill" />
                      </template>
                    </b-button>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, max } from 'vee-validate/dist/rules'
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'

import validationMixins from '../../mixins/validation'
import formattersMixins from '../../mixins/formatters'
import EventRepository from '../../repositories/events'
import { apiClient } from '../../axios'

const eventRepository = new EventRepository(apiClient)

extend('required', {
  ...required,
  message: 'This field is required'
})
extend('max', {
  ...max,
  message: 'This field must be less than or equal to {length} characters'
})

const ERROR_MAP = {
  400: true,
  404: {
    event: 'Event does not exist!'
  },
  409: {
    non_upcoming_event: 'Canceled or ended events cannot be updated',
    version_conflict: 'Event was recently updated. Please try again'
  }
}

export default {
  name: 'EventJobsUpdateModal',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [validationMixins, formattersMixins],
  props: {
    show: {
      type: Boolean,
      required: true
    },
    eventId: {
      type: String,
      required: true
    },
    currentEventJobs: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      modal: false,
      showJobForm: false,
      eventJobs: [],
      jobForm: {
        name: '',
        description: '',
        requirements: {
          max: 1
        },
        skills: []
      },
      isLoading: false,
      errorMessage: '',
      eventJobFields: [
        { key: 'name', label: 'Title' },
        { key: 'description', label: 'Description' },
        { key: 'slots.current', label: 'Current Number of Volunteers' },
        { key: 'slots.max', label: 'Number of Volunteers Needed' },
        { key: 'skills', label: 'Skills' },
        { key: 'action', label: 'Action' }
      ],
      skillOptions: []
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {
    show (val) {
      this.modal = val
    },
    currentEventJobs (val) {
      if (val !== undefined) {
        this.eventJobs = cloneDeep(val)
      }
    }
  },
  created () {
    eventRepository.setAuthorizationHeader(`Bearer ${this.token}`)

    this.eventJobs = cloneDeep(this.currentEventJobs)
  },
  methods: {
    async updateEventJobs () {
      this.isLoading = true
      this.errorMessage = ''

      const jobs = []

      for (const job of this.eventJobs) {
        const jobToInsert = {
          name: job.name,
          description: job.description,
          requirements: {
            max: job.slots.max
          },
          skillIds: []
        }

        if (job.skills.length > 0) {
          jobToInsert.skillIds = job.skills.map((skill) => {
            if (skill._id !== undefined || skill._id !== null) {
              return skill._id
            }

            return skill.norm
          })
        }

        jobs.push(jobToInsert)
      }

      try {
        await eventRepository.update(this.eventId, {
          jobs
        })

        this.$emit('update', {
          jobs: this.eventJobs
        })

        this.$emit('close')
      } catch (error) {
        const data = error.response?.data

        if (data) {
          const { status, message } = data

          const statusMessageMap = ERROR_MAP[status]

          if (statusMessageMap === undefined) {
            this.errorMessage = 'An internal server error has occurred'

            return
          }

          const errorMessage = statusMessageMap[message]

          if (errorMessage === undefined) {
            this.errorMessage = 'An internal server error has occurred'

            return
          }

          this.errorMessage = errorMessage
        }
      } finally {
        this.isLoading = false
      }
    },
    resetJobs () {
      this.errorMessage = ''

      this.eventJobs = cloneDeep(this.currentEventJobs)
    },
    async searchSkills (value) {
      const queryString = new URLSearchParams()

      queryString.set('limit', 10)

      if (value !== undefined && value !== '') {
        queryString.set('filters.name', value)
      }

      const { data } = await apiClient.get(`/skills?${queryString.toString()}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      this.skillOptions = data.results
    },
    selectJobSkill (skill) {
      const skillIndex = this.jobForm.skills.findIndex((jobSkill) => jobSkill._id === skill._id)

      if (skillIndex !== -1) {
        return
      }

      this.jobForm.skills.push({
        _id: skill._id,
        name: skill.name,
        description: skill.description
      })
    },
    removeJobSkill (index) {
      this.jobForm.skills.splice(index, 1)
    },
    addEventJob () {
      const {
        name,
        description,
        requirements,
        skills = []
      } = this.jobForm

      this.eventJobs.push({
        name,
        description,
        slots: {
          current: 0,
          max: requirements.max
        },
        skills
      })

      this.showJobForm = false

      this.jobForm = {
        name: '',
        description: '',
        requirements: {
          max: 1
        },
        skills: []
      }
    },
    removeEventJob (index) {
      const eventJob = this.eventJobs[index]

      if (eventJob === undefined) {
        return
      }

      if (eventJob.slots.current > 0) {
        this.errorMessage = 'Unable to remove role: Currently has a volunteer'

        return
      }

      this.eventJobs.splice(index, 1)
    }
  }
}
</script>
