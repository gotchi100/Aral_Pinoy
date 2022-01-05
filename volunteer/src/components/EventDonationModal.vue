<template>
  <b-modal
    v-model="modal"
    hide-footer
    :hide-header-close="isDonating"
    :no-close-on-backdrop="isDonating"
    @hide="$emit('close')"
  >
    <b-overlay :show="isDonating" rounded="sm">
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
            <b-col cols="12" class="mb-2">
              <label for="donation-form-firstname">
                First Name
              </label>

              <b-form-input id="donation-form-firstname" v-model="person.firstName" />
            </b-col>

            <b-col cols="12" class="mb-2">
              <label for="donation-form-middlename">
                Middle Name
              </label>

              <b-form-input id="donation-form-middlename" v-model="person.middleName" />
            </b-col>

            <b-col cols="12" class="mb-2">
              <label for="donation-form-lastname">
                Last Name
              </label>

              <b-form-input id="donation-form-lastname" v-model="person.lastName" />
            </b-col>

            <b-col cols="12" class="mb-2">
              <label for="donation-form-lastname">
                Contact Email
              </label>

              <b-form-input id="donation-form-lastname" v-model="person.contact.email" />
            </b-col>

            <b-col cols="12" class="mb-2">
              <label for="donation-form-lastname">
                Contact Phone
              </label>

              <b-form-input id="donation-form-lastname" v-model="person.contact.phone" />
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
              type="number"
              v-model="amount"
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
              @click="createCheckout"
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

// const { apiClient } = require('../../axios')

export default {
  name: 'EventDonationModal',
  props: {
    event: {
      required: true,
      type: Object
    },
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
        middleName: '',
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
    ...mapGetters(['user'])
  },
  created () {
    if (this.user !== null) {
      this.person.contact.email = this.user.email
      this.person.firstName = this.user.firstName
      this.person.middleName = this.user.middleName
      this.person.lastName = this.user.lastName

      if (this.user.contactNumber !== undefined) {
        this.person.contact.phone = this.user.contactNumber
      }
    }
  },
  methods: {
    async createCheckout () {
      this.isDonating = true

      const totalAmount = {
        value: this.amount,
        currency: 'PHP'
      }

      let buyer

      if (!this.isAnonymousDonation) {
        buyer = {
          firstName: this.person.firstName,
          middleName: undefined,
          lastName: this.person.lastName,
          contact: {
            phone: undefined,
            email: undefined
          }
        }

        if (this.person.middleName !== '') {
          buyer.middleName = this.person.middleName
        }

        if (this.person.contact.phone !== '') {
          buyer.contact.phone = this.person.contact.phone
        }

        if (this.person.contact.email !== '') {
          buyer.contact.email = this.person.contact.email
        }
      }

      const event = this.event

      const items = [{
        name: `Aral Pinoy - ${event.name}`,
        code: event._id,
        totalAmount: {
          value: this.amount
        }
      }]

      const requestReferenceNumber = uid(36)

      try {
        await PaymayaSdkClient.createCheckout({
          totalAmount,
          buyer,
          items,
          redirectUrl: {
            success: `http://localhost:8080/#/events/61d30c290a863b7412286466?donationSuccess=true&referenceNumber=${requestReferenceNumber}`,
            failure: `http://localhost:8080/#/events/61d30c290a863b7412286466?donationSuccess=false&referenceNumber=${requestReferenceNumber}`,
            cancel: 'http://localhost:8080/#/events/61d30c290a863b7412286466'
          },
          requestReferenceNumber,
          metadata: {}
        })
      } catch (error) {
        console.error(error)
        this.isDonating = false
      }
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
  },
  watch: {
    show (val) {
      this.modal = val
    }
  }
}
</script>
