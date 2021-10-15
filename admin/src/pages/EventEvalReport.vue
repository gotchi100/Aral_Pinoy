<template>
  <div class="eventevalreport">
   <div class="image" style="padding: 28px;">
      <img :src="logo" style="width: 320px; height: 150px">
   </div>
   <b-card class="card" bg-variant="light" style="display: inline-block; height: 500px; width: 1200px; border-radius: 20px;">
      <b-container fluid>
        <b-row class="my-1">
          <h3 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">Event Evaluation Report</h3>
          <h4 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">Completed Events</h4>
          <b-col>
            <b-form-input class="form-control" v-model="text" placeholder="Search for an Event" style="margin-top:30px; width: 540px;"></b-form-input>
          </b-col>
        </b-row>
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
.eventevalreport {
position: relative;
}
.image {
position: relative;
}
.eventevalreport:before {
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
