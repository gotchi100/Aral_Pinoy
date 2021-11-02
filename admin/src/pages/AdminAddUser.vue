<template>
  <div>
    <div class="login">
      <b-card class="card" bg-variant="light" style="display: inline-block; height: 550px; width: 450px; border-radius: 20px; margin-top: 40px;">
        <b-container fluid>
            <h1 style="font-family:'Bebas Neue', cursive;">
                Add Officer
            </h1>
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
            <label class="cnum" for="input-small">Contact Number</label>
            <b-col>
              <b-form-input v-model="contactNumber"></b-form-input>
            </b-col>
          </b-row>
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
          <b-button @click="showModal = !showModal" pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
            Register User
          </b-button>
        </b-container>
        <b-modal v-model="showModal" size="xl">
          <b-container fluid>
              <h1 style="font-family:'Bebas Neue', cursive; text-align:center;">
                  Are you sure with all the details?
              </h1>
              <b-row>
                <b-col cols="5"></b-col>
                <b-col>
                  <b-button @click="register" type="submit" variant="success">Yes</b-button>
                  &nbsp;
                  <b-button type="reset" variant="danger">No</b-button>
                </b-col>
              </b-row>
          </b-container>
        </b-modal>
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
      firstName: '',
      lastName: '',
      contactNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      showModal: false
    }
  },
  methods: {
    async register () {
      const token = this.$store.getters.token
      await axios.post('http://localhost:3000/users', {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })

      this.$router.push({
        path: '/officers'
      })
    }
  }
}
</script>

<style scoped>
.login {
background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
url('https://rs.projects-abroad.ie/v1/hero/product-5b5b2f57d7d1b.[1600].jpeg');
background-position: center;
background-repeat: no-repeat;
background-size: cover;
display: block;
position:absolute;
left:0px;
top:40px;
width: 100%;
height: 135%;
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
.lname, .fname, .cnum, .email, .password, .cpassword{
  padding: 8px;
  text-align: left;
  font-size: 14px;
}
.signin {
  font-size: 14px;
}
</style>
