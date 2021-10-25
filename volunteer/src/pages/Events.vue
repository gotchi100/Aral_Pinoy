<template>
    <div>
    <div class="wp-block-cover alignfull has-background-dim-40 has-background-dim is-style-bottom-wave">
      <div class="bg">
      <div class="wp-block-cover__inner-container">
          <div class="image">
            <img :src="logo" style="width: 420px; height: 240px">
          </div>
        </div>
      </div>
    </div>
    <div class="events">
      <b-container>
        <p class="text">
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
      </b-container>
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
import Footer from '../components/Footer.vue'
const logo = require('../assets/aralpinoywords.png')

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
.events {
background: white;
}
.text {
color: black;
font-family: 'Bebas Neue', cursive;
font-size: 50px;
text-align: left;
padding-top: 18px;
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
