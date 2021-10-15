<template>
  <div class="volreport">
   <div class="image" style="padding: 28px;">
      <img :src="logo" style="width: 320px; height: 150px">
   </div>
   <b-card class="card" bg-variant="light" style="display: inline-block; height: 250px; width: 1000px; border-radius: 20px;">
      <h3 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">Volunteer Report</h3>
        <b-container fluid>
          <b-row class="my-1">
            <b-col style="margin-top:20px; margin-bottom:20px;">
              <label for="start-datepicker" style="font-family: 'Bebas Neue', cursive;">From</label>
              <b-form-datepicker id="start-datepicker" v-model="value" class="mb-2"></b-form-datepicker>
            </b-col>
            <b-col style="margin-top:20px; margin-bottom:20px;">
              <label for="end-datepicker" style="font-family: 'Bebas Neue', cursive;">To</label>
              <b-form-datepicker id="end-datepicker" v-model="value" class="mb-2"></b-form-datepicker>
            </b-col>
          </b-row>
          <b-button pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
            Generate Report
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
.volreport {
position: relative;
}
.image {
position: relative;
}
.volreport:before {
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
