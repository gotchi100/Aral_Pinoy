<template>
  <div class="createevent">
    <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
      <b-container class="bv-example-row">
      <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; text-align: center;">Create Event</h2>
      <b-form>
        <b-row>
          <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:20px;">
            <b-row>
              <b-form-group label="Event Name:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                <b-form-input v-model="event.name" placeholder="Enter Event Name" required></b-form-input>
              </b-form-group>
            </b-row>

            <b-row>
              <b-col>
                <b-form-group label="Location:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                  <b-form-input v-model="event.location.name" placeholder="Enter Location of the Event" required></b-form-input>
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

            <b-avatar v-if="!!displayLogo" :src="displayLogo" size="250" alt="event logo" square></b-avatar>
            <br />
            <b-form-file v-model="event.logo" class="mt-3" plain></b-form-file>
          </b-card>
        </b-row>

        <b-row>
          <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:20px;">
            <b-form-group label="Event Description:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
              <b-form-textarea id="textarea-auto-height" rows="3" max-rows="8" v-model="event.description" placeholder="Enter event description and other important details" required></b-form-textarea>
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
        <b-row>
          <b-card v-for="(role, index) in roles" :key="index" class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:20px;">
            <b-row>
              <b-col>
                <b-form-group label="Role:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                  <b-form-input v-model="role.name" disabled placeholder="Enter Specific Role" required></b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Number of Volunteers for this Role:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                  <b-form-input v-model="role.max" disabled type="number" placeholder="Enter Number of Volunteers needed for this Role" required></b-form-input>
                </b-form-group>
              </b-col>
              <b-form-group label="Description:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                <b-form-input v-model="role.description" disabled placeholder="Enter Description of the Role" required></b-form-input>
              </b-form-group>
            </b-row>
          </b-card>
          <!-- <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:20px;">
            <b-row>
              <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; text-align: left; font-size:20px; margin-top:15px; margin-bottom:0px;">Roles Needed:</h2>
              <b-col>
                <b-form-group label="Role:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                  <b-form-input v-model="form.roleName" placeholder="Enter Specific Role" required></b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Number of Volunteers for this Role:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                  <b-form-input v-model="form.roleNumber" type="number" placeholder="Enter Number of Volunteers needed for this Role" required></b-form-input>
                </b-form-group>
              </b-col>
              <b-form-group label="Skills:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                <b-form-tags id="tags-with-dropdown" v-model="value" no-outer-focus class="mb-2" style="text-align:center;">
                  <template v-slot="{ tags, disabled, addTag, removeTag }" style="display: inline-block; height: 100%; overflow: auto;">
                    <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                      <li v-for="tag in tags" :key="tag" class="list-inline-item">
                        <b-form-tag
                          @remove="removeTag(tag)"
                          :title="tag"
                          :disabled="disabled"
                          variant="info"
                        >{{ tag }}</b-form-tag>
                      </li>
                    </ul>

                    <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100">
                      <template #button-content>
                        <b-icon icon="tag-fill"></b-icon> Skills Provided
                      </template>
                      <b-dropdown-form @submit.stop.prevent="() => {}">
                        <b-form-group
                          label="Search Skills"
                          label-for="tag-search-input"
                          label-cols-md="auto"
                          class="mb-0"
                          label-size="sm"
                          :description="searchDesc"
                          :disabled="disabled"
                        >
                          <b-form-input
                            v-model="search"
                            id="tag-search-input"
                            type="search"
                            size="sm"
                            autocomplete="off"
                            ></b-form-input>
                        </b-form-group>
                      </b-dropdown-form>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item-button
                        v-for="options in availableOptions"
                        :key="options"
                        @click="onOptionClick({ options, addTag })"
                      >
                        {{ options }}
                      </b-dropdown-item-button>
                      <b-dropdown-text v-if="availableOptions.length === 0">
                        There are no tags available to select
                      </b-dropdown-text>
                    </b-dropdown>
                  </template>
                </b-form-tags>
              </b-form-group>
              <b-form-group label="Description:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                <b-form-input v-model="form.roleDescription" placeholder="Enter Description of the Role" required></b-form-input>
              </b-form-group>
            </b-row>
            <b-row>
              <b-col cols="9"></b-col>
              <b-col>
                <b-button @click="addRole" pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 170px;">
                  Add Another Role
                </b-button>
              </b-col>
            </b-row>
          </b-card> -->
        </b-row>

        <b-row class="pt-4">
          <b-col cols="12">
            <b-card style="border-radius: 20px;">
              <b-form-group
                label="Sustainable Development Goals"
                style="font-family:'Bebas Neue', cursive; text-align:left;"
              >
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
              </b-form-group>
            </b-card>
          </b-col>
        </b-row>

        <!-- <b-row>
          <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:20px;">
            <b-form-group label="Select items needed for the event:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
              <b-col><b-button>Items</b-button></b-col>
              <b-col cols="5"></b-col>
            </b-form-group>
          </b-card>
        </b-row> -->

        <!-- <b-row>
          <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:20px;">
            <b-container fluid>
              <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; font-size: 20px; text-align: left;">Event Evaluation Questions</h2>
              <b-card v-for="(role, index) in roles" :key="index" class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1200px; border-radius: 20px; margin-top:20px;">
                <b-row>
                  <b-col>
                    <b-form-input style="width:1000px;" v-model="role.question" disabled placeholder="Enter your Question"></b-form-input>
                  </b-col>
                  <b-col>
                    <b-button>Delete</b-button>
                  </b-col>
                </b-row>
              </b-card>
              <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1200px; border-radius: 20px; margin-top:20px;">
                <b-row>
                  <b-col>
                    <b-form-input style="width:1000px;" v-model="form.question" placeholder="Enter your Question"></b-form-input>
                  </b-col>
                  <b-col>
                    <b-button>Delete</b-button>
                  </b-col>
                </b-row>
              </b-card>
              <b-row>
                <b-col cols="10">
                </b-col>
                <b-col>
                  <b-button style="margin-top:20px;" @click="addRole">Add Row</b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-row> -->
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const axios = require('axios').default

export default ({
  data () {
    return {
      startDate: {
        date: new Date(),
        time: '00:00'
      },
      endDate: {
        date: new Date(),
        time: '00:00'
      },
      event: {
        name: '',
        description: '',
        location: {
          name: ''
        },
        date: {
          start: new Date(),
          end: new Date()
        },
        goals: {
          monetaryDonation: '0.00'
        },
        logo: null,
        sdgIds: []
      },
      displayLogo: '',
      showModal: false,
      text: {
        eventdes: ''
      },
      roles: [],
      options: ['Teaches at Math', 'Fluent in English', 'Heavy Lifter', 'Playing the guitar'],
      choices: ['Goal 1: No Poverty', 'Goal 4: Quality Education', 'Goal 13: Climate Action'],
      search: '',
      searcher: '',
      value: [],
      values: [],
      sdgOptions: []
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
          form.set('sdgIds[]', id)
        }
      }

      const results = await axios.post('http://localhost:3000/events', form, {
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
    onChoicesClick ({ choices, addTag }) {
      addTag(choices)
      this.searcher = ''
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
    async getSdgs () {
      const { data } = await axios.get('http://localhost:3000/sdgs', {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      this.sdgOptions = data.results
    }
  },
  computed: {
    ...mapGetters(['token']),
    criteria () {
      // Compute the search criteria
      return this.search.trim().toLowerCase()
    },
    criterias () {
      // Compute the search criteria
      return this.searcher.trim().toLowerCase()
    },
    availableOptions () {
      const criteria = this.criteria
      // Filter out already selected options
      const options = this.options.filter(opt => this.value.indexOf(opt) === -1)
      if (criteria) {
        // Show only options that match criteria
        return options.filter(opt => opt.toLowerCase().indexOf(criteria) > -1)
      }
      // Show all options available
      return options
    },
    availableChoices () {
      const criterias = this.criterias
      const choices = this.choices.filter(opt => this.values.indexOf(opt) === -1)
      if (criterias) {
        // Show only options that match criteria
        return choices.filter(opt => opt.toLowerCase().indexOf(criterias) > -1)
      }
      // Show all options available
      return choices
    },
    searchDesc () {
      if (this.criteria && this.availableOptions.length === 0) {
        return 'There are no tags matching your search criteria'
      }
      return ''
    },
    searchDescs () {
      if (this.criterias && this.availableChoices.length === 0) {
        return 'There are no tags matching your search criteria'
      }
      return ''
    }
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
      this.setEventStartDate(value, this.endDate.time)
    },
    'endDate.time' (value) {
      this.setEventStartDate(this.endDate.date, value)
    }
  }
})
</script>

<style scoped>
@import '../css/style.css';

.createevent {
position: relative;
}
.createevent:before {
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
table , tr,td {
  border: 1px solid black;
  padding: 10px;
  width: 50%;
}
button.newItem {
  padding: 5px;
  margin: 14px 0 0 0;
  font-weight: bold;
  font-size: 16px;
}
</style>
