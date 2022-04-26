<template>
  <b-modal
    v-model="modal"
    hide-footer
    :hide-header-close="isDonating"
    :no-close-on-backdrop="isDonating"
    @hide="$emit('close')"
  >
    <b-overlay
      :show="isDonating"
      rounded="sm"
    >
      <b-container fluid>
        <b-row>
          <b-col cols="12">
            <h2 style="font-family:'Bebas Neue', cursive; color: black; text-align: left;">
              Payment Information
            </h2>
          </b-col>
        </b-row>

        <b-row class="mb-2">
          <b-col cols="12">
            <b-form-checkbox v-model="isAnonymousDonation">
              &nbsp;Donate Anonymously?
            </b-form-checkbox>
          </b-col>
        </b-row>

        <template v-if="!isAnonymousDonation">
          <b-row>
            <b-col
              cols="12"
              class="mb-2"
            >
              <label for="donation-form-firstname">
                First Name
              </label>

              <b-form-input
                id="donation-form-firstname"
                v-model="person.firstName"
              />
            </b-col>

            <b-col
              cols="12"
              class="mb-2"
            >
              <label for="donation-form-lastname">
                Last Name
              </label>

              <b-form-input
                id="donation-form-lastname"
                v-model="person.lastName"
              />
            </b-col>

            <b-col
              cols="12"
              class="mb-2"
            >
              <label for="donation-form-lastname">
                Contact Email
              </label>

              <b-form-input
                id="donation-form-lastname"
                v-model="person.contact.email"
              />
            </b-col>

            <b-col
              cols="12"
              class="mb-2"
            >
              <label for="donation-form-lastname">
                Contact Phone
              </label>

              <b-form-input
                id="donation-form-lastname"
                v-model="person.contact.phone"
              />
            </b-col>
          </b-row>
        </template>

        <b-row class="mb-4">
          <b-col cols="12">
            <label for="donation-form-amount">
              Amount
            </label>

            <b-form-input
              id="donation-form-amount"
              v-model="amount"
              type="number"
              :formatter="formatAmount"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <b-button
              pill
              variant="success"
              style="width: 100%; font-family: 'Noto Sans', cursive; text-transform: uppercase;"
              @click="donate"
            >
              Donate
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-overlay>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import { uid } from 'uid'
import PaymayaSdkClient from 'paymaya-js-sdk'

import { apiClient } from '../axios'

import config from '../../config'

export default {
  name: 'DonationModal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      modal: false,
      isAnonymousDonation: false,
      isDonating: false,
      person: {
        firstName: '',
        lastName: '',
        contact: {
          phone: '',
          email: ''
        }
      },
      amount: 100
    }
  },
  computed: {
    ...mapGetters(['user']),
    userId () {
      if (this.user === null) {
        return
      }

      return this.user._id
    }
  },
  watch: {
    show (val) {
      this.modal = val
    }
  },
  created () {
    if (this.user !== null) {
      this.person.contact.email = this.user.email
      this.person.firstName = this.user.firstName
      this.person.lastName = this.user.lastName

      if (this.user.contactNumber !== undefined) {
        this.person.contact.phone = this.user.contactNumber
      }
    }
  },
  methods: {
    async donate () {
      this.isDonating = true

      const requestReferenceNumber = `APV-${uid(32).toUpperCase()}`

      try {
        await this.createMonetaryDonation(requestReferenceNumber)
        await this.createCheckout(requestReferenceNumber)
      } catch (error) {
        console.error(error)

        this.isDonating = false
      }
    },
    async createMonetaryDonation (requestReferenceNumber) {
      let userId
      let metadata

      if (!this.isAnonymousDonation) {
        userId = this.userId

        metadata = {
          contactDetails: {}
        }

        if (this.person.firstName !== '') {
          metadata.contactDetails.firstName = this.person.firstName
        }

        if (this.person.lastName !== '') {
          metadata.contactDetails.lastName = this.person.lastName
        }

        if (this.person.contact.phone !== '') {
          metadata.contactDetails.phone = this.person.contact.phone
        }

        if (this.person.contact.email !== '') {
          metadata.contactDetails.email = this.person.contact.email
        }
      }

      await apiClient.post('monetary-donations', {
        userId,
        amount: this.amount,
        referenceNumber: requestReferenceNumber,
        metadata
      })
    },
    async createCheckout (requestReferenceNumber) {
      const totalAmount = {
        value: this.amount,
        currency: 'PHP'
      }

      let buyer

      if (!this.isAnonymousDonation) {
        buyer = {
          firstName: this.person.firstName,
          lastName: this.person.lastName,
          contact: {
            phone: undefined,
            email: undefined
          }
        }

        if (this.person.contact.phone !== '') {
          buyer.contact.phone = this.person.contact.phone
        }

        if (this.person.contact.email !== '') {
          buyer.contact.email = this.person.contact.email
        }
      }

      const items = [{
        name: 'Aral Pinoy',
        code: requestReferenceNumber,
        totalAmount: {
          value: this.amount
        }
      }]

      const metadata = {
      }

      if (this.userId !== undefined) {
        metadata.aralPinoy = {
          userId: this.userId
        }
      }

      const apiBaseUrl = new URL(config.api.baseUrl).toString()
      const path = `monetary-donations/${requestReferenceNumber}/redirectUri`

      const url = apiBaseUrl + path + '?'

      await PaymayaSdkClient.createCheckout({
        totalAmount,
        buyer,
        items,
        redirectUrl: {
          success: `${url}&status=SUCCESS`,
          failure: `${url}&status=FAILED`,
          cancel: `${url}&status=CANCELED`
        },
        requestReferenceNumber,
        metadata
      })
    },
    formatAmount (value) {
      const parsedValue = parseFloat(value)

      if (isNaN(parsedValue)) {
        return 1
      }

      if (parsedValue < 1) {
        return 1
      }

      return Number(parsedValue.toFixed(2))
    }
  }
}
</script>
