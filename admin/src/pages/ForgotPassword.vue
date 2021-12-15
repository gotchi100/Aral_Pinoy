<template>
  <div>
    <div class="login">
      <div class="image" style="padding: 28px;">
        <img :src="logo" style="width: 320px; height: 150px">
      </div>
      <b-card class="card" bg-variant="light" style="display: inline-block; height: 100%; overflow: auto; width: 600px; border-radius: 20px;">
        <b-container fluid>
          <b-alert :show="message.text !== ''" :variant="message.error ? 'danger' : 'success'">
            {{ message.text }}
          </b-alert>

          <b-row class="my-1">
            <h4 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">Please enter your email address you'd like your password resent information sent to</h4>
            <label class="email" for="input-small">Email Address</label>
            <b-col>
              <b-form-input v-model="email" placeholder="Ex: juandelacruz@gmail.com"></b-form-input>
            </b-col>
          </b-row>

          <b-button
            pill
            variant="danger"
            style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;"
            :disabled="isLoading"
            @click="requestPasswordReset"
          >
            <b-spinner v-if="isLoading"></b-spinner>
            <span v-else>Send</span>
          </b-button>

          <b-row>
            <label class="signup" for="input-small"><b-link to="/login">Return to Login</b-link></label>
          </b-row>
        </b-container>
      </b-card>
    </div>
  </div>
</template>

<script>
const axios = require('axios').default

const logo = require('../assets/aralpinoywords.png')

export default {
  name: 'ForgotPassword',
  data () {
    return {
      logo,
      email: '',
      message: {
        error: false,
        text: ''
      },
      isLoading: false
    }
  },
  methods: {
    resetMessage () {
      this.message = {
        error: false,
        text: ''
      }
    },
    async requestPasswordReset () {
      this.isLoading = true

      this.resetMessage()

      try {
        await axios.post('http://localhost:3000/forgot-password', {
          email: this.email,
          origin: 'admin'
        })

        this.email = ''

        this.message = {
          error: false,
          text: 'Password reset has been requested! Please check your inbox or spam folder for our email.'
        }
      } catch (error) {
        const message = error.response?.data?.message

        this.message = {
          error: true,
          text: message
        }
      } finally {
        this.isLoading = false
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
.email {
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
