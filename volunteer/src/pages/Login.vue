<template>
  <div>
    <div class="login">
      <div class="image">
        <img :src="logo" style="width: 320px; height: 150px">
      </div>
      <b-card class="card" bg-variant="light" style="display: inline-block; height: 450px; width: 400px; border-radius: 20px;">
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
          <label class="forgot" for="input-small">Forgot Password?</label>
          <b-button @click="login" pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
            Login
          </b-button>
          <div class="col-md-12 ">
            <div class="login-or">
                <hr class="hr-or">
                <span class="span-or">or</span>
            </div>
          </div>
          <div class="col-md-12 mb-3">
            <p class="text-center">
              <b-button pill variant="danger" style="margin: 8px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
                <font-awesome-icon style="margin-right: 8px;" :icon="['fab', 'google']" />
                Sign in with Google
              </b-button>
            </p>
          </div>
          <label class="signup" for="input-small">Don't have an account? <b-link to="register">Sign up here</b-link></label>
        </b-container>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const logo = require('../assets/aralpinoywords.png')

export default {
  name: 'Login',
  data () {
    return {
      logo,
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      try {
        const results = await axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password
        })

        const { user, token } = results.data

        this.$store.dispatch('login', {
          user,
          token
        })

        this.$router.push({
          path: '/'
        })
      } catch (error) {
        console.log(error.message)
        const message = error.response.data.error.message
        this.errorMessage = message
      }
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
height: 100%;
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
.email, .password{
  padding: 8px;
  text-align: left;
  font-size: 16px;
}
.forgot {
  font-size: 14px;
  padding-top: 10px;
  display: block;
  text-align: right;
}
.signup {
  font-size: 14px;
}
</style>
