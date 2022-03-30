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
                <b-col>
                  <b-form-input v-model="email" />
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label
                  class="password"
                  for="input-small"
                >Password</label>
                <b-col>
                  <b-form-input
                    v-model="password"
                    type="password"
                  />
                </b-col>
              </b-row>

              <b-row class="py-3">
                <b-col cols="12">
                  <b-button
                    pill
                    variant="danger"
                    style="font-size: 16px; width: 225px;"
                    @click="login"
                  >
                    Login
                  </b-button>
                </b-col>
              </b-row>

              <b-row class="py-3">
                <b-col cols="12">
                  <span style="font-size: 14px">
                    <b-link to="/forgot-password">Forgot Password?</b-link>
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
    }
  },
  created () {
    if (this.status === 401) {
      this.$router.replace({
        path: '/login'
      })
      this.errorMessage = 'Your session has expired. Please login again.'
    }
  },
  methods: {
    async login () {
      try {
        const results = await apiClient.post('/admin/login', {
          email: this.email,
          password: this.password
        })

        const { user, token } = results.data

        this.$store.dispatch('login', {
          user,
          token
        })

        this.$router.push({
          path: '/dashboard'
        })
      } catch (error) {
        const message = error.response?.data?.message

        this.errorMessage = message
      }
    }
  }
}
</script>

<style scoped>
.email, .password{
  padding: 8px;
  text-align: left;
  font-size: 16px;
}
</style>
