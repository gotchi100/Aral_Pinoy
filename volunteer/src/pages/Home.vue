<template>
  <div>
    <div class="bg">
    <div class="image">
        <img :src="logo" style="width: 450px; height: 250px">
    </div>
    </div>
    <div class="featured">
      <p>Featured</p>
      <b-container>
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
      </b-container>
      <p class="mt-4">
      Slide #: {{ slide }}<br>
      Sliding: {{ sliding }}
      </p>
    </div>
    <div class="events">
      <b-container>
        <p>
          Events
        </p>
      </b-container>
    </div>
    <div class="about">
      <p>About Us</p>
    </div>
     <footer id="footer">
       <div class="container">
          <p>
        Connect with Us
        </p>
        <Icon icon="logos:google-gmail" height="30"  style="margin-right: 25px;"/>
        <Icon icon="fa-brands:facebook" color="#1877f2" height="35"  style="margin-right: 25px;"/>
        <Icon icon="logos:twitter" color="#1877f2" height="30"  style="margin-right: 25px;"/>
        <p>
        Location
        </p>
        <p>
        Donate
        </p>
       </div>
      </footer>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
const logo = require('../assets/aralpinoywords.png')

export default {
  components: {
    Icon
  },
  name: 'Home',
  data () {
    return {
      logo,
      slide: 0,
      sliding: null
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
  background: #04AC6B;
  height: 500px;
}
.events p {
  color: white;
  font-family: 'Bebas Neue', cursive;
  font-size: 25px;
}
.about {
  height: 500px;
}
#footer {
  background: black;
  background-size: cover;
  color: #fff;
  font-size: 14px;
  text-align: center;
  padding: 2px 0;
  position: relative;
}

#footer::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}

#footer .container {
  position: relative;
}

#footer p {
  font-size: 15;
  padding: 0;
  margin: 0 0 40px 0;
  color: white;
  font-family: 'Bebas Neue', cursive;
  font-size: 25px;
}

p {
  color: black;
  font-family: 'Bebas Neue', cursive;
  font-size: 25px;
}
</style>
