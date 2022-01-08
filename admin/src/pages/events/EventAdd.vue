<template>
  <div>
    <b-container class="py-5">
      <b-row>
        <b-col cols="12">
          <b-card style="border-radius: 20px;">
            <b-container class="bv-example-row">
              <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; text-align: center;">
                Create Event
              </h2>

              <b-form>
                <b-row>
                  <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:20px;">
                    <b-row>
                      <b-form-group class="text-start">
                        <label
                          class="py-1"
                          for="input-event-name"
                          style="font-family: 'Bebas Neue', cursive;"
                        >
                          Event Name:
                        </label>
                        <b-form-input id="input-event-name" v-model="event.name" placeholder="Enter Event Name" required></b-form-input>
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
                          <b-form-input id="input-event-location-name" v-model="event.location.name" placeholder="Enter Location of the Event" required></b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col>
                        <b-form-group label="Start Date:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                          <b-form-datepicker
                            v-model="startDate.date"
                            class="mb-2"
                            :min="new Date()"
                            required
                          ></b-form-datepicker>
                        </b-form-group>
                      </b-col>

                      <b-col>
                        <b-form-group label="Start Time:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                          <b-form-timepicker v-model="startDate.time" locale="en" required></b-form-timepicker>
                        </b-form-group>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col>
                        <b-form-group label="End Date:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                          <b-form-datepicker
                            v-model="endDate.date"
                            class="mb-2"
                            required
                            :min="new Date()"
                          ></b-form-datepicker>
                        </b-form-group>
                      </b-col>

                      <b-col>
                        <b-form-group label="End Time:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                          <b-form-timepicker v-model="endDate.time" locale="en" required></b-form-timepicker>
                        </b-form-group>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col cols="12">
                        <b-form-tags>
                          <template>
                            <ul v-if="event.contacts.length > 0" class="list-inline d-inline-block mb-2">
                              <li v-for="(contact, index) in event.contacts" :key="index" class="list-inline-item">
                                <b-form-tag class="bg-success" @remove="removeEventContact(index)">
                                  {{ contact.name }} - {{ contact.contactMethods[0].value }}
                                </b-form-tag>
                              </li>
                            </ul>

                            <b-dropdown
                              ref="eventContactFormDropdown"
                              text="Add Contacts"
                              style="width: 100%"
                              menu-class="w-100"
                              variant="primary"
                            >
                              <b-dropdown-form>
                                <b-form-group label="Name" label-for="event-contact-name" @submit.stop.prevent>
                                  <b-form-input
                                    id="event-contact-name"
                                    v-model="contactForm.name"
                                  ></b-form-input>
                                </b-form-group>

                                <b-form-group class="pt-3" label="Contact Method" label-for="event-contact-method-type" @submit.stop.prevent>
                                  <b-input-group>
                                    <b-form-select
                                      id="event-contact-method-type"
                                      v-model="contactForm.contactMethods[0].type"
                                      style="width: 100%; padding: 0.5rem 0.75rem"
                                      :options="['EMAIL', 'MOBILE']"
                                      size="lg"
                                    ></b-form-select>
                                  </b-input-group>
                                </b-form-group>

                                <b-form-group class="pt-3" label="Contact Details" label-for="event-contact-method-value" @submit.stop.prevent>
                                  <b-input-group>
                                    <b-form-input
                                      id="event-method-value"
                                      class="ml-3"
                                      v-model="contactForm.contactMethods[0].value"
                                    ></b-form-input>
                                  </b-input-group>
                                </b-form-group>

                                <b-button class="mt-4" variant="success" @click="addEventContact">Submit</b-button>
                              </b-dropdown-form>
                            </b-dropdown>
                          </template>
                        </b-form-tags>
                      </b-col>
                    </b-row>

                    <!-- <b-row>
                      <b-col>
                        <b-form-group label="Contact Person:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                          <b-form-input v-model="form.contactname" placeholder="Enter the Contact Person for the Event" required></b-form-input>
                        </b-form-group>
                      </b-col>

                      <b-col>
                        <b-form-group label="Contact Number:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                          <b-form-input v-model="form.contactname" placeholder="Enter the Contact Person for the Event" required></b-form-input>
                        </b-form-group>
                      </b-col>
              </b-row> -->
            </b-card>
          </b-row>

          <b-row>
            <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:20px;">
              <h3 style="font-family:'Bebas Neue', cursive; color: black; position: relative; text-align: left; font-size:20px;">Event Logo</h3>

              <b-img v-if="!!displayLogo" :src="displayLogo" fluid alt="event logo" />
              <br />
              <b-form-file v-model="event.logo" class="mt-3" plain></b-form-file>
            </b-card>
          </b-row>

          <b-row>
            <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:20px;">
              <b-form-group class="text-start">
                <label
                  class="py-1"
                  for="textarea-event-description"
                  style="font-family:'Bebas Neue', cursive;"
                >
                  Event Description:
                </label>
                <b-form-textarea id="textarea-event-description" rows="3" max-rows="8" v-model="event.description" placeholder="Enter event description and other important details" required></b-form-textarea>
              </b-form-group>
            </b-card>
          </b-row>

          <b-row>
            <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:20px;">
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
                                <b-form-input
                                  id="input-job-name"
                                  v-model="jobForm.name"
                                  placeholder="Ex: Trash Collector"
                                ></b-form-input>
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
                                <b-form-textarea
                                  id="textarea-job-description"
                                  rows="3"
                                  max-rows="8"
                                  v-model="jobForm.description"
                                  placeholder="Ex: Picks up and remove waste from locations and takes the waste to a designated location for proper disposal"
                                  required
                                ></b-form-textarea>
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
                                @click="addEventJob"
                              >
                                Submit
                              </b-button>
                            </b-col>
                          </b-row>
                        </b-container>
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
                        <b-container>
                          <b-row>
                            <b-col cols="12">
                              <b-form-group class="text-start">
                                <label
                                  class="py-1"
                                  for="input-job-name"
                                  style="font-family: 'Bebas Neue', cursive;"
                                >
                                  Question:
                                </label>
                                <b-form-input
                                  id="input-job-name"
                                  v-model="questionForm.label"
                                  placeholder="Ex: How satisfied are you with the event?"
                                ></b-form-input>
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
                                @click="addEventQuestion"
                              >
                                Submit
                              </b-button>
                            </b-col>
                          </b-row>
                        </b-container>
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
                  Items Needed for Event
                </h5>

                <b-row class="pt-2">
                  <b-col cols="12">
                      <b-table
                        :items="event.ikdItems"
                        :fields="ikdFields"
                        show-empty
                        responsive
                        striped
                        primary-key="_id"
                      >
                        <template #cell(quantity)="{ item }">
                          <b-form-input
                            class="text-center"
                            type="number"
                            style="width: 10%; display: inline"
                            v-model="item['quantity']"
                            :formatter="(value) => validateItemQuantity(value, item.maxQuantity)"
                          /> / {{ item.maxQuantity }}
                        </template>

                        <template #cell(actions)="{ index }">
                          <b-button variant="danger" @click="removeIkdItem(index)">
                            <b-icon icon="trash" />
                          </b-button>
                        </template>
                      </b-table>
                  </b-col>

                  <b-col cols="12">
                    <b-dropdown
                      text="Add Item"
                      style="width: 100%"
                      menu-class="w-100"
                      variant="primary"
                    >
                      <b-dropdown-form>
                        <b-form-group label="Search Item" label-for="item-search" @submit.stop.prevent>
                          <b-form-input
                            id="item-search"
                            debounce="500"
                            @update="searchInkindDonations"
                          ></b-form-input>
                        </b-form-group>
                      </b-dropdown-form>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item
                        v-for="item in ikdOptions"
                        :key="item._id"
                        @click="selectIkdItem(item)"
                      >
                        {{ item.quantity }} - {{ item.name }} <span style="color: grey; font-size: 12px">{{ item.sku }}</span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
        </b-form>

        <b-row class="pt-4 pb-2">
          <b-col />
          <b-col cols="2">
            <b-button
              variant="danger"
              @click="showModal = !showModal"
            >
              Create
            </b-button>
          </b-col>
        </b-row>
      </b-container>

      <b-modal
        v-model="showModal"
        size="xl"
        @ok="createEvent"
      >
        <b-container fluid>
          <h1 style="font-family:'Bebas Neue', cursive; text-align:center;">
              Are you sure with all the details?
          </h1>
          </b-container>
      </b-modal>
    </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const { apiClient } = require('../../axios')

const today = new Date()
const midnightToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0)

export default ({
  data () {
    return {
      startDate: {
        date: today,
        time: '00:00'
      },
      endDate: {
        date: today,
        time: '00:00'
      },
      event: {
        name: '',
        description: '',
        location: {
          name: ''
        },
        date: {
          start: midnightToday,
          end: midnightToday
        },
        goals: {
          monetaryDonation: '0.00'
        },
        contacts: [],
        logo: null,
        sdgIds: [],
        ikdItems: [],
        jobs: [],
        questions: []
      },
      contactForm: {
        name: '',
        contactMethods: [{
          type: 'EMAIL',
          value: ''
        }]
      },
      displayLogo: '',
      showModal: false,
      roles: [],
      options: ['Teaches at Math', 'Fluent in English', 'Heavy Lifter', 'Playing the guitar'],
      search: '',
      searcher: '',
      value: [],
      values: [],
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
    this.getSdgs()
  },
  methods: {
    async createEvent () {
      const form = new FormData()

      form.set('name', this.event.name)
      form.set('description', this.event.description)
      form.set('location[name]', this.event.location.name)
      form.set('date[start]', new Date(this.event.date.start).toISOString())
      form.set('date[end]', new Date(this.event.date.end).toISOString())
      form.set('goals[monetaryDonation]', parseFloat(this.event.goals.monetaryDonation))

      if (this.event.logo !== null) {
        form.set('logo', this.event.logo)
      }

      if (this.event.sdgIds.length > 0) {
        for (const id of this.event.sdgIds) {
          form.append('sdgIds[]', id)
        }
      }

      if (this.event.ikdItems.length > 0) {
        for (let i = 0; i < this.event.ikdItems.length; i++) {
          const ikdItem = this.event.ikdItems[i]

          form.set(`ikdItems[${i}][ikdId]`, ikdItem._id)
          form.set(`ikdItems[${i}][quantity]`, ikdItem.quantity)
        }
      }

      if (this.event.jobs.length > 0) {
        for (let i = 0; i < this.event.jobs.length; i++) {
          const job = this.event.jobs[i]

          form.set(`jobs[${i}][name]`, job.name)
          form.set(`jobs[${i}][description]`, job.description)
          form.set(`jobs[${i}][requirements][max]`, job.requirements.max)

          for (let j = 0; j < job.skills.length; j++) {
            const skill = job.skills[j]

            form.set(`jobs[${i}][skillIds][${j}]`, skill._id)
          }
        }
      }

      if (this.event.contacts.length > 0) {
        for (let i = 0; i < this.event.contacts.length; i++) {
          const contact = this.event.contacts[i]

          form.set(`contacts[${i}][name]`, contact.name)
          form.set(`contacts[${i}][contactMethods][0][type]`, contact.contactMethods[0].type)
          form.set(`contacts[${i}][contactMethods][0][value]`, contact.contactMethods[0].value)
        }
      }

      if (this.event.questions.length > 0) {
        for (let i = 0; i < this.event.questions.length; i++) {
          const question = this.event.questions[i]

          form.set(`questions[${i}][label]`, question.label)
          form.set(`questions[${i}][type]`, question.type)
        }
      }

      const results = await apiClient.post('/events', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${this.token}`
        }
      })

      const { _id } = results.data

      this.$router.push({
        path: `/events/${_id}`
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
    onOptionClick ({ options, addTag }) {
      addTag(options)
      this.search = ''
    },
    setEventStartDate (date, time) {
      const [year, month, day] = date.split('-')
      const [hours, minutes] = time.split(':')

      this.event.date.start = new Date(year, month - 1, day, hours, minutes, 0, 0)
    },
    setEventEndDate (date, time) {
      const [year, month, day] = date.split('-')
      const [hours, minutes] = time.split(':')

      this.event.date.end = new Date(year, month - 1, day, hours, minutes, 0, 0)
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
    async searchInkindDonations (value) {
      const queryString = new URLSearchParams()

      queryString.set('limit', 10)

      if (value !== undefined && value !== '') {
        queryString.set('filters.query', value)
      }

      const { data } = await apiClient.get(`/inkind-donations?${queryString.toString()}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      this.ikdOptions = data.results.filter((item) => item.quantity > 0)
    },
    selectIkdItem (item) {
      const itemIndex = this.event.ikdItems.findIndex((ikd) => ikd._id === item._id)

      if (itemIndex !== -1) {
        return
      }

      this.event.ikdItems.push({
        _id: item._id,
        name: item.name,
        quantity: 1,
        maxQuantity: item.quantity
      })
    },
    removeIkdItem (index) {
      this.event.ikdItems.splice(index, 1)
    },
    validateItemQuantity (value, maxQuantity) {
      const parsedNumber = Number(value)

      if (isNaN(parsedNumber) || parsedNumber < 1) {
        return 1
      }

      if (parsedNumber > maxQuantity) {
        return 1
      }

      return parsedNumber
    },
    addEventContact () {
      if (this.contactForm.name !== '' && this.contactForm.contactMethods[0].value !== '') {
        this.event.contacts.push(this.contactForm)
      }

      this.contactForm = {
        name: '',
        contactMethods: [{
          type: 'EMAIL',
          value: ''
        }]
      }

      this.$refs.eventContactFormDropdown.hide(true)
    },
    removeEventContact (index) {
      this.event.contacts.splice(index, 1)
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
    'event.logo' (value) {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.displayLogo = e.target.result
      }

      reader.readAsDataURL(value)
    },
    'startDate.date' (value) {
      this.setEventStartDate(value, this.startDate.time)
    },
    'startDate.time' (value) {
      this.setEventStartDate(this.startDate.date, value)
    },
    'endDate.date' (value) {
      this.setEventEndDate(value, this.endDate.time)
    },
    'endDate.time' (value) {
      this.setEventEndDate(this.endDate.date, value)
    }
  }
})
</script>
