<template>
  <div>
    <div class="bg">
    <div class="image">
        <img :src="logo" style="width: 450px; height: 250px">
    </div>
    </div>
    <div class="featured">
      <b-container>
        <p>Featured</p>
        <b-carousel
          id="carousel-1"
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
      <p class="mt-4">
      Slide #: {{ slide }}<br>
      Sliding: {{ sliding }}
      </p>
      </b-container>
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
        </b-card-group>
        <p class="more">
          View More Events
          <b-icon icon="chevron-right"></b-icon>
        </p>
      </b-container>
    </div>
    <div class="about">
      <b-container class="bv-example-row">
        <p>About Us</p>
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
      <Footer />
    </div>
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
      value: 75
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
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
.featured p {
font-size: 50px;
text-align: left;
padding-top: 18px;
}
.events {
background: #04AC6B;
height: 1200px;
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
</style>
