<template>
  <footer id="footer">
    <div class="container">
      <b-container>
        <b-row>
          <b-col>
            <p>
              Connect with Us&nbsp;&nbsp;
              <b-icon
                :icon="isAboutTextEditable3 ? 'file-check' : 'pencil'"
                font-scale="0.75"
                @click="showModal = !showModal"
              />
            </p>
            <Icon
              icon="logos:google-gmail"
              height="32"
              style="margin: 20px;"
            />
            <Icon
              icon="fa-brands:facebook"
              color="#1877f2"
              height="40"
              style="margin: 20px;"
            />
            <Icon
              icon="logos:twitter"
              color="#1877f2"
              height="35"
              style="margin: 20px;"
            />
          </b-col>
          <b-col>
            <p>
              Location&nbsp;&nbsp;
              <b-icon
                :icon="isAboutTextEditable ? 'file-check' : 'pencil'"
                font-scale="0.75"
                @click="isAboutTextEditable = !isAboutTextEditable"
              />
            </p>
            <div class="info">
              <div
                v-if="!isAboutTextEditable"
                style="white-space: pre"
              >
                {{ aboutText }}
              </div>
              <b-form-textarea
                v-else
                v-model="aboutText"
                rows="7"
                max-rows="7"
              />
            </div>
          </b-col>
          <b-col>
            <p>
              Donate&nbsp;&nbsp;
              <b-icon
                :icon="isAboutTextEditable2 ? 'file-check' : 'pencil'"
                font-scale="0.75"
                @click="isAboutTextEditable2 = !isAboutTextEditable2"
              />
            </p>
            <div class="info">
              <div
                v-if="!isAboutTextEditable2"
                style="white-space: pre"
              >
                {{ aboutText2 }}
              </div>
              <b-form-textarea
                v-else
                v-model="aboutText2"
                rows="7"
                max-rows="7"
              />
            </div>
          </b-col>
        </b-row>
      </b-container>
      <b-modal
        v-model="showModal"
        size="xl"
      >
        <b-card
          class="card"
          style="display: inline-block; height: 100%; overflow: auto; width: 100%; border-radius: 20px; margin-top: 40px;"
        >
          <b-container fluid>
            <h1 style="font-family:'Bebas Neue', cursive;">
              Edit Contact Details
            </h1>
            <b-row class="my-1">
              <label
                class="skill"
                for="input-small"
              >Gmail Address:</label>
              <b-col>
                <b-form-input v-model="skill" />
              </b-col>
            </b-row>
            <b-row class="my-1">
              <label
                class="description"
                for="input-small"
              >Facebook Profile Link:</label>
              <b-col>
                <b-form-input v-model="description" />
              </b-col>
            </b-row>
            <b-row class="my-1">
              <label
                class="description"
                for="input-small"
              >Twitter Profile Link:</label>
              <b-col>
                <b-form-input v-model="description" />
              </b-col>
            </b-row>
          </b-container>
        </b-card>
      </b-modal>
    </div>
  </footer>
</template>

<script>
import { Icon } from '@iconify/vue2'

export default {
  name: 'Footer',
  components: {
    Icon
  },
  data () {
    return {
      showModal: false,
      isAboutTextEditable: false,
      isAboutTextEditable2: false,
      isAboutTextEditable3: false,
      aboutText: '2339 Taft Ave\n' +
      'Malate, Manila, 1004\n' +
      'Metro Manila',
      aboutText2: 'Bank of the Philippine Islands: ARAL PINOY ORG INC.\n' +
      'PAYMAYA: ARAL PINOY ORG INC.\n' +
      'GCASH: ARAL PINOY ORG INC.'
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
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

#footer {
background: black;
background-size: cover;
color: #fff;
font-size: 14px;
text-align: center;
padding: 45px 0;
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
font-size: 25px;
padding: 0;
margin: 0 0 40px 0;
color: white;
font-family: 'Bebas Neue', cursive;
}
.donation {
font-family: 'Bebas Neue', cursive;
font-size: 24px;
text-align: right;
line-height: 1.5;
}
.info {
  font-family: 'Bebas Neue', cursive;
  line-height: 2.0;
  font-size: 18px;
  text-align: justify;
}
</style>
