<template>
  <div>
    <div class="py-5">
      <img
        :src="logo"
        style="width: 320px; height: 150px"
      >
    </div>

    <b-container>
      <b-row class="justify-content-md-center">
        <b-col
          cols="12"
          md="4"
        >
          <b-card
            bg-variant="light"
            style="border-radius: 20px;"
          >
            <b-container fluid>
              <b-alert
                :show="!!errorMessage"
                variant="danger"
              >
                {{ errorMessage }}
              </b-alert>

              <b-row class="my-1">
                <label
                  class="email"
                  for="input-small"
                >Email Address</label>
                <b-col cols="12">
                  <b-form-input v-model="email" />
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label
                  class="password"
                  for="input-small"
                >Password</label>
                <b-col cols="12">
                  <b-form-input
                    v-model="password"
                    type="password"
                  />
                </b-col>
              </b-row>

              <b-row class="my-3">
                <b-col cols="12">
                  <label
                    class="signup"
                    for="input-small"
                  >
                    <b-link to="/forgot-password">Forgot Password?</b-link>
                  </label>
                </b-col>
              </b-row>

              <b-row class="my-1 justify-content-md-center">
                <b-col
                  cols="12"
                  md="8"
                >
                  <b-button
                    pill
                    variant="danger"
                    style="font-size: 16px; width: 100%"
                    @click="login"
                  >
                    Login
                  </b-button>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <b-col cols="12">
                  <div class="login-or">
                    <hr class="hr-or">
                    <span class="span-or">or</span>
                  </div>
                </b-col>
              </b-row>

              <b-row class="my-1 justify-content-md-center">
                <b-col
                  cols="12"
                  md="8"
                >
                  <b-button
                    pill
                    variant="danger"
                    style="font-size: 16px; width: 100%"
                    @click="googleSignIn"
                  >
                    <font-awesome-icon
                      style="margin-right: 4px;"
                      :icon="['fab', 'google']"
                    />
                    Sign in with Google
                  </b-button>
                </b-col>
              </b-row>

              <b-row class="mt-3">
                <b-col cols="12">
                  <label
                    class="signup"
                    for="input-small"
                  >
                    Don't have an account? <b-link to="/register">Sign up here</b-link>
                  </label>
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
const config = require('../../config')
const { apiClient } = require('../axios')

const ERROR_MESSAGE_MAP = {
  invalid_user: 'Invalid User Login',
  google_no_family_name: 'Google account sign-in requires a family name',
  google_no_gender: 'Google account sign-in requires your gender to be available to the public',
  google_no_birth_date: 'Google account sign-in requires your birth date to be available to the public'
}

export default {
  name: 'Login',
  data () {
    return {
      logo,
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  computed: {
    status () {
      const status = parseInt(this.$route.query.status, 10)

      if (isNaN(status)) {
        return
      }

      return status
    },
    queryErrorMessage () {
      const errorMessage = ERROR_MESSAGE_MAP[this.$route.query.errorMessage]

      if (errorMessage === undefined) {
        return
      }

      return errorMessage
    }
  },
  created () {
    if (this.status === 401) {
      this.$router.replace({
        path: '/login'
      })

      this.errorMessage = 'Your session has expired. Please login again.'
    }

    if (this.queryErrorMessage !== undefined) {
      this.errorMessage = this.queryErrorMessage
    }
  },
  methods: {
    async login () {
      try {
        const results = await apiClient.post('/login', {
          email: this.email,
          password: this.password
        })

        const { user, token } = results.data

        this.$store.dispatch('login', {
          user,
          token
        })

        this.$router.push({
          path: '/'
        })
      } catch (error) {
        const message = error.response?.data?.message

        this.errorMessage = message
      }
    },
    async googleSignIn () {
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=code&redirect_uri=${config.google.oauth.apiRedirectUri}&client_id=666385844175-d4bc42f0ckfic58dh994f4sq7tmhbejd.apps.googleusercontent.com`
    }
  }
}
</script>

<style scoped>
.login-or {
  position: relative;
  color: #aaa;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.span-or {
  display: block;
  position: absolute;
  left: 50%;
  top: -2px;
  margin-left: -25px;
  background-color: #f8f9fa;
  width: 50px;
  text-align: center;
}
.hr-or {
  height: 1px;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}
.email, .password{
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
