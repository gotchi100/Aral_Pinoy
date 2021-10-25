<template>
  <div class="dashboard">
   <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
      <b-container fluid>
        <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; font-size: 20px; text-align: left;">Upcoming Events</h2>
        <b-card-group columns>
           <b-row>
            <b-col>
              <b-card title="Batangas Coastal Cleanup" tag="article" style="max-width: 18rem; border-radius: 20px;" class="mb-2">
              <b-icon icon="geo-alt"></b-icon><br>
              <b-icon icon="calendar"></b-icon><br>
              <b-icon icon="clock"></b-icon><br>
              <b-progress :value="value" class="mb-3"></b-progress>
              <b-progress :value="value" class="mb-3"></b-progress>
              </b-card>
            </b-col>
            <b-col>
              <b-card title="Batangas Coastal Cleanup" tag="article" style="max-width: 18rem; border-radius: 20px;" class="mb-2">
              <b-icon icon="geo-alt"></b-icon><br>
              <b-icon icon="calendar"></b-icon><br>
              <b-icon icon="clock"></b-icon><br>
              <b-progress :value="value" class="mb-3"></b-progress>
              <b-progress :value="value" class="mb-3"></b-progress>
              </b-card>
            </b-col>
            <b-col>
              <b-card title="Batangas Coastal Cleanup" tag="article" style="max-width: 18rem; border-radius: 20px;" class="mb-2">
              <b-icon icon="geo-alt"></b-icon><br>
              <b-icon icon="calendar"></b-icon><br>
              <b-icon icon="clock"></b-icon><br>
              <b-progress :value="value" class="mb-3"></b-progress>
              <b-progress :value="value" class="mb-3"></b-progress>
              </b-card>
            </b-col>
            <b-col>
              <b-card title="Batangas Coastal Cleanup" tag="article" style="max-width: 18rem; border-radius: 20px;" class="mb-2">
              <b-icon icon="geo-alt"></b-icon><br>
              <b-icon icon="calendar"></b-icon><br>
              <b-icon icon="clock"></b-icon><br>
              <b-progress :value="value" class="mb-3"></b-progress>
              <b-progress :value="value" class="mb-3"></b-progress>
              </b-card>
            </b-col>
            <b-col>
              <b-card title="Batangas Coastal Cleanup" tag="article" style="max-width: 18rem; border-radius: 20px;" class="mb-2">
              <b-icon icon="geo-alt"></b-icon><br>
              <b-icon icon="calendar"></b-icon><br>
              <b-icon icon="clock"></b-icon><br>
              <b-progress :value="value" class="mb-3"></b-progress>
              <b-progress :value="value" class="mb-3"></b-progress>
              </b-card>
            </b-col>
           </b-row>
        </b-card-group>
      </b-container>
   </b-card>
   <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
     <b-container fluid>
        <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; font-size: 20px; text-align: left;">SDG Campaign</h2>
        <b-row>
          <b-col>
            <b-card style="margin-bottom:20px;" img-src="../assets/sdg1.png" img-alt="Card image" img-top>
              <b-button to="/edit-sdg"  v-if="isDisabled">SDG #1</b-button>
            </b-card>
          </b-col>
          <b-col>
            <b-card style="margin-bottom:20px;" img-src="../assets/sdg4.png" img-alt="Card image" img-top>
              <b-button to="/edit-sdg"  v-if="isDisabled">SDG #4</b-button>
            </b-card>
          </b-col>
          <b-col>
            <b-card style="margin-bottom:20px;" img-src="../assets/sdg13.png" img-alt="Card image" img-top>
              <b-button to="/edit-sdg"  v-if="isDisabled">SDG #12</b-button>
            </b-card>
            </b-col>
        </b-row>
        <b-row>
          <b-col cols="10"></b-col>
          <b-col>
              <b-button @click="isDisabled = true" v-show="!isDisabled">Edit SDG</b-button>
              <b-button @click="isDisabled = false" v-show="isDisabled">Done</b-button>
          </b-col>
        </b-row>
      </b-container>
   </b-card>
   <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
     <b-container fluid>
        <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; font-size: 20px; text-align: left;">Income & Expense Report</h2>
      </b-container>
   </b-card>
   <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
     <b-container fluid>
        <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; font-size: 20px; text-align: left;">Latest Donations Collected</h2>
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
      logo,
      isDisabled: false
    }
  }
}
</script>

<style scoped>
.dashboard {
position: relative;
}
.dashboard:before {
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
