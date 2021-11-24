<template>
  <div>
    <div class="login">
      <div class="image" style="padding: 28px;">
        <img :src="logo" style="width: 320px; height: 150px">
      </div>
      <b-card class="card" bg-variant="light" style="display: inline-block; height: 100%; overflow: auto; width: 400px; border-radius: 20px;">
        <b-container fluid>
          <b-alert :show="!!errorMessage" variant="danger">
            {{ errorMessage }}
          </b-alert>

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
          <b-button @click="login" pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
            Login
          </b-button>
          <label class="signup" for="input-small"><b-link to="/forget-password">Forgot Password?</b-link></label>
        </b-container>
      </b-card>
    </div>
  </div>
</template>

<script>
const axios = require('axios').default
const logo = require('../assets/aralpinoywords.png')

export default {
  name: 'Login',
  data () {
    return {
      logo,
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  computed: {
    status () {
      const status = parseInt(this.$route.query.status, 10)

      if (isNaN(status)) {
        return
      }

      return status
    }
  },
  created () {
    if (this.status === 401) {
      this.$router.replace({
        path: '/login'
      })
      this.errorMessage = 'Your session has expired. Please login again.'
    }
  },
  methods: {
    async login () {
      try {
        const results = await axios.post('http://localhost:3000/admin/login', {
          email: this.email,
          password: this.password
        })

        const { user, token } = results.data

        this.$store.dispatch('login', {
          user,
          token
        })

        this.$router.push({
          path: '/dashboard'
        })
      } catch (error) {
        const message = error.response?.data?.message

        this.errorMessage = message
      }
    }
  }
}
</script>

<style scoped>
.login {
position: relative;
}
.image {
position: relative;
}
.login:before {
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
