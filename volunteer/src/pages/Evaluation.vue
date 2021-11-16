<template>
    <body>
    <div>
      <div class="image">
        <img :src="logo" style="width: 320px; height: 150px">
      </div>
      <b-card class="card" bg-variant="light" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px;">
      <h1 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">BATANGAS COASTAL CLEAN UP</h1>
      <h4 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">Tali Beach, Batangas Sepetember 27, 2021 </h4>
        <b-container fluid>
          <b-card class="card">
            <b-container fluid>
              <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; font-size: 20px; text-align: left;">Event Evaluation Form</h2>
              <b-row>
                <b-col></b-col>
                <b-col>1</b-col>
                <b-col>2</b-col>
                <b-col>3</b-col>
                <b-col>4</b-col>
                <b-col>5</b-col>
              </b-row>
              <br>
              <b-row>
                <b-col>How was the event?</b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="A"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="C"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="D"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="E"></b-form-radio></b-col>
              </b-row>
              <br>
              <b-row>
                <b-col>How was the event?</b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="A"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="C"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="D"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="E"></b-form-radio></b-col>
              </b-row>
              <br>
              <b-row>
                <b-col>How was the event?</b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="A"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="C"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="D"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="E"></b-form-radio></b-col>
              </b-row>
              <br>
              <b-row>
                <b-col>How was the event?</b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="A"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="C"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="D"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="E"></b-form-radio></b-col>
              </b-row>
            </b-container>
          </b-card>
          <br>
          <b-row>
            <b-col col lg="2">
              <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; font-size: 20px; text-align: center;">Event Rating:</h2>
            </b-col>
            <b-col>
              <b-form-rating v-model="value"></b-form-rating>
            </b-col>
          </b-row>
          <br>
          <b-card class="card">
            <b-container fluid>
              <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; font-size: 20px; text-align: left;">SDG Evaluation Form</h2>
              <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; font-size: 20px; text-align: center;">SDG 1</h2>
               <b-row>
                <b-col></b-col>
                <b-col>1</b-col>
                <b-col>2</b-col>
                <b-col>3</b-col>
                <b-col>4</b-col>
                <b-col>5</b-col>
              </b-row>
              <br>
              <b-row>
                <b-col>How was the event?</b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="A"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="C"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="D"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="E"></b-form-radio></b-col>
              </b-row>
              <br>
              <b-row>
                <b-col>How was the event?</b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="A"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="C"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="D"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="E"></b-form-radio></b-col>
              </b-row>
              <br>
              <b-row>
                <b-col>How was the event?</b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="A"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="C"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="D"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="E"></b-form-radio></b-col>
              </b-row>
              <br>
              <b-row>
                <b-col>How was the event?</b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="A"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="C"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="D"></b-form-radio></b-col>
                <b-col><b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="E"></b-form-radio></b-col>
              </b-row>
            </b-container>
          </b-card>
          <br>
          <b-card class="card">
            <b-container fluid>
              <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; font-size: 20px; text-align: left;">Recommendations and Comments</h2>
              <b-form-textarea
                id="textarea"
                v-model="text"
                placeholder="Enter something..."
                rows="10"
                max-rows="6"
              ></b-form-textarea>
            </b-container>
          </b-card>
          <b-button pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
            Submit
          </b-button>
        </b-container>
      </b-card>
     </div>
     <br>
     <Footer />
    </body>
</template>

<script>
import Footer from '../components/Footer.vue'
const logo = require('../assets/aralpinoywords.png')

export default {
  components: {
    Footer
  },
  data () {
    return {
      logo,
      text: '',
      value: null
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

.image {
padding-top: 50px;
padding-bottom: 25px;
}
body {
background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
url('https://rs.projects-abroad.ie/v1/hero/product-5b5b2f57d7d1b.[1600].jpeg');
background-position: center;
background-repeat: no-repeat;
background-size: cover;
}
</style>
