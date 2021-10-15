<template>
  <div class="AdminProfile">
   <div class="image" style="padding: 28px;">
      <img :src="logo" style="width: 320px; height: 150px">
   </div>
   <b-card class="card" bg-variant="light" style="display: inline-block; height: 550px; width: 1000px; border-radius: 20px;">
      <h3 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">Admin Profile</h3>
      <b-container fluid>
          <b-row class="my-1">
            <b-col style="margin-top:20px; margin-bottom:20px;">
              <label for="fname" style="font-family: 'Bebas Neue', cursive;">First Name</label>
              <b-form-input v-model="text"></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col style="margin-top:20px; margin-bottom:20px;">
              <label for="lname" style="font-family: 'Bebas Neue', cursive;">Last Name</label>
              <b-form-input v-model="text"></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col style="margin-top:20px; margin-bottom:20px;">
              <label for="cnumber" style="font-family: 'Bebas Neue', cursive;">Contact Number</label>
              <b-form-input v-model="text"></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col style="margin-top:20px; margin-bottom:20px;">
              <label for="email" style="font-family: 'Bebas Neue', cursive;">Email Address</label>
              <b-form-input v-model="text"></b-form-input>
            </b-col>
          </b-row>
          <b-button pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
            Edit
          </b-button>
        </b-container>
    </b-card>
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
