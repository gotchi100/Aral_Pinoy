<template>
  <div>
    <div class="py-5">
      <img
        :src="logo"
        style="width: 320px; height: 150px"
      >
    </div>

    <b-card
      v-if="step === 0"
      class="mb-5"
      bg-variant="light"
      style="display: inline-block; max-height:75rem; width: 415px; border-radius: 20px;"
    >
      <b-container fluid>
        <validation-observer v-slot="{ invalid }">
          <b-row class="my-1">
            <label
              class="lname"
              for="input-small"
            >Last Name</label>
            <b-col>
              <validation-provider
                v-slot="validationContext"
                :rules="{
                  required: true,
                  regex: regexRules.filipinoCharacters
                }"
              >
                <b-form-input
                  v-model="user.lastName"
                  :state="getValidationState(validationContext)"
                  aria-describedby="input-user-lastname-feedback"
                />

                <b-form-invalid-feedback
                  v-if="validationContext.failedRules.regex !== undefined"
                  id="input-user-lastname-feedback"
                >
                  This field does not have a valid format
                </b-form-invalid-feedback>

                <b-form-invalid-feedback
                  v-else
                  id="input-user-lastname-feedback"
                >
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <label
              class="fname"
              for="input-user-firstname"
            >First Name</label>
            <b-col>
              <validation-provider
                v-slot="validationContext"
                :rules="{
                  required: true,
                  regex: regexRules.filipinoCharacters
                }"
              >
                <b-form-input
                  id="input-user-firstname"
                  v-model="user.firstName"
                  :state="getValidationState(validationContext)"
                  aria-describedby="input-user-firstname-feedback"
                />

                <b-form-invalid-feedback
                  v-if="validationContext.failedRules.regex !== undefined"
                  id="input-user-firstname-feedback"
                >
                  This field does not have a valid format
                </b-form-invalid-feedback>

                <b-form-invalid-feedback
                  v-else
                  id="input-user-firstname-feedback"
                >
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <label
              class="gender"
              for="input-small"
            >Gender</label>
            <b-col>
              <b-form-select
                v-model="user.gender"
                :options="options"
                style="width: 100%"
              />
            </b-col>
          </b-row>

          <b-row class="my-1">
            <label
              class="birthdate"
              for="input-small"
            >Date of Birth</label>
            <b-col>
              <b-form-datepicker
                id="start-datepicker"
                v-model="user.birthDate"
                class="mb-2"
                :max="maxBirthDate"
              />
            </b-col>
          </b-row>

          <b-row class="my-1">
            <label
              class="cnum"
              for="input-small"
            >Mobile Number</label>
            <b-col>
              <validation-provider
                v-slot="validationContext"
                :rules="{
                  regex: regexRules.phContactNumber
                }"
              >
                <b-form-input
                  v-model="user.contactNumber"
                  :state="getValidationState(validationContext)"
                  aria-describedby="input-user-contactnumber-feedback"
                />
                <b-form-invalid-feedback
                  v-if="!!validationContext.errors[0]"
                  id="input-user-contactnumber-feedback"
                >
                  This field must be a valid Philippine mobile number
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <label
              class="homeAddress"
              for="input-small"
            >Present Address</label>
            <b-col>
              <validation-provider
                v-slot="validationContext"
                :rules="{ max: 256 }"
              >
                <b-form-input
                  v-model="user.address.home"
                  :state="getValidationState(validationContext)"
                  debounce="1000"
                  aria-describedby="input-user-home-address-feedback"
                />
                <b-form-invalid-feedback id="input-user-home-address-feedback">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
          </b-row>

          <b-row
            v-if="user.address.home"
            class="my-1"
          >
            <b-col>
              <iframe
                loading="lazy"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
                :src="`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${user.address.home}`"
              />
            </b-col>
          </b-row>

          <b-button
            pill
            variant="danger"
            style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;"
            :disabled="invalid"
            @click="updateStep(1)"
          >
            Next
          </b-button>
        </validation-observer>

        <div class="col-md-12">
          <p class="signin">
            Already have an account? <b-link to="login">
              Sign in
            </b-link>
          </p>
        </div>
      </b-container>
    </b-card>

    <b-card
      v-if="step === 1"
      class="mb-5"
      bg-variant="light"
      style="display: inline-block; max-height:75rem; width: 415px; border-radius: 20px;"
    >
      <b-container fluid>
        <validation-observer v-slot="{ invalid }">
          <b-row class="my-1">
            <label
              class="email"
              for="input-small"
            >Email Address</label>
            <b-col>
              <validation-provider
                v-slot="validationContext"
                :rules="{
                  required: true,
                  email: true,
                  max: 256
                }"
              >
                <b-form-input
                  v-model="user.email"
                  :state="getValidationState(validationContext)"
                  aria-describedby="input-user-email-feedback"
                />

                <b-form-invalid-feedback id="input-user-email-feedback">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <label
              class="password"
              for="input-small"
            >Password</label>
            <b-col>
              <validation-provider
                v-slot="validationContext"
                :rules="{
                  required: true,
                  min: 8,
                  max: 64
                }"
              >
                <b-form-input
                  v-model="user.password"
                  type="password"
                  :state="getValidationState(validationContext)"
                  aria-describedby="input-user-password-feedback"
                />
                <b-form-invalid-feedback id="input-user-password-feedback">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <label
              class="cpassword"
              for="input-small"
            >Confirm Password</label>
            <b-col>
              <validation-provider
                v-slot="validationContext"
                :rules="{
                  required: true,
                  is: user.password
                }"
              >
                <b-form-input
                  v-model="confirmPassword"
                  type="password"
                  :state="getValidationState(validationContext)"
                  aria-describedby="input-user-confirmpassword-feedback"
                />

                <b-form-invalid-feedback
                  v-if="validationContext.errors[0]"
                  id="input-user-confirmpassword-feedback"
                >
                  Passwords do not match!
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-button
                pill
                variant="danger"
                style="margin-top: 15px; display: inline-block; font-size: 16px; padding: 8px; width: 152px;"
                @click="updateStep(-1)"
              >
                Previous
              </b-button>
            </b-col>

            <b-col>
              <b-button
                pill
                variant="danger"
                style="margin-top: 15px; display: inline-block; font-size: 16px; padding: 8px; width: 152px;"
                :disabled="invalid"
                @click="updateStep(1)"
              >
                Next
              </b-button>
            </b-col>
          </b-row>
        </validation-observer>
      </b-container>
    </b-card>

    <b-card
      v-if="step === 2"
      class="mb-5"
      bg-variant="light"
      style="display: inline-block; max-height:75rem; width: 415px; border-radius: 20px;"
    >
      <b-container fluid>
        <b-row>
          <b-col cols="12">
            <b-form-group
              label="Skills:"
              style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;"
            >
              <b-form-tags
                id="tags-with-dropdown"
                class="mb-2"
                :value="user.skills"
                placeholder=""
                no-outer-focus
                disabled
              >
                <template v-slot="{ tags }">
                  <ul
                    v-if="tags.length > 0"
                    class="list-inline d-inline-block mb-2"
                  >
                    <li
                      v-for="tag in tags"
                      :key="tag"
                      class="list-inline-item"
                    >
                      <b-form-tag
                        class="badge bg-success"
                        variant="success"
                        @remove="removeSkill(JSON.parse(tag))"
                      >
                        {{ JSON.parse(tag).name }}
                      </b-form-tag>
                    </li>
                  </ul>
                </template>
              </b-form-tags>
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-dropdown
              size="sm"
              variant="outline-secondary"
              menu-class="w-100"
              style="width: 100%"
            >
              <template #button-content>
                <b-icon icon="tag-fill" /> Choose a skill
              </template>
              <b-dropdown-form @submit.stop.prevent="() => {}">
                <b-form-group
                  label="Search Skills"
                  label-for="tag-search-input"
                  style="width: 100%"
                >
                  <b-form-input
                    id="tag-search-input"
                    v-model="skillNameSearch"
                    type="search"
                    autocomplete="off"
                    style="width: 100%"
                    @update="onSkillSearchChange"
                  />
                </b-form-group>
              </b-dropdown-form>

              <b-dropdown-divider />

              <b-dropdown-item-button
                v-for="skill in skills"
                :key="skill._id"
                @click="onSkillNameClick(skill)"
              >
                {{ skill.name }}
              </b-dropdown-item-button>

              <b-dropdown-text v-if="skills.length === 0">
                There are no skills available to select
              </b-dropdown-text>
            </b-dropdown>
          </b-col>
        </b-row>

        <br>

        <b-container class="bv-example-row">
          <span class="text"> By clicking Register, you agree to the <a
            href="/#/terms-and-conditions"
            target="_blank"
          >Terms and Condition</a> and <a
            href="/#/privacy-policy"
            target="_blank"
          >Privacy Policy</a> of AralPinoy Org Inc.</span>
          <b-row>
            <b-col>
              <b-button
                pill
                variant="danger"
                style="margin-top: 15px; display: inline-block; font-size: 16px; padding: 8px; width: 152px;"
                @click="updateStep(-1)"
              >
                Previous
              </b-button>
            </b-col>
            <b-col>
              <b-button
                pill
                variant="danger"
                style="margin-top: 15px; display: inline-block; font-size: 16px; padding: 8px; width: 152px;"
                @click="register"
              >
                Register
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, min, max, email, is, regex } from 'vee-validate/dist/rules'

const _ = require('lodash')
const logo = require('../assets/aralpinoywords.png')
const config = require('../../config')
const { apiClient } = require('../axios')

const { subYears, startOfDay } = require('date-fns')

extend('required', {
  ...required,
  message: 'This field is required'
})
extend('min', {
  ...min,
  message: 'This field must be greater than or equal to {length} characters'
})
extend('max', {
  ...max,
  message: 'This field must be less than or equal to {length} characters'
})
extend('email', {
  ...email,
  message: 'This field must be a valid email'
})
extend('is', is)
extend('regex', regex)

export default {
  name: 'Register',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      logo,
      step: 0,
      options: [
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' }
      ],
      user: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: 'Male',
        contactNumber: '',
        birthDate: subYears(new Date(), 18),
        address: {
          home: ''
        },
        skills: []
      },
      confirmPassword: '',
      maxBirthDate: subYears(new Date(), 18),
      skills: [],
      skillNameSearch: '',
      userSkills: [],
      regexRules: {
        filipinoCharacters: /^[a-zA-Z\u00f1\u00d1 -]+$/,
        phContactNumber: /^(09|\+639)\d{9}$/
      }
    }
  },
  computed: {
    debounceGetSkills () {
      return _.debounce(this.getSkills, 500)
    },
    googleMapsApiKey () {
      return config.google.maps.apiKey
    }
  },
  created () {
    if (this.skills.length === 0) {
      this.getSkills()
    }
  },
  methods: {
    getValidationState ({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    async register () {
      const birthDate = startOfDay(new Date(this.user.birthDate))
      const skills = this.user.skills.map((skill) => skill._id)

      const userData = _.pickBy({
        ...this.user,
        birthDate,
        skills
      }, _.identity)

      await apiClient.post('/register', userData)

      const results = await apiClient.post('/login', {
        email: this.user.email,
        password: this.user.password
      })

      const { user, token } = results.data

      this.$store.dispatch('login', {
        user,
        token
      })

      this.$router.push({
        path: '/'
      })
    },
    async getSkills () {
      const queryString = new URLSearchParams()

      if (this.skillNameSearch !== '') {
        queryString.set('filters.name', encodeURI(this.skillNameSearch))
      }

      const { data } = await apiClient.get(`/skills?${queryString.toString()}`)

      this.skills = data.results
    },
    onSkillSearchChange () {
      this.debounceGetSkills()
    },
    updateStep (value) {
      this.step += value
    },
    onSkillNameClick (skillToAdd) {
      if (this.user.skills.findIndex((skill) => skill._id === skillToAdd._id) === -1) {
        this.user.skills.push(skillToAdd)
      }

      this.skillNameSearch = ''

      this.getSkills()
    },
    removeSkill (skillToRemove) {
      const index = this.user.skills.findIndex((skill) => skill._id === skillToRemove._id)

      if (index !== -1) {
        this.user.skills.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
@import '../css/style.css';

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
.homeAddress, .gender, .skills, .birthdate {
padding: 8px;
text-align: left;
font-size: 14px;
}
.signin {
font-size: 14px;
}
.text {
font-size: 12px;
display: block;
text-align: left;
}
</style>
