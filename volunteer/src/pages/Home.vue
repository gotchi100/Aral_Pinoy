<template>
  <div style="background-color: white">
    <div class="wp-block-cover is-style-bottom-wave">

      <div class="bg">
      <div class="wp-block-cover__inner-container">
          <div class="image">
            <img :src="logo" style="width: 420px; height: 240px">
          </div>
        </div>
      </div>
    </div>

    <div class="featured">
      <b-container>
        <p>Featured</p>

        <b-carousel
          id="carousel-1"
          class="mb-5"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <!-- Text slides with image -->
          <b-carousel-slide
          caption="First slide"
          text="Nulla vitae elit libero, a pharetra augue mollis interdum."
          img-src="https://picsum.photos/1024/480/?image=52"
          ></b-carousel-slide>

          <!-- Slides with custom text -->
          <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
          <h1>Hello world!</h1>
          </b-carousel-slide>

          <!-- Slides with image only -->
          <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

          <!-- Slides with img slot -->
          <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
          <b-carousel-slide>
          <template #img>
              <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              src="https://picsum.photos/1024/480/?image=55"
              alt="image slot"
              >
          </template>
          </b-carousel-slide>

          <!-- Slide with blank fluid image to maintain slide aspect ratio -->
          <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
          <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
              a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
          </p>
          </b-carousel-slide>
        </b-carousel>

        <!-- <p class="mt-4">
          Slide #: {{ slide }}<br>
          Sliding: {{ sliding }}
        </p> -->
      </b-container>
    </div>

    <div class="wp-block-cover is-style-bottom-wave">
      <div class="events">
        <b-container>
          <p class="text" id="events">
            Events
          </p>

          <b-row>
            <template v-if="isLoadingEvents">
              <b-col v-for="index in [0, 1, 2]" :key="index" cols="12" md="4">
                <b-card no-body>
                  <b-skeleton-img height="350px">
                  </b-skeleton-img>
                </b-card>
              </b-col>
            </template>

            <template v-else>
              <b-col
                v-for="event in events"
                :key="event._id"
                class="pb-4"
                cols="12"
                md="4"
              >
                <b-card
                  class="mb-2"
                  :img-src="event.logoUrl !== undefined ? event.logoUrl : noImageSrc"
                  img-height="300px"
                  img-alt="Image"
                  style="text-align: left; cursor: pointer; min-height: 600px"
                  @click="$router.push(`/events/${event._id}`)"
                >
                  <h4>
                    <b-link :to="`/events/${event._id}`">
                      {{ event.name }}
                    </b-link>
                  </h4>

                  <b-card-text v-if="event.description !== undefined">
                    {{
                      event.description.length > 175
                      ? `${event.description.substring(0, 175)}...`
                      : event.description
                    }}
                  </b-card-text>

                  <b-row style="text-align: left">
                    <b-col v-if="event.location !== undefined" class="pb-2" cols="12">
                      <b-icon icon="geo-alt"></b-icon> {{ event.location.name }}
                    </b-col>

                    <b-col class="pb-2" cols="12">
                      <b-icon icon="calendar"></b-icon>
                      {{
                        new Date(event.date.start).toLocaleString('en-us', {
                          dateStyle: 'short',
                          timeStyle: 'short'
                        })
                      }}
                      -
                      {{
                        isSameDay(event.date.start, event.date.end)
                        ? new Date(event.date.end).toLocaleString('en-us', {
                            timeStyle: 'short'
                          })
                        : new Date(event.date.end).toLocaleString('en-us', {
                            dateStyle: 'short',
                            timeStyle: 'short'
                          })
                      }}
                    </b-col>

                    <b-col class="pb-3" cols="12">
                      <b-icon icon="clock"></b-icon> {{ getDurationBetweenDates(event.date.start, event.date.end) }}
                    </b-col>
                  </b-row>

                  <b-row v-if="event.goals.monetaryDonation.target !== 0">
                    <b-col cols="12">
                      <b-progress height="1.5rem" :max="event.goals.monetaryDonation.target">
                        <b-progress-bar
                          variant="success"
                          :value="event.goals.monetaryDonation.current"
                          :label="getMonetaryDonationCurrentLabel(event.goals.monetaryDonation)"
                        ></b-progress-bar>

                        <b-progress-bar
                          variant="danger"
                          :value="hasGoalReached(event.goals.monetaryDonation) ? 0 : event.goals.monetaryDonation.target"
                          :label="getMonetaryDonationTargetLabel(event.goals.monetaryDonation)"
                        ></b-progress-bar>
                      </b-progress>
                    </b-col>
                  </b-row>

                  <b-row v-if="event.goals.numVolunteers.target !== 0">
                    <b-col class="pt-2" cols="12">
                      <b-progress height="1.5rem" :max="event.goals.numVolunteers.target">
                        <b-progress-bar
                          variant="success"
                          :value="event.goals.numVolunteers.current"
                          :label="getVolunteerGoalCurrentLabel(event.goals.numVolunteers)"
                        ></b-progress-bar>

                        <b-progress-bar
                          variant="danger"
                          :value="hasGoalReached(event.goals.numVolunteers) ? 0 : event.goals.numVolunteers.target"
                          :label="getVolunteerGoalTargetLabel(event.goals.numVolunteers)"
                        ></b-progress-bar>
                      </b-progress>
                    </b-col>
                  </b-row>
                </b-card>
              </b-col>
            </template>
          </b-row>

          <p v-if="hasMoreEvents" class="more">
            <b-link to="/events">
              View More Events <b-icon icon="chevron-right"></b-icon>
            </b-link>
          </p>
        </b-container>

        <br v-for="i in Array(15)" :key="i" />
      </div>
    </div>

    <div class="about">
      <b-container class="bv-example-row">
        <p id="about">About Us</p>
        <b-row>
          <b-col>
            <div class="info">
              Founded in August 11, 2010 by the organization’s
              founder and president, Antonio Levy S. Ingles, Jr.,
              PhD, an educator for 30 years and is currently a full-time
              faculty member in the De La Salle-College of Saint Benilde,
              City of Manila, Philippines.
            </div>
          </b-col>
          <b-col>
            <div class="info">
              SUPPORT AND HELP THE PROGRAMS, PROJECTS AND
              ACTIVITIES OF ARALPINOY.ORG INC, A NON-STOCK, NON-PROFIT
              AND NON-PARTISAN ORGANIZATION REGISTERED UNDER THE LAWS OF
              THE RP ON AUGUST 11, 2010 WITH
              SEC CRN CN201012580 AND BIR TIN 007-842-097.<br>
              FOR ANY HELP, PLEASE NOTIFY US AT<br>
              INGLES.ANTONIO@GMAIL.COM OR <br>
              09178661006 <br>
              MARAMING MARAMING SALAMAT PO!
            </div>
          </b-col>
        </b-row>
      </b-container>
      <br>
    </div>
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
</template>

<script>
import {
  isSameDay,
  intervalToDuration,
  formatDuration
} from 'date-fns'

import Footer from '../components/Footer.vue'
const logo = require('../assets/aralpinoywords.png')

const { apiClient } = require('../axios')

export default {
  components: {
    Footer
  },
  data () {
    return {
      logo,
      slide: 0,
      sliding: null,
      value: 75,
      scTimer: 0,
      scY: 0,
      isLoadingEvents: false,
      hasMoreEvents: false,
      events: []
    }
  },
  computed: {
    noImageSrc () {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/No_image_available_600_x_450.svg/1280px-No_image_available_600_x_450.svg.png'
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)

    const scroll = this.$route.query.scroll

    if (scroll === 'events') {
      document.getElementById('events').scrollIntoView()

      this.$router.replace({ path: '/' })
    } else if (scroll === 'about') {
      document.getElementById('about').scrollIntoView()

      this.$router.replace({ path: '/' })
    }
  },
  created () {
    this.getEvents()
  },
  methods: {
    async getEvents () {
      this.isLoadingEvents = true

      const queryString = new URLSearchParams()

      queryString.set('limit', 6)
      queryString.set('filters.status', 'UPCOMING')
      queryString.set('sort.field', 'date.start')
      queryString.set('sort.order', 'asc')

      try {
        const { data } = await apiClient.get(`/events?${queryString.toString()}`)

        this.events = data.results
        this.hasMoreEvents = data.total > this.events.length
      } finally {
        this.isLoadingEvents = false
      }
    },
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
    isSameDay (firstDate, secondDate) {
      return isSameDay(new Date(firstDate), new Date(secondDate))
    },
    hasGoalReached ({ current, target }) {
      return current >= target
    },
    getMonetaryDonationCurrentLabel ({ current, target }) {
      if (current >= target) {
        const currentCurrency = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'PHP'
        }).format(current)

        const targetCurrency = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'PHP'
        }).format(target)

        return `We have reached our goal! (${currentCurrency} / ${targetCurrency})`
      }

      const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP'
      }).format(current)

      return currency
    },
    getMonetaryDonationTargetLabel ({ current, target }) {
      if (current >= target) {
        return ''
      }

      const difference = target - current
      const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP'
      }).format(difference)

      return `We still need ${currency} to reach our goal!`
    },
    getVolunteerGoalCurrentLabel ({ current, target }) {
      if (current >= target) {
        return `We have reached our goal! (${current} / ${target} have volunteered)`
      }

      const volunteerNoun = target - current === 1 ? 'volunteer' : 'volunteers'

      return `${current} ${volunteerNoun}`
    },
    getVolunteerGoalTargetLabel ({ current, target }) {
      if (current >= target) {
        return ''
      }

      const difference = target - current
      const volunteerNoun = difference === 1 ? 'volunteer' : 'volunteers'

      return `We still need ${difference} ${volunteerNoun}!`
    },
    getDurationBetweenDates (start, end) {
      const duration = intervalToDuration({
        start: new Date(start),
        end: new Date(end)
      })

      return formatDuration(duration)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
@import '../css/style.css';

.bg {
  background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
  url('https://miro.medium.com/max/6300/1*yBLzf7yS7m_GTfLD6oCvzg.jpeg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: block;
  position:relative;
  left:0px;
  top:0px;
  width: 100%;
  height: 50%;
  z-index:-1;
}
.image {
  padding-top: 45px;
  padding-bottom: 45px;
}
.featured p {
  font-size: 50px;
  text-align: left;
  padding-top: 18px;
}
.events {
  background: #04AC6B;
}
.text {
  color: white;
  font-family: 'Bebas Neue', cursive;
  font-size: 50px;
  text-align: left;
  padding-top: 18px;
}
.more {
  color: white;
  font-family: 'Bebas Neue', cursive;
  font-size: 50px;
  text-align: right;
  padding-top: 18px;
}
.about {
  height: 420px;
}
.about p {
  font-size: 50px;
  text-align: left;
  padding-top: 18px;
}
p {
  color: black;
  font-family: 'Bebas Neue', cursive;
}
.info {
  font-family: 'Noto Sans', sans-serif;
  line-height: 2.0;
  font-size: 18px;
  text-align: justify;
}
.wp-block-cover:not(.components-placeholder):not(.is-placeholder).is-style-bottom-wave {
  mask-image: url('data:image/svg+xml;utf8,<svg width="235" height="248" xmlns="http://www.w3.org/2000/svg"><path d="M250 220.092145s-12.873712-8.581631-26.547345-11.208661c-13.673633-2.62703-19.948005-2.014057-25.847415-1.094596-14.723528 2.276759-29.197081 7.662171-48.145186 21.760565-7.399261 5.341628-19.223078 13.485421-25.122488 15.630829-5.999399 2.145408-13.223677 3.415139-18.873112 2.320543-2.574743-.437838-5.6494355-.612974-12.4487556-3.371355-6.8743126-2.62703-14.6235377-7.049197-19.9230076-10.595688-10.2989701-6.874062-23.6976303-9.501092-33.4966504-9.807579C17.9982002 222.806743 0 237.080273 0 237.080273V0h250z"/></svg>');
  mask-position: bottom;
  mask-repeat: no-repeat;
  mask-size: cover;
}
.fixed {
  display: inline;
  position: fixed;
  right: 15px;
  bottom: 15px;
  z-index: 99999;
}
</style>
