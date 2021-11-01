<template>
  <div class="createevent">
    <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
      <b-container class="bv-example-row">
      <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; text-align: center;">Create Event</h2>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-row>
          <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:20px;">
            <b-row>
              <b-form-group label="Event Name:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                <b-form-input v-model="form.name" placeholder="Enter Event Name" required></b-form-input>
              </b-form-group>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label="Location:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                  <b-form-input v-model="form.location" placeholder="Enter Location of the Event" required></b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Contact Person:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                  <b-form-input v-model="form.contactname" placeholder="Enter the Contact Person for the Event" required></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label="Date:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                  <b-form-datepicker id="start-datepicker" v-model="form.date" class="mb-2" required></b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Contact Number:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                  <b-form-input v-model="form.contactnum" placeholder="Enter the Contact Person's number" required></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label="Start Time:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                  <b-form-timepicker v-model="form.s_time" locale="en" required></b-form-timepicker>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="End Time:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                  <b-form-timepicker v-model="form.e_time" locale="en" required></b-form-timepicker>
                </b-form-group>
              </b-col>
              <b-col>
              </b-col>
              <b-col>
              </b-col>
            </b-row>
          </b-card>
        </b-row>
        <b-row>
          <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:20px;">
            <h3 style="font-family:'Bebas Neue', cursive; color: black; position: relative; text-align: left; font-size:20px;">Event Logo</h3>
            <b-form-file v-model="form.file1" class="mt-3" plain></b-form-file>
          </b-card>
        </b-row>
        <b-row>
          <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:20px;">
            <b-form-group label="Event Description:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
              <b-form-textarea id="textarea-auto-height" rows="3" max-rows="8" v-model="text.eventdes" placeholder="Enter event description and other important details" required></b-form-textarea>
            </b-form-group>
          </b-card>
        </b-row>
        <b-row>
          <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:20px;">
            <b-row>
              <b-col>
                <b-form-group label="Number of Volunteers:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                  <b-form-input v-model="form.numvol" type="number" placeholder="Enter the required number of volunteers" required></b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Donation needed (in PHP):" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                  <b-form-input v-model="form.numdon" type="number" placeholder="Enter the required amount for the Event" required></b-form-input>
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
          <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:20px;">
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
          </b-card>
        </b-row>
        <b-row>
          <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:20px;">
            <b-row>
              <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; text-align: left; font-size:20px; margin-top:15px; margin-bottom:20px;">Sustainable Development Goals for this Event:</h2>
              <b-form-group style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                <b-form-tags id="tags-with-dropdown" v-model="values" no-outer-focus class="mb-2" style="text-align:center;">
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
                        <b-icon icon="tag-fill"></b-icon> SDGs Provided
                      </template>
                      <b-dropdown-form @submit.stop.prevent="() => {}">
                        <b-form-group
                          label="Search SDGs"
                          label-for="tag-search-input"
                          label-cols-md="auto"
                          class="mb-0"
                          label-size="sm"
                          :description="searchDescs"
                          :disabled="disabled"
                        >
                          <b-form-input
                            v-model="searcher"
                            id="tag-search-input"
                            type="search"
                            size="sm"
                            autocomplete="off"
                            ></b-form-input>
                        </b-form-group>
                      </b-dropdown-form>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item-button
                        v-for="choices in availableChoices"
                        :key="choices"
                        @click="onChoicesClick({ choices, addTag })"
                      >
                        {{ choices }}
                      </b-dropdown-item-button>
                      <b-dropdown-text v-if="availableChoices.length === 0">
                        There are no tags available to select
                      </b-dropdown-text>
                    </b-dropdown>
                  </template>
                </b-form-tags>
              </b-form-group>
            </b-row>
          </b-card>
        </b-row>
        <b-row>
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
            <b-col>
              <b-button pill variant="danger" to="dashboard" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 125px;">Save</b-button>
            </b-col>
          </b-card>
        </b-row>
      </b-form>
      <b-row style="margin-top:20px; margin-bottom: 20px;">
        <b-col></b-col>
        <b-col></b-col>
        <b-col></b-col>
        <b-col></b-col>
        <b-col>
          <b-button type="submit">Create</b-button>
          &nbsp;
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-col>
      </b-row>
      <!-- <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card> -->
      </b-container>
    </b-card>
  </div>
</template>

<script>

export default ({
  data () {
    return {
      form: {
        name: '',
        location: '',
        date: '',
        contactname: '',
        contactnum: '',
        s_time: '',
        e_time: '',
        numvol: '',
        numdon: '',
        roleName: '',
        roleDescription: '',
        roleNumber: 0,
        food: null,
        file1: null,
        checked: []
      },
      text: {
        eventdes: ''
      },
      roles: [],
      show: true,
      options: ['Teaches at Math', 'Fluent in English', 'Heavy Lifter', 'Playing the guitar'],
      choices: ['Goal 1: No Poverty', 'Goal 4: Quality Education', 'Goal 13: Climate Action'],
      search: '',
      searcher: '',
      value: [],
      values: []
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
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
    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.form.name = ''
      this.form.food = null
      this.form.location = ''
      this.form.date = ''
      this.form.contactname = ''
      this.form.contactnum = ''
      this.form.s_time = ''
      this.form.e_time = ''
      this.form.numvol = ''
      this.form.numdon = ''
      this.form.role = ''
      this.form.rolenum = ''
      this.form.roledes = ''
      this.form.eventdes = ''
      this.form.file1 = null
      this.form.checked = []
      this.text.eventdes = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    onOptionClick ({ options, addTag }) {
      addTag(options)
      this.search = ''
    },
    onChoicesClick ({ choices, addTag }) {
      addTag(choices)
      this.searcher = ''
    }
  },
  computed: {
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
  }

})
</script>

<style scoped>
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
