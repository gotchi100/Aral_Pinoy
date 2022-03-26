<template>
  <div>
    <b-container class="py-5">
      <b-row>
        <b-col cols="12">
          <b-card style="border-radius: 20px;">
            <validation-observer ref="mainObs" v-slot="{ invalid }">
              <b-container>
                <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; text-align: center;">
                  Create Event Template
                </h2>

                <b-form>
                  <b-row class="pt-4">
                    <b-col cols="12">
                      <b-card style="border-radius: 20px;">
                        <b-row>
                          <b-form-group class="text-start">
                            <label
                              class="py-1"
                              for="input-event-name"
                              style="font-family: 'Bebas Neue', cursive;"
                            >
                              Event Template Name:
                            </label>

                            <validation-provider
                              :rules="{
                                required: true,
                                max: 100
                              }"
                              v-slot="validationContext"
                            >
                              <b-form-input
                                id="input-event-name"
                                :state="getValidationState(validationContext)"
                                v-model="event.name"
                                placeholder="Enter Event Name"
                                aria-describedby="input-event-name-feedback"
                              />

                              <b-form-invalid-feedback id="input-event-name-feedback">
                                {{ validationContext.errors[0] }}
                              </b-form-invalid-feedback>
                            </validation-provider>
                          </b-form-group>
                        </b-row>

                        <b-row>
                          <b-col cols="12">
                            <b-form-group class="pt-2 text-start">
                              <label
                                class="py-1 text-start"
                                for="input-event-location-name"
                                style="font-family: 'Bebas Neue', cursive;"
                              >
                                Location:
                              </label>

                              <validation-provider
                                :rules="{
                                  max: 500
                                }"
                                v-slot="validationContext"
                              >
                                <b-form-input
                                  id="input-event-location-name"
                                :state="getValidationState(validationContext)"
                                  v-model="event.location.name"
                                  placeholder="Enter Location of the Event"
                                aria-describedby="input-event-location-name-feedback"
                                />

                                <b-form-invalid-feedback id="input-event-location-name-feedback">
                                {{ validationContext.errors[0] }}
                              </b-form-invalid-feedback>
                              </validation-provider>
                            </b-form-group>
                          </b-col>
                        </b-row>
                      </b-card>
                    </b-col>
                  </b-row>

                  <b-row class="pt-4">
                    <b-col cols="12">
                      <b-card style="border-radius: 20px;">
                        <b-form-group class="text-start">
                          <label
                            class="py-1"
                            for="textarea-event-description"
                            style="font-family:'Bebas Neue', cursive;"
                          >
                            Event Template Description:
                          </label>

                          <validation-provider
                              :rules="{
                                max: 5000
                              }"
                              v-slot="validationContext"
                            >
                              <b-form-textarea
                                id="textarea-event-description"
                                rows="3"
                                max-rows="8"
                                v-model="event.description"
                                :state="getValidationState(validationContext)"
                                aria-describedby="textarea-event-description-feedback"
                                placeholder="Enter event description and other important details"
                              />

                              <b-form-invalid-feedback id="textarea-event-description-feedback">
                                {{ validationContext.errors[0] }}
                              </b-form-invalid-feedback>
                          </validation-provider>
                        </b-form-group>
                      </b-card>
                    </b-col>
                  </b-row>

                  <b-row class="pt-4">
                    <b-col cols="12">
                      <b-card style="border-radius: 20px;">
                        <b-row>
                          <b-col cols="12">
                            <b-form-group label="Donation needed (in PHP):" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                              <b-form-input
                                v-model="event.goals.monetaryDonation"
                                type="number"
                                step="100"
                                placeholder="Enter the required amount for the Event"
                                lazy-formatter
                                :formatter="validateFloat"
                                required
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>
                      </b-card>
                    </b-col>
                  </b-row>

                  <b-row class="pt-4">
                    <b-col cols="12">
                      <b-card style="border-radius: 20px;">
                        <h5 class="text-start" style="font-family:'Bebas Neue', cursive;">
                          Sustainable Development Goals
                        </h5>
                        <b-row class="text-center">
                          <b-col cols="4" v-for="sdg in sdgOptions" :key="sdg._id">
                            <b-form-checkbox v-model="event.sdgIds" :value="sdg._id">
                              &nbsp;
                              <b-avatar
                                :src="sdg.imageUrl"
                                size="150px"
                                square
                              >
                              </b-avatar>
                            </b-form-checkbox>
                          </b-col>
                        </b-row>
                      </b-card>
                    </b-col>
                  </b-row>

                  <b-row class="pt-4">
                    <b-col cols="12">
                      <b-card style="border-radius: 20px;">
                        <h5 class="text-start" style="font-family:'Bebas Neue', cursive;">
                          Roles
                        </h5>

                        <b-row class="pt-2">
                          <b-col cols="12">
                              <b-table
                                :items="event.jobs"
                                :fields="jobFields"
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

                                <template #cell(actions)="{ index }">
                                  <b-button variant="danger" @click="removeEventJob(index)">
                                    <b-icon icon="trash" />
                                  </b-button>
                                </template>
                              </b-table>
                          </b-col>

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
                                <validation-observer ref="jobObs" v-slot="{ invalid: invalidRole }">
                                  <b-container>
                                    <b-row>
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
                                            :rules="{
                                              required: showJobForm === true,
                                              max: 50
                                            }"
                                            v-slot="validationContext"
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

                                      <b-col class="pt-2" cols="12">
                                        <b-form-group class="text-start">
                                          <label
                                            class="py-1"
                                            for="textarea-job-description"
                                            style="font-family: 'Bebas Neue', cursive;"
                                          >
                                            Role Description:
                                          </label>

                                          <validation-provider
                                            :rules="{
                                              max: 100
                                            }"
                                            v-slot="validationContext"
                                          >
                                            <b-form-textarea
                                              id="textarea-job-description"
                                              rows="3"
                                              max-rows="8"
                                              v-model="jobForm.description"
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

                                      <b-col class="pt-2" cols="12">
                                        <b-form-group
                                          label="Number of Volunteers Needed"
                                          style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;"
                                        >
                                          <b-form-input
                                            v-model="jobForm.requirements.max"
                                            type="number"
                                            step="1"
                                            lazy-formatter
                                            :formatter="validatePositive"
                                            required
                                          ></b-form-input>
                                        </b-form-group>
                                      </b-col>

                                      <b-col class="pt-2" cols="12">
                                        <b-form-tags>
                                          <template>
                                            <ul v-if="jobForm.skills.length > 0" class="list-inline d-inline-block mb-2">
                                              <li v-for="(jobSkill, index) in jobForm.skills" :key="index" class="list-inline-item">
                                                <b-form-tag class="bg-success" @remove="removeJobSkill(index)">
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
                                              <b-form-group label="Search Skill" label-for="skill-search" @submit.stop.prevent>
                                                <b-form-input
                                                  id="skill-search"
                                                  debounce="500"
                                                  @update="searchSkills"
                                                ></b-form-input>
                                              </b-form-group>
                                            </b-dropdown-form>
                                            <b-dropdown-divider></b-dropdown-divider>
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

                                      <b-col cols="12" md="6">
                                        <b-button
                                          class="w-50 mt-3"
                                          @click="showJobForm = false"
                                        >
                                          Cancel
                                        </b-button>
                                      </b-col>

                                      <b-col cols="12" md="6">
                                        <b-button
                                          class="w-50 mt-3"
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
                      </b-card>
                    </b-col>
                  </b-row>

                  <b-row class="pt-4">
                    <b-col cols="12">
                      <b-card style="border-radius: 20px;">
                        <h5 class="text-start" style="font-family:'Bebas Neue', cursive;">
                          Questionnaire
                        </h5>

                        <b-row class="pt-2">
                          <b-col cols="12">
                            <b-table
                              :items="event.questions"
                              :fields="questionFields"
                              show-empty
                              responsive
                              striped
                              primary-key="label"
                            >
                              <template #cell(actions)="{ index }">
                                <b-button variant="danger" @click="removeEventQuestion(index)">
                                  <b-icon icon="trash" />
                                </b-button>
                              </template>
                            </b-table>
                          </b-col>

                          <b-col cols="12">
                            <b-button
                              class="w-100 mb-3"
                              :disabled="showQuestionForm"
                              @click="showQuestionForm = true"
                            >
                              Add Question
                            </b-button>

                            <b-collapse v-model="showQuestionForm">
                              <b-card>
                                <validation-observer ref="questionObs" v-slot="{ invalid: invalidQuestion }">
                                  <b-container>
                                    <b-row>
                                      <b-col cols="12">
                                        <b-form-group class="text-start">
                                          <label
                                            class="py-1"
                                            for="input-question-label"
                                            style="font-family: 'Bebas Neue', cursive;"
                                          >
                                            Question:
                                          </label>

                                           <validation-provider
                                              :rules="{
                                                required: showQuestionForm === true,
                                                max: 255
                                              }"
                                              v-slot="validationContext"
                                            >
                                              <b-form-input
                                                id="input-question-label"
                                                v-model="questionForm.label"
                                                placeholder="Ex: How satisfied are you with the event?"
                                                :state="getValidationState(validationContext)"
                                                aria-describedby="input-question-label-feedback"
                                              />

                                              <b-form-invalid-feedback id="input-question-label-feedback">
                                                {{ validationContext.errors[0] }}
                                              </b-form-invalid-feedback>
                                           </validation-provider>
                                        </b-form-group>
                                      </b-col>

                                      <b-col cols="12" md="6">
                                        <b-button
                                          class="w-50 mt-3"
                                          @click="showQuestionForm = false"
                                        >
                                          Cancel
                                        </b-button>
                                      </b-col>

                                      <b-col cols="12" md="6">
                                        <b-button
                                          class="w-50 mt-3"
                                          variant="success"
                                          :disabled="invalidQuestion"
                                          @click="addEventQuestion"
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
                      </b-card>
                    </b-col>
                  </b-row>
                </b-form>

                <b-row class="py-3" align-h="end">
                  <b-col cols="2">
                    <b-row align-v="center">
                      <b-col cols="1" v-if="invalid && (showJobForm || showQuestionForm)">
                        <b-icon
                          v-b-tooltip="'Please complete or close the Roles or Questionnaire form'"
                          icon="exclamation-triangle"
                          font-scale=".85"
                        />
                      </b-col>

                      <b-col cols="10">
                        <b-button
                          id="create-button"
                          class="w-100"
                          variant="danger"
                          :disabled="invalid"
                          @click="showModal = !showModal"
                        >
                          Create Template
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-container>
            </validation-observer>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-modal
      v-model="showModal"
      size="xl"
      @ok="createEventTemplate"
    >
      <b-container fluid>
        <h1 style="font-family:'Bebas Neue', cursive; text-align:center;">
          Are you sure with all the details?
        </h1>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, max } from 'vee-validate/dist/rules'
import { mapGetters } from 'vuex'
import {
  addMonths,
  addDays,
  isSameDay
} from 'date-fns'

import EventTemplateRepository from '../../../repositories/events/templates'
import { apiClient } from '../../../axios'

const eventTemplateRepository = new EventTemplateRepository(apiClient)
const nextMonth = addMonths(new Date(), 1)

extend('required', {
  ...required,
  message: 'This field is required'
})
extend('max', {
  ...max,
  message: 'This field must be less than or equal to {length} characters'
})

export default ({
  name: 'EventTemplateAdd',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      nextMonth,
      startDate: {
        date: nextMonth,
        time: '00:00'
      },
      endDate: {
        date: nextMonth,
        time: '01:00'
      },
      event: {
        name: '',
        description: '',
        location: {
          name: ''
        },
        goals: {
          monetaryDonation: '0.00'
        },
        sdgIds: [],
        jobs: [],
        questions: []
      },
      showModal: false,
      roles: [],
      sdgOptions: [],
      ikdFields: [
        { key: 'name', label: 'Item' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'actions', label: 'Actions' }
      ],
      ikdOptions: [],
      jobFields: [
        { key: 'name', label: 'Title' },
        { key: 'description', label: 'Description' },
        { key: 'requirements.max', label: 'Number of Volunteers Needed' },
        { key: 'skills', label: 'Skills' },
        { key: 'actions', label: 'Actions' }
      ],
      showJobForm: false,
      jobForm: {
        name: '',
        description: '',
        requirements: {
          max: 1
        },
        skills: []
      },
      questionFields: [
        { key: 'label', label: 'Question' },
        { key: 'actions', label: 'Actions' }
      ],
      showQuestionForm: false,
      questionForm: {
        label: ''
      },
      skillOptions: []
    }
  },
  created () {
    eventTemplateRepository.setAuthorizationHeader(`Bearer ${this.token}`)

    this.getSdgs()
  },
  methods: {
    getValidationState ({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    async createEventTemplate () {
      const event = this.event
      const locationName = event.location?.name.trim()

      const payload = {
        name: event.name,
        description: event.description,
        goals: {
          monetaryDonation: event.goals.monetaryDonation
        }
      }

      if (locationName !== '') {
        payload.location = {
          name: locationName
        }
      }

      if (event.sdgIds.length > 0) {
        payload.sdgIds = event.sdgIds
      }

      if (event.jobs.length > 0) {
        payload.jobs = []

        for (const job of event.jobs) {
          payload.jobs.push({
            name: job.name,
            description: job.description,
            requirements: {
              max: job.requirements.amx
            },
            skillIds: job.skills.map((skill) => skill._id)
          })
        }
      }

      if (event.questions.length > 0) {
        payload.questions = event.questions
      }

      await eventTemplateRepository.create(payload)

      this.$router.push({
        path: '/event-templates/select'
      })
    },
    addRole () {
      this.roles.push({
        name: this.form.roleName,
        description: this.form.roleDescription,
        max: this.form.roleNumber
      })

      this.form.roleName = ''
      this.form.roleDescription = ''
      this.form.roleNumber = ''
    },
    setEventStartDate (date, time) {
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()

      const [hours, minutes] = time.split(':')

      this.event.date.start = new Date(year, month, day, hours, minutes, 0, 0)
    },
    setEventEndDate (date, time) {
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()

      const [hours, minutes] = time.split(':')

      this.event.date.end = new Date(year, month, day, hours, minutes, 0, 0)
    },
    validateFloat (value) {
      const parsedValue = parseFloat(value)

      return isNaN(parsedValue) ? '0.00' : parsedValue.toFixed(2)
    },
    validatePositive (value) {
      const parsedValue = parseInt(value)

      return isNaN(parsedValue) || parsedValue <= 0 ? 1 : parsedValue
    },
    async getSdgs () {
      const { data } = await apiClient.get('/sdgs', {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      this.sdgOptions = data.results
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
        skills
      } = this.jobForm

      this.event.jobs.push({
        name,
        description,
        requirements,
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
      this.event.jobs.splice(index, 1)
    },
    addEventQuestion () {
      const { label } = this.questionForm

      if (label !== undefined && label.trim() !== '') {
        this.event.questions.push({
          label,
          type: 'matrix'
        })
      }

      this.showQuestionForm = false

      this.questionForm = {
        label: ''
      }
    },
    removeEventQuestion (index) {
      this.event.questions.splice(index, 1)
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {
    'startDate.date' (value) {
      const startDate = new Date(value)

      this.setEventStartDate(startDate, this.startDate.time)

      const endDate = new Date(this.endDate.date)

      if (endDate < startDate) {
        this.endDate.date = value
      }
    },
    'startDate.time' (value) {
      const startDate = new Date(this.startDate.date)
      const endDate = new Date(this.endDate.date)

      this.setEventStartDate(startDate, value)

      if (!isSameDay(startDate, endDate)) {
        return
      }

      const startTimeParts = value.split(':')
      const startHours = Number(startTimeParts[0])
      const startMinutes = Number(startTimeParts[1])

      const endTimeParts = this.endDate.time.split(':')
      const endHours = Number(endTimeParts[0])

      if (startHours >= endHours) {
        const addedHours = startHours + 1
        let hours = addedHours.toString().padStart(2, '0')

        if (addedHours > 23) {
          hours = '00'

          this.endDate.date = addDays(endDate, 1)
        }

        const minutes = startMinutes.toString().padStart(2, '0')

        this.endDate.time = `${hours}:${minutes}:00`
      }
    },
    'endDate.date' (value) {
      this.setEventEndDate(new Date(value), this.endDate.time)
    },
    'endDate.time' (value) {
      this.setEventEndDate(new Date(this.endDate.date), value)
    }
  }
})
</script>
