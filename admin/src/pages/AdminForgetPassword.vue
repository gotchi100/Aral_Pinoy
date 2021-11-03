<template>
  <div>
    <div class="login">
      <div class="image" style="padding: 28px;">
        <img :src="logo" style="width: 320px; height: 150px">
      </div>
      <b-card class="card" bg-variant="light" style="display: inline-block; height: 100%; overflow: auto; width: 600px; border-radius: 20px;">
        <b-container fluid>
          <b-row v-if="errorMessage !== ''" class="my-1">
            <span>{{ errorMessage }}</span>
          </b-row>
          <b-row class="my-1">
            <h4 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">Please enter your email address you'd like your password resent information sent to</h4>
            <label class="email" for="input-small">Email Address</label>
            <b-col>
              <b-form-input v-model="email"></b-form-input>
            </b-col>
          </b-row>
          <b-button pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 150px;">
            Send
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
