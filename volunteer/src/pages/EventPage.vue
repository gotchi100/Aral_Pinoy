<template>
    <body>
    <div>
      <b-card class="card" bg-variant="light" style="display: inline-block; height:1200px; width: 1000px;">
        <b-container fluid>
        <h1 style="font-family:'Bebas Neue', cursive; color: black; text-align: left; font-size: 50px;">Batangas Coastal Cleanup</h1>
        <b-container class="bv-example-row">
          <b-row>
            <b-col>
              <div>
                <p class="h4 mb-0"><b-icon icon="geo-alt"></b-icon> Tali Beach, Batangas</p>
                <p class="h4 mb-0"><b-icon icon="calendar"></b-icon> September 27 - October 12, 2021</p>
                <p class="h4 mb-0"><b-icon icon="clock"></b-icon> 6:30 AM - 5:30PM</p>
              </div>
            </b-col>
            <b-col>
              <div>
                <p class="h4 mb-0"><b-icon icon="people"></b-icon> Antonio Ingles</p>
                <p class="h4 mb-0"><b-icon icon="telephone"></b-icon> 0921 123 456</p>
              </div>
            </b-col>
          </b-row>
         </b-container>
         <div class="image">
            <img src="https://miro.medium.com/max/6300/1*yBLzf7yS7m_GTfLD6oCvzg.jpeg" style="width: 900px; height: 500px">
          </div>
          <b-progress :value="value" class="mb-3"></b-progress>
          <b-progress :value="value" class="mb-3"></b-progress>
          <b-container class="bv-example-row">
            <b-row>
              <b-col>
                <b-button @click="$modal.show('example-resizable')" pill style="margin-top: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px; font-family: 'Noto Sans', cursive; text-transform: uppercase; background-color: #8F00FF">
                  Volunteer Now
                </b-button>
                <volunteer-modal />
              </b-col>
              <b-col>
                <b-button @click="$modal.show('example')" pill style="margin-top: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px; font-family: 'Noto Sans', cursive; text-transform: uppercase; background-color: #4267B2">
                  Donate Now
                </b-button>
                <donation-modal />
              </b-col>
            </b-row>
          </b-container>
          <br>
          <h1 style="font-family:'Bebas Neue', cursive; color: black; text-align: left; font-size: 50px;">Event Description</h1>
          <h1 style="font-family:'Bebas Neue', cursive; color: black; text-align: left; font-size: 50px;">Sustainable Development Goals</h1>
        </b-container>
      </b-card>
     <Footer />
     <transition name="fade">
    <div id="pagetop" class="fixed right-0 bottom-0" v-show="scY > 300" @click="toTop">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
           stroke="#4a5568"
           stroke-width="1" stroke-linecap="square" stroke-linejoin="arcs">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </div>
  </transition>
    </div>
    </body>
</template>

<script>
import Footer from '../components/Footer.vue'
import VolunteerModal from '../components/VolunteerModal.vue'
import DonationModal from '../components/DonationModal.vue'
const logo = require('../assets/aralpinoywords.png')

export default {
  components: {
    Footer,
    VolunteerModal,
    DonationModal
  },
  data () {
    return {
      logo,
      sliding: null,
      value: 75,
      canBeShown: false,
      scTimer: 0,
      scY: 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    handleScroll: function () {
      if (this.scTimer) return
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY
        clearTimeout(this.scTimer)
        this.scTimer = 0
      }, 100)
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
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
.h4{
  font-family: 'Bebas Neue', cursive;
  text-align: left;
  line-height: 1.8;
}
.fixed {
display: inline;
position: fixed;
right: 15px;
bottom: 15px;
z-index: 99999;
}
</style>
