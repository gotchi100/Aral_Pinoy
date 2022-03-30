<template>
  <footer id="footer">
    <div class="container">
      <b-container>
        <b-row>
          <b-col>
            <p>
              Connect with Us
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
              Location
            </p>
            <p>
              2339 Taft Ave, <br> Malate, Manila, 1004 <br> Metro Manila
            </p>
          </b-col>

          <b-col>
            <b-button
              variant="warning"
              @click="donationModal = true"
            >
              <span
                class="h3"
                style="font-weight: 900"
              >
                DONATE
              </span>
              <b-row
                class="mt-2"
                align-h="around"
                align-v="center"
              >
                <b-col>
                  <Icon
                    icon="logos:mastercard"
                    height="36"
                  />
                </b-col>
                <b-col>
                  <Icon
                    icon="logos:visa"
                    height="28"
                  />
                </b-col>
                <b-col>
                  <Icon
                    icon="logos:jcb"
                    height="36"
                  />
                </b-col>
              </b-row>
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <DonationModal
      :show="donationModal"
      @close="donationModal = false"
    />

    <b-modal
      v-model="donationStatus.modal"
      size="lg"
      hide-footer
    >
      <b-container>
        <b-row>
          <b-col
            cols="12"
            style="text-align: center"
          >
            <h1
              :style="donationStatus.success ? 'color: green;' : 'color: red'"
            >
              <b-icon
                :icon="donationStatus.success ? 'check-circle' : 'x-circle'"
              />
            </h1>
            <h6>
              Reference ID: {{ donationStatus.referenceNumber }}
            </h6>
          </b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col cols="12">
            <h2 style="text-align: center">
              {{
                donationStatus.success
                  ? 'Thank you for your donation!'
                  : 'It seems there was a problem with your transaction.'
              }}
            </h2>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <h6 style="text-align: center">
              For issues or concerns, please contact us at <a href="">support@aralpinoy.xyz</a>
            </h6>
          </b-col>
        </b-row>

        <b-row
          v-if="donationStatus.success"
          class="mb-3"
        >
          <b-col cols="12">
            <h6 style="text-align: center">
              If you would also like to volunteer to our events, we have redirected you to our page.
            </h6>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </footer>
</template>

<script>
import { Icon } from '@iconify/vue2'

import DonationModal from './DonationModal'

export default {
  name: 'Footer',
  components: {
    Icon,
    DonationModal
  },
  data () {
    return {
      donationModal: false,
      donationStatus: {
        modal: false,
        success: true,
        referenceNumber: ''
      }
    }
  },
  computed: {
    hasDonationStatus () {
      const {
        donationSuccess,
        referenceNumber
      } = this.$route.query

      if (donationSuccess === undefined || donationSuccess === '') {
        return false
      }

      if (referenceNumber === undefined || referenceNumber === '') {
        return false
      }

      return true
    }
  },
  created () {
    if (this.hasDonationStatus) {
      this.showDonationStatusModal()
    }
  },
  methods: {
    async showDonationStatusModal () {
      const {
        donationSuccess,
        referenceNumber
      } = this.$route.query

      this.donationStatus = {
        modal: true,
        success: donationSuccess === 'true',
        referenceNumber
      }

      this.$router.replace({
        path: this.$route.path
      })
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
</style>
