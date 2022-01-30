<template>
  <div style="background-color: white">
    <div class="wp-block-cover alignfull has-background-dim-40 has-background-dim is-style-bottom-wave">
      <div class="bg">
      <div class="wp-block-cover__inner-container">
          <div class="image">
            <img :src="logo" style="width: 420px; height: 240px">
          </div>
        </div>
      </div>
    </div>
    <div class="featured mb-5">
      <b-container>
        <p>Featured&nbsp;&nbsp;
          <b-icon
            @click="showModal = !showModal"
            :icon="isAboutTextEditable2 ? 'file-check' : 'pencil'"
            font-scale="0.75"
          ></b-icon>
        </p>

        <b-carousel
          class="mb-5"
          v-model="slide"
          :interval="10000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide
            v-for="(carousel, index) in carouselImages"
            :key="index"
            :img-src="carousel.image"
          />
        </b-carousel>

        <b-row class="text-start">
          <b-col class="mb-3" cols="12">
            <b-skeleton v-if="sliding" type="input" />

            <h3 v-else style="font-family:'Bebas Neue', cursive;">
              {{ carouselImages[slide].title }}
            </h3>
          </b-col>

          <b-col cols="12">
            <b-skeleton v-if="sliding" type="input" />

            <h5 v-else>
              {{ carouselImages[slide].caption }}
            </h5>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="wp-block-cover alignfull has-background-dim-40 has-background-dim is-style-bottom-wave">
    <div class="events">
      <b-container>
        <p class="text" id="events">
          Events
        </p>
        <b-card-group columns>
           <b-row>
            <b-col>
              <b-card
          title="Card Title"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 24rem;"
          class="mb-2"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's.
          </b-card-text>
           <b-icon icon="geo-alt"></b-icon><br>
           <b-icon icon="calendar"></b-icon><br>
           <b-icon icon="clock"></b-icon><br>
          <b-progress :value="value" class="mb-3"></b-progress>
          <b-progress :value="value" class="mb-3"></b-progress>
          </b-card>
            </b-col>
            <b-col>
          <b-card
          title="Card Title"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 24rem;"
          class="mb-2"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>
          <b-icon icon="geo-alt"></b-icon><br>
           <b-icon icon="calendar"></b-icon><br>
           <b-icon icon="clock"></b-icon><br>
          <b-progress :value="value" class="mb-3"></b-progress>
          <b-progress :value="value" class="mb-3"></b-progress>
          </b-card>
            </b-col>
            <b-col>
          <b-card
          title="Card Title"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 24rem;"
          class="mb-2"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>
          <b-icon icon="geo-alt"></b-icon><br>
           <b-icon icon="calendar"></b-icon><br>
           <b-icon icon="clock"></b-icon><br>
          <b-progress :value="value" class="mb-3"></b-progress>
          <b-progress :value="value" class="mb-3"></b-progress>
          </b-card>
            </b-col>
           </b-row>
        </b-card-group><br>
         <b-card-group columns>
           <b-row>
            <b-col>
              <b-card
          title="Card Title"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 24rem;"
          class="mb-2"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>
          <b-icon icon="geo-alt"></b-icon><br>
           <b-icon icon="calendar"></b-icon><br>
           <b-icon icon="clock"></b-icon><br>
          <b-progress :value="value" class="mb-3"></b-progress>
          <b-progress :value="value" class="mb-3"></b-progress>
          </b-card>
            </b-col>
            <b-col>
          <b-card
          title="Card Title"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 24rem;"
          class="mb-2"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>
          <b-icon icon="geo-alt"></b-icon><br>
           <b-icon icon="calendar"></b-icon><br>
           <b-icon icon="clock"></b-icon><br>
          <b-progress :value="value" class="mb-3"></b-progress>
          <b-progress :value="value" class="mb-3"></b-progress>
          </b-card>
            </b-col>
            <b-col>
          <b-card
          title="Card Title"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 24rem;"
          class="mb-2"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>
          <b-icon icon="geo-alt"></b-icon><br>
           <b-icon icon="calendar"></b-icon><br>
           <b-icon icon="clock"></b-icon><br>
          <b-progress :value="value" class="mb-3"></b-progress>
          <b-progress :value="value" class="mb-3"></b-progress>
          </b-card>
            </b-col>
           </b-row>
        </b-card-group>
        <p class="more"> <b-link to="/events">
          View More Events</b-link>
          <b-icon icon="chevron-right"></b-icon>
        </p>
      </b-container>
      </div>
    </div>
    <div class="about">
      <b-container class="bv-example-row">
        <p id="about">
          <span>About Us</span>&nbsp;
          <b-icon
            @click="isAboutTextEditable = !isAboutTextEditable"
            :icon="isAboutTextEditable ? 'file-check' : 'pencil'"
            font-scale="0.75"
          ></b-icon>
        </p>
        <b-row>
          <b-col>
            <div class="info">
              <div v-if="!isAboutTextEditable" style="white-space: pre">
                {{ aboutText }}
              </div>
              <b-form-textarea
                v-else
                v-model="aboutText"
                rows="7"
                max-rows="7"
              ></b-form-textarea>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <b-modal v-model="showModal" size="xl">
        <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 100%; border-radius: 20px; margin-top: 40px;">
          <b-container fluid>
              <h1 style="font-family:'Bebas Neue', cursive;">
                  Select events to be featured
              </h1>
            <b-form-group label="Events:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                <b-form-tags id="tags-with-dropdown" v-model="values" no-outer-focus class="mb-2" style="text-align:center;">
                  <template v-slot="{ tags, disabled, addTag, removeTag }" style="display: inline-block; height: 100%; overflow: auto;">
                    <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                      <li v-for="tag in tags" :key="tag" class="list-inline-item">
                        <b-form-tag
                          @remove="removeTag(tag)"
                          :title="tag"
                          :disabled="disabled"
                          variant="info"
                        >{{ tag }}</b-form-tag>
                      </li>
                    </ul>

                    <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100">
                      <template #button-content>
                        <b-icon icon="tag-fill"></b-icon> Events Provided
                      </template>
                      <b-dropdown-form @submit.stop.prevent="() => {}">
                        <b-form-group
                          label="Search Events"
                          label-for="tag-search-input"
                          label-cols-md="auto"
                          class="mb-0"
                          label-size="sm"
                          :description="searchDesc"
                          :disabled="disabled"
                        >
                          <b-form-input
                            v-model="search"
                            id="tag-search-input"
                            type="search"
                            size="sm"
                            autocomplete="off"
                            ></b-form-input>
                        </b-form-group>
                      </b-dropdown-form>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item-button
                        v-for="options in availableOptions"
                        :key="options"
                        @click="onOptionClick({ options, addTag })"
                      >
                        {{ options }}
                      </b-dropdown-item-button>
                      <b-dropdown-text v-if="availableOptions.length === 0">
                        There are no tags available to select
                      </b-dropdown-text>
                    </b-dropdown>
                  </template>
                </b-form-tags>
            </b-form-group>
          </b-container>
        </b-card>
      </b-modal>
      <br>
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from '../components/AdminFooter.vue'
const logo = require('../assets/aralpinoywords.png')

export default {
  components: {
    Footer
  },
  data () {
    return {
      logo,
      slide: 0,
      carouselImages: [{
        title: 'Journey of Hope - The Power of Service of Kuya Mon at Dasma 3',
        caption: 'Last March 1, 2021 Aral Pinoy held an event at Dasma 3 Covered Court Barangay Salawag Dasmarinas City Cavite. We were able to help Titser Fe and Kuya Mon with tutoring the kids with basic education and played with them.',
        image: 'https://i.imgur.com/wVUhXzJ.png'
      }, {
        title: 'One Million Trees and Beyond',
        caption: 'Aral Pinoy held an event last August 17, 2021 at Pililla Rizal. We reached our goal of Php 7,000 and we were able to buy 200 Guyabano seeds that were successfully planted! Thank you for the support!',
        image: 'https://i.imgur.com/WOg20eg.jpg'
      }, {
        title: 'Call for Donation Drive',
        caption: 'Last December 24, Aral Pinoy went to Brgy. Siargao and distributed Noche Buena packages for the 20 families in the community. Gladly we were able to reach our target amount! Our thanks goes to the people who donated!',
        image: 'https://i.imgur.com/wsqdtqH.jpg'
      }],
      sliding: null,
      value: 75,
      isAboutTextEditable: false,
      isAboutTextEditable2: false,
      showModal: false,
      aboutText: 'Founded in August 11, 2010 by the organization’s founder and president, ' +
      'Antonio Levy S. Ingles, Jr., PhD, an educator for 30 years\nand is currently a ' +
      'full-time faculty member in the De La Salle-College of Saint Benilde, City of Manila, Philippines.\n\n' +
      'SUPPORT AND HELP THE PROGRAMS, PROJECTS AND ACTIVITIES OF ARALPINOY.ORG INC, A NON-STOCK, NON-PROFIT ' +
      'AND NON-PARTISAN ORGANIZATION\nREGISTERED UNDER THE LAWS OF THE RP ON AUGUST 11, 2010 WITH ' +
      'SEC CRN CN201012580 AND BIR TIN 007-842-097. FOR ANY HELP, PLEASE NOTIFY US AT \nINGLES.ANTONIO@GMAIL.COM OR ' +
      '09178661006.\n\nMARAMING SALAMAT PO!',
      options: ['Batangas Coastal Cleanup', 'Rizal Community Outreach', 'Adventuro Batangas'],
      search: '',
      values: []
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    onOptionClick ({ options, addTag }) {
      addTag(options)
      this.search = ''
    }
  },
  computed: {
    criteria () {
      // Compute the search criteria
      return this.search.trim().toLowerCase()
    },
    availableOptions () {
      const criteria = this.criteria
      // Filter out already selected options
      const options = this.options.filter(opt => this.values.indexOf(opt) === -1)
      if (criteria) {
        // Show only options that match criteria
        return options.filter(opt => opt.toLowerCase().indexOf(criteria) > -1)
      }
      // Show all options available
      return options
    },
    searchDesc () {
      if (this.criteria && this.availableOptions.length === 0) {
        return 'There are no tags matching your search criteria'
      }
      return ''
    }
  },
  watch: {
    aboutText (val) {
      console.log(val)
    }
  }
}
</script>

<style scoped>
@import '../css/style.css';
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

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
  height: 1425px;
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
</style>
