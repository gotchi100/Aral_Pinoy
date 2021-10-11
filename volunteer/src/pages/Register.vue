<template>
  <div>
    <div class="login">
      <div class="image" style="padding: 28px;">
        <img :src="logo" style="width: 320px; height: 150px">
      </div>
      <b-card class="card" bg-variant="light" style="display: inline-block; height: 450px; width: 400px; border-radius: 20px;">
        <b-container fluid>
          <b-row class="my-1">
            <label class="lname" for="input-small">Last Name</label>
            <b-col>
              <b-form-input v-model="text"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <label class="fname" for="input-small">First Name</label>
            <b-col>
              <b-form-input v-model="text"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <label class="cnum" for="input-small">Contact Number</label>
            <b-col>
              <b-form-input v-model="text"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <label class="email" for="input-small">Email Address</label>
            <b-col>
              <b-form-input v-model="text"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <label class="password" for="input-small">Password</label>
            <b-col>
              <b-form-input v-model="text" type="password"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <label class="password" for="input-small">Confirm Password</label>
            <b-col>
              <b-form-input v-model="text" type="password"></b-form-input>
            </b-col>
          </b-row>
          <b-button pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
            Register
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
            <p class="text-center">
              Already have an account? Sign in
            </p>
          </div>
        </b-container>
      </b-card>
    </div>
  </div>
</template>

<script>
const logo = require('../assets/aralpinoywords.png')

export default {
  name: 'Register',
  data () {
    return {
      logo
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
.lname, .fname, .cnum, .email, .password{
  padding: 8px;
  text-align: left;
  font-size: 14px;
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
