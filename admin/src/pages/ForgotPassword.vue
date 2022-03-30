<template>
  <div>
    <div class="py-5">
      <img
        :src="logo"
        style="width: 320px; height: 150px"
      >
    </div>

    <b-container class="pb-5">
      <b-row class="justify-content-md-center">
        <b-col
          cols="12"
          md="6"
        >
          <b-card
            bg-variant="light"
            style="border-radius: 20px;"
          >
            <b-container fluid>
              <b-alert
                :show="message.text !== ''"
                :variant="message.error ? 'danger' : 'success'"
              >
                {{ message.text }}
              </b-alert>

              <b-row class="my-1">
                <h4 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">
                  Please enter your email address you'd like your password resent information sent to
                </h4>

                <label
                  class="email"
                  for="input-small"
                >Email Address</label>
                <b-col>
                  <b-form-input
                    v-model="email"
                    placeholder="Ex: juandelacruz@gmail.com"
                  />
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <b-button
                    pill
                    variant="danger"
                    style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;"
                    :disabled="isLoading"
                    @click="requestPasswordReset"
                  >
                    <b-spinner v-if="isLoading" />
                    <span v-else>Send</span>
                  </b-button>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <span style="font-size: 14px">
                    <b-link to="/login">Return to Login</b-link>
                  </span>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
const logo = require('../assets/aralpinoywords.png')
const { apiClient } = require('../axios')

export default {
  name: 'ForgotPassword',
  data () {
    return {
      logo,
      email: '',
      message: {
        error: false,
        text: ''
      },
      isLoading: false
    }
  },
  methods: {
    resetMessage () {
      this.message = {
        error: false,
        text: ''
      }
    },
    async requestPasswordReset () {
      this.isLoading = true

      this.resetMessage()

      try {
        await apiClient.post('/forgot-password', {
          email: this.email,
          origin: 'admin'
        })

        this.email = ''

        this.message = {
          error: false,
          text: 'Password reset has been requested! Please check your inbox or spam folder for our email.'
        }
      } catch (error) {
        const message = error.response?.data?.message

        this.message = {
          error: true,
          text: message
        }
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.email {
  padding: 8px;
  text-align: left;
  font-size: 16px;
}
</style>
