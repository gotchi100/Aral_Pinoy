<template>
    <body>
    <div>
      <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
        <b-container fluid>
          <b-card  class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1000px; border-radius: 20px; margin-top:20px;">
            <h1 style="font-family:'Bebas Neue', cursive; color: black; text-align: left; font-size: 50px; margin-top:20px;">Batangas Coastal Cleanup</h1>
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
            <b-container class="bv-example-row">
              <b-row>
                <div class="image">
                  <img src="https://miro.medium.com/max/6300/1*yBLzf7yS7m_GTfLD6oCvzg.jpeg" style="max-width: 100%; max-height: 100%; display: block;">
                </div>
              </b-row>
              <b-row>
                <div>
                  <b-progress height="2rem" style="border-radius:30px;" :max="10000">
                    <b-progress-bar :value="5000" label="We need Php 5,000.00 more" style="background-color: #4267B2"></b-progress-bar>
                  </b-progress>
                </div>
              </b-row>
              <br>
              <b-row>
                <div>
                  <b-progress height="2rem" style="border-radius:30px;" :max="40">
                    <b-progress-bar :value="30" label="We need 10 more volunteers" style="background-color: #8F00FF"></b-progress-bar>
                  </b-progress>
                </div>
              </b-row>
              <b-row>
                <b-col>
                  <b-button @click="$modal.show('example-resizable')" pill style="margin-top: 20px; display: inline-block; font-size: 16px; padding: 8px; width: 225px; font-family: 'Noto Sans', cursive; text-transform: uppercase; background-color: #8F00FF">
                    Volunteer Now
                  </b-button>
                  <volunteer-modal /><br><br>
                </b-col>
                <b-col>
                  <b-button @click="$modal.show('example')" pill style="margin-top: 20px; display: inline-block; font-size: 16px; padding: 8px; width: 225px; font-family: 'Noto Sans', cursive; text-transform: uppercase; background-color: #4267B2">
                    Donate Now
                  </b-button>
                  <donation-modal />
                </b-col>
              </b-row>
            </b-container>
          </b-card>
          <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1000px; border-radius: 20px; margin-top:40px;">
            <h3 style="font-family:'Bebas Neue', cursive; color: black; text-align: left; font-size: 50px; margin-bottom: 40px;">Event Description</h3>
            <p style="text-align:left">
              Getting to know (the real me); Knowing to get (them work together)

              Hello, we know that we are in these worrying times. You might have concerns or questions about staying or looking after your safety. We miss out the opportunity to get involved with causes you are passionate about and the communities you want to help. Due to safety measures, iVolunteer Phils. temporarily put on hold on the ground volunteer activities on the website. We are advised to explore virtual volunteering opportunities in the meantime.

              To support you to get or stay involved with initiatives that are important to you, we introduce the Community Service and Spirituality: Webinar - Reflection Hour Series (CSS: WRH) as our way for all of us to reflect why are we volunteering and to discern how can we be inspired more to safely engage with and serve the communities we want to assist during this global pandemic. The one-hour Moment of Reflection will begin at 6 p.m. on Wednesday, August 25, 2021.
            </p>
          </b-card>
          <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1000px; border-radius: 20px; margin-top:40px;">
            <h3 style="font-family:'Bebas Neue', cursive; color: black; text-align: left; font-size: 50px; margin-bottom: 40px;">Sustainable Development Goals</h3>
            <b-img center src="https://www.un.org/esa/ffd/ffddialogue/images/E_SDG%20goals_icons-individual-rgb-13.png" style="width: 150px; height:150px;" alt="Center image"></b-img>
            <h4 style="font-family:'Bebas Neue', cursive; color: black; text-align: center; font-size: 20px;">SDG 13: Climate Action</h4>
          </b-card>
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
import VolunteerModal from '../components/VolunteerModal.vue'
import DonationModal from '../components/DonationModal.vue'
const logo = require('../assets/aralpinoywords.png')

export default {
  components: {
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
      scY: 0,
      showModal: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      items: [
        { name: 'John Anghel', contactNumber: '+639123456789', role: 'Trash Collector' },
        { name: 'Test Dawkins', contactNumber: '+639123356789', role: 'Trash Bag Distributor' },
        { name: 'Marco Sullivan', contactNumber: '+639323456789', role: 'Trash Collector' },
        { name: 'Zayn Bontoc', contactNumber: '+639123856789', role: 'Trash Bag Distributor' },
        { name: 'Arlyn Jimenez', contactNumber: '+639023456789', role: 'Trash Collector' },
        { name: 'Fredrick Gomez', contactNumber: '+639127456789', role: 'Trash Collector' }
      ],
      fields: [
        { key: 'name', label: 'Name', sortable: true, class: 'text-center' },
        { key: 'contactNumber', label: 'Contact Number', sortable: true, class: 'text-center' },
        { key: 'role', label: 'Role', sortable: true, class: 'text-center' }
      ]
    }
  },
  computed: {
    sortOption () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    this.totalRows = this.items.length
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
    },
    info (item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
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
