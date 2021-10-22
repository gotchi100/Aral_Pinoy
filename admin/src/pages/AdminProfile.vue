<template>
  <div class="AdminProfile">
   <div class="image" style="padding: 28px;">
      <img :src="logo" style="width: 320px; height: 150px">
   </div>
   <b-card class="card" bg-variant="light" style="display: inline-block; max-height:50rem; width: 1000px; border-radius: 20px;">
      <h3 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">Admin Profile</h3>
      <b-container fluid>
        <b-row class="my-1">
          <label class="name" for="input-small" style="font-family:'Bebas Neue', cursive;">First Name</label>
          <b-col>
            <b-form-input v-model="firstName" :disabled="!isDisabled"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <label class="name" for="input-small" style="font-family:'Bebas Neue', cursive;">Last Name</label>
          <b-col>
            <b-form-input v-model="lastName" :disabled="!isDisabled"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <label class="cnum" for="input-small" style="font-family:'Bebas Neue', cursive;">Contact Number</label>
          <b-col>
            <b-form-input v-model="contactNumber" :disabled="!isDisabled"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <label class="email" for="input-small" style="font-family:'Bebas Neue', cursive;">Email Address</label>
          <b-col>
            <b-form-input v-model="email" :disabled="!isDisabled"></b-form-input>
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
  </div>
</template>

<script>
const logo = require('../assets/aralpinoywords.png')

export default {
  data () {
    return {
      logo,
      firstName: '',
      lastName: '',
      contactNumber: '',
      email: '',
      password: '',
      cpassword: '',
      isDisabled: false
    }
  },
  created () {
    const user = this.$store.getters.user

    this.firstName = user.firstName
    this.lastName = user.lastName
    this.contactNumber = user.contactNumber
    this.email = user.email
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
