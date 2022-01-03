<template>
  <div>
    <div class="py-5">
      <img :src="logo" style="width: 320px; height: 150px">
    </div>

    <b-container>
      <b-row class="justify-content-md-center">
        <b-col cols="12" md="6">
          <b-card class="card" bg-variant="light" style="border-radius: 20px;">
            <b-container fluid>
              <b-alert :show="message.text !== ''" :variant="message.error ? 'danger' : 'success'">
                {{ message.text }}
              </b-alert>

              <validation-observer v-slot="{ invalid }">
                <b-row class="my-1">
                  <b-col cols="12">
                    <validation-provider
                      :rules="{
                        required: true,
                        min: 8,
                        max: 64
                      }"
                      v-slot="validationContext"
                    >
                      <label class="input-password" for="input-password">New Password</label>
                      <b-form-input
                        id="input-password"
                        v-model="password"
                        type="password"
                        :state="getValidationState(validationContext)"
                        aria-describedby="input-password-feedback"
                      ></b-form-input>

                      <b-form-invalid-feedback id="input-password-feedback">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-col>

                  <b-col cols="12">
                    <validation-provider
                      :rules="{
                        required: true,
                        is: password
                      }"
                      v-slot="validationContext"
                    >
                      <label class="input-password" for="input-confirm-password">Confirm Password</label>
                      <b-form-input
                        id="input-confirm-password"
                        v-model="confirmPassword"
                        type="password"
                        :state="getValidationState(validationContext)"
                        aria-describedby="input-confirm-password-feedback"
                      ></b-form-input>

                      <b-form-invalid-feedback v-if="validationContext.errors[0]" id="input-confirm-password-feedback">
                        Passwords do not match!
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-col>
                </b-row>

                <b-button
                  pill
                  variant="danger"
                  style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;"
                  :disabled="invalid || isLoading"
                  @click="resetPassword"
                >
                  <b-spinner v-if="isLoading"></b-spinner>
                  <span v-else>Submit</span>
                </b-button>
              </validation-observer>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, min, max, is } from 'vee-validate/dist/rules'

const { apiClient } = require('../axios')

const logo = require('../assets/aralpinoywords.png')

extend('required', {
  ...required,
  message: 'This field is required'
})
extend('min', {
  ...min,
  message: 'This field must be greater than or equal to {length} characters'
})
extend('max', {
  ...max,
  message: 'This field must be less than or equal to {length} characters'
})
extend('is', is)

export default {
  name: 'ResetPassword',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      logo,
      password: '',
      confirmPassword: '',
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
    async resetPassword () {
      this.isLoading = true

      this.resetMessage()

      const { token } = this.$route.query

      try {
        await apiClient.put(`/forgot-password/${token}`, {
          password: this.password
        })

        this.$router.push({
          path: '/login'
        })
      } catch (error) {
        const message = error.response?.data?.message

        this.message = {
          error: true,
          text: message
        }

        this.isLoading = false
      }
    },
    getValidationState ({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    }
  }
}
</script>

<style scoped>
.input-password {
  padding: 8px;
  text-align: left;
  font-size: 16px;
}
.forgot {
  font-size: 14px;
  padding-top: 10px;
  display: block;
  text-align: right;
}
.signup {
  font-size: 14px;
}
</style>
