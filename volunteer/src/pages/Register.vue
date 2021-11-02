<template>
  <div>
    <div class="login">
      <div class="image">
        <img :src="logo" style="width: 320px; height: 150px">
      </div>
      <b-card v-if="step === 0" class="card" bg-variant="light" style="display: inline-block; max-height:75rem; width: 415px; border-radius: 20px;">
        <b-container fluid>
          <b-row class="my-1">
            <label class="lname" for="input-small">Last Name</label>
            <b-col>
              <b-form-input v-model="lastName"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <label class="fname" for="input-small">First Name</label>
            <b-col>
              <b-form-input v-model="firstName"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <label class="gender" for="input-small">Gender</label>
            <b-col>
              <b-form-select v-model="selected" :options="options" class="mb-3">
                <template #first>
                  <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
                </template>
              </b-form-select>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <label class="cnum" for="input-small">Contact Number</label>
            <b-col>
              <b-form-input v-model="contactNumber"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <label class="homeAddress" for="input-small">Home Address</label>
            <b-col>
              <b-form-input v-model="homeAddress"></b-form-input>
            </b-col>
          </b-row>

          <b-button @click="updateStep(1)" pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
            Next
          </b-button>

          <div class="col-md-12">
            <p class="signin">
              Already have an account? <b-link to="login">Sign in</b-link>
            </p>
          </div>
        </b-container>
      </b-card>

      <b-card v-if="step === 1" class="card" bg-variant="light" style="display: inline-block; max-height:75rem; width: 415px; border-radius: 20px;">
        <b-container fluid>
          <b-row class="my-1">
            <label class="email" for="input-small">Email Address</label>
            <b-col>
              <b-form-input v-model="email"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <label class="password" for="input-small">Password</label>
            <b-col>
              <b-form-input v-model="password" type="password"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <label class="cpassword" for="input-small">Confirm Password</label>
            <b-col>
              <b-form-input v-model="confirmPassword" type="password"></b-form-input>
            </b-col>
          </b-row>
          <b-container class="bv-example-row">
            <b-row>
              <b-col>
                <b-button @click="updateStep(-1)" pill variant="danger" style="margin-top: 15px; display: inline-block; font-size: 16px; padding: 8px; width: 152px;">
                  Previous
                </b-button>
              </b-col>
              <b-col>
                <b-button @click="updateStep(1)" pill variant="danger" style="margin-top: 15px; display: inline-block; font-size: 16px; padding: 8px; width: 152px;">
                  Next
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </b-container>
      </b-card>

      <b-card v-if="step === 2" class="card" bg-variant="light" style="display: inline-block; max-height:75rem; width: 415px; border-radius: 20px;">
        <b-container fluid>
          <b-row class="my-1">
            <b-col>
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
                        v-for="option in availableOptions"
                        :key="option"
                        @click="onOptionClick({ option, addTag })"
                        >
                        {{ option }}
                        </b-dropdown-item-button>
                        <b-dropdown-text v-if="availableOptions.length === 0">
                        There are no tags available to select
                        </b-dropdown-text>
                    </b-dropdown>
                    </template>
                </b-form-tags>
              </b-form-group>
            </b-col>
          </b-row>
         <b-container class="bv-example-row">
            <b-row>
              <b-col>
                <b-button @click="updateStep(-1)" pill variant="danger" style="margin-top: 15px; display: inline-block; font-size: 16px; padding: 8px; width: 152px;">
                  Previous
                </b-button>
              </b-col>
              <b-col>
                <b-button @click="register" pill variant="danger" style="margin-top: 15px; display: inline-block; font-size: 16px; padding: 8px; width: 152px;">
                  Register
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </b-container>
      </b-card>
    </div>
  </div>
</template>

<script>
const axios = require('axios').default
const logo = require('../assets/aralpinoywords.png')

export default {
  name: 'Register',
  data () {
    return {
      logo,
      step: 0,
      selected: null,
      options: [
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' }
      ],
      firstName: '',
      lastName: '',
      contactNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      roles: [],
      option: ['Teaches at Math', 'Fluent in English', 'Heavy Lifter', 'Playing the guitar', 'Teaches at English', 'Doing Handicrafts', 'Cleaning'],
      search: '',
      value: []
    }
  },
  methods: {
    register () {
      axios.post('http://localhost:3000/users', {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      })
    },
    updateStep (value) {
      this.step += value
    },
    onOptionClick ({ option, addTag }) {
      addTag(option)
      this.search = ''
    }
  },
  computed: {
    criteria () {
      // Compute the search criteria
      return this.search.trim().toLowerCase()
    },
    availableOptions () {
      const criteria = this.criteria
      // Filter out already selected options
      const options = this.option.filter(opt => this.value.indexOf(opt) === -1)
      if (criteria) {
        // Show only options that match criteria
        return options.filter(opt => opt.toLowerCase().indexOf(criteria) > -1)
      }
      // Show all options available
      return options
    },
    searchDesc () {
      if (this.criteria && this.availableOptions.length === 0) {
        return 'There are no tags matching your search criteria'
      }
      return ''
    }
  }
}
</script>

<style scoped>
@import '../css/style.css';

.image {
padding-top: 75px;
padding-bottom: 25px;
}
.login {
background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
url('https://rs.projects-abroad.ie/v1/hero/product-5b5b2f57d7d1b.[1600].jpeg');
background-position: center;
background-repeat: no-repeat;
background-size: cover;
display: block;
position:absolute;
left:0px;
top:0px;
width: 100%;
height: 110%;
z-index:-1;
}
.login-or {
position: relative;
color: #aaa;
margin-top: 10px;
margin-bottom: 10px;
padding-top: 10px;
padding-bottom: 10px;
}
.span-or {
display: block;
position: absolute;
left: 50%;
top: -2px;
margin-left: -25px;
background-color: #f8f9fa;
width: 50px;
text-align: center;
}
.hr-or {
height: 1px;
margin-top: 0px !important;
margin-bottom: 0px !important;
}
.lname, .fname, .cnum, .email, .password, .cpassword,
.homeAddress, .gender, .skills {
padding: 8px;
text-align: left;
font-size: 14px;
}
.signin {
font-size: 14px;
}
.mb-3{
display: block;
width: 100%;
height: 40px;
padding: 0.375rem 0.75rem;
font-size: 1rem;
font-weight: 400;
line-height: 1.5;
color: #212529;
background-color: #fff;
background-clip: padding-box;
border: 1px solid #ced4da;
box-sizing: border-box;
border-radius: 0.25rem;
margin-bottom: 0 !important;
}
</style>
