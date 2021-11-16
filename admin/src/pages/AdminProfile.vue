<template>
  <div class="AdminProfile">
    <div class="image" style="padding: 28px;">
      <img :src="logo" style="width: 320px; height: 150px">
    </div>
    <b-container fluid>
      <b-row class="justify-content-md-center">
        <b-col cols="12" md="8">
          <b-card bg-variant="light">
            <h3 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">Admin Profile</h3>
            <b-container fluid>
              <b-row class="my-1">
                <label for="firstName" style="font-family:'Bebas Neue', cursive;">First Name</label>
                <b-col>
                  <b-form-input id="firstName" v-model="user.firstName" :disabled="!isDisabled"></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label for="lastName" style="font-family:'Bebas Neue', cursive;">Last Name</label>
                <b-col>
                  <b-form-input id="lastName" v-model="user.lastName" :disabled="!isDisabled"></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label for="contactNumber" style="font-family:'Bebas Neue', cursive;">Contact Number</label>
                <b-col>
                  <b-form-input id="contactNumber" v-model="user.contactNumber" :disabled="!isDisabled"></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label for="gender" style="font-family:'Bebas Neue', cursive;">Gender</label>
                <b-col>
                  <b-form-input v-if="!isDisabled" id="gender" v-model="user.gender" disabled></b-form-input>
                  <b-form-select v-else id="gender" v-model="user.gender" :options="genderOptions" style="width: 100%"></b-form-select>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label for="birthDate" style="font-family:'Bebas Neue', cursive;">Date of Birth</label>
                <b-col>
                  <b-form-input v-if="!isDisabled" id="birthDate" :value="birthDate" disabled></b-form-input>
                  <b-form-datepicker
                    v-else
                    v-model="user.birthDate"
                    class="mb-2"
                    :max="maxBirthDate"
                  ></b-form-datepicker>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label for="home-address" style="font-family:'Bebas Neue', cursive;">Home Address</label>
                <b-col>
                  <b-form-input id="home-address" v-model="user.address.home" :disabled="!isDisabled"></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label for="email" style="font-family:'Bebas Neue', cursive;">Email Address</label>
                <b-col>
                  <b-form-input id="email" v-model="user.email" :disabled="!isDisabled"></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label class="change" for="input-small" style="font-family:'Bebas Neue', cursive;">Change Password?</label>
              </b-row>

              <b-row class="my-1" v-if="isDisabled">
                <label class="password" for="input-small" style="font-family:'Bebas Neue', cursive;">New Password</label>
                <b-col>
                  <b-form-input v-model="password" :disabled="!isDisabled"></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-1" v-if="isDisabled">
                <label class="cpassword" for="input-small" style="font-family:'Bebas Neue', cursive;">Confirm Password</label>
                <b-col>
                  <b-form-input v-model="cpassword" :disabled="!isDisabled"></b-form-input>
                </b-col>
              </b-row>

              <b-button pill variant="danger" @click="isDisabled = true" v-show="!isDisabled" style="margin: 8px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
                Edit
              </b-button>
              <b-button pill variant="danger" @click="isDisabled = false" v-show="isDisabled" style="margin: 8px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
                Save
              </b-button>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
const logo = require('../assets/aralpinoywords.png')
const { subYears } = require('date-fns')

export default {
  data () {
    return {
      logo,
      user: {
        firstName: '',
        lastName: '',
        contactNumber: '',
        email: '',
        gender: '',
        birthDate: '',
        address: {
          home: ''
        }
      },
      password: '',
      cpassword: '',
      isDisabled: false,
      genderOptions: [
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' }
      ],
      maxBirthDate: subYears(new Date(), 10)
    }
  },
  computed: {
    birthDate () {
      if (!this.user.birthDate) {
        return
      }

      return new Date(this.user.birthDate).toLocaleString('en-us', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  },
  created () {
    const user = this.$store.getters.user

    this.user.firstName = user.firstName
    this.user.lastName = user.lastName
    this.user.contactNumber = user.contactNumber
    this.user.email = user.email
    this.user.gender = user.gender
    this.user.birthDate = user.birthDate

    if (user.address !== undefined && user.address.home) {
      this.user.address.home = user.address.home
    }
  }
}
</script>

<style scoped>
.AdminProfile {
position: relative;
}
.image {
position: relative;
}
.AdminProfile:before {
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
</style>
