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
          <b-button @click="updateStep(-1)" pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
            Previous
          </b-button>
          <b-button @click="updateStep(1)" pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
            Next
          </b-button>
        </b-container>
      </b-card>

      <b-card v-if="step === 2" class="card" bg-variant="light" style="display: inline-block; max-height:75rem; width: 415px; border-radius: 20px;">
        <b-container fluid>
          <b-row class="my-1">
            <label class="skills" for="input-small">Skills</label>
            <b-col>
              <b-form-select v-model="selected" :options="options" class="mb-3">
                <template #first>
                  <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
                </template>
              </b-form-select>
            </b-col>
          </b-row>
          <b-button @click="updateStep(-1)" pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
            Previous
          </b-button>
          <b-button @click="register" pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
            Register
          </b-button>
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
      confirmPassword: ''
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
    }
  }
}
</script>

<style scoped>
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
max-height: 100rem;
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
