<template>
  <div>
    <b-container class="py-5">
      <b-row class="justify-content-md-center">
        <b-col cols="12" md="6">
          <b-card bg-variant="light" style="border-radius: 20px;">
            <b-container fluid>
              <h1 style="font-family:'Bebas Neue', cursive;">
                  Add Officer
              </h1>

              <b-row class="my-1">
                <label class="lname" for="input-small">Last Name</label>
                <b-col>
                  <b-form-input v-model="lastName"></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label class="fname" for="input-small">First Name</label>
                <b-col>
                  <b-form-input v-model="firstName"></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label class="cnum" for="input-small">Contact Number</label>
                <b-col>
                  <b-form-input v-model="contactNumber"></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label class="email" for="input-small">Email Address</label>
                <b-col>
                  <b-form-input v-model="email"></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label class="password" for="input-small">Password</label>
                <b-col>
                  <b-form-input v-model="password" type="password"></b-form-input>
                </b-col>
              </b-row>

              <b-button @click="showModal = !showModal" pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
                Register Officer
              </b-button>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-modal v-model="showModal" size="xl">
      <b-container fluid>
          <h1 style="font-family:'Bebas Neue', cursive; text-align:center;">
              Are you sure with all the details?
          </h1>
          <b-row>
            <b-col cols="5"></b-col>
            <b-col>
              <b-button @click="register" type="submit" variant="success">Yes</b-button>
              &nbsp;
              <b-button type="reset" variant="danger">No</b-button>
            </b-col>
          </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
const logo = require('../../assets/aralpinoywords.png')
const { apiClient } = require('../../axios')

export default {
  name: 'Register',
  data () {
    return {
      logo,
      firstName: '',
      lastName: '',
      contactNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      showModal: false
    }
  },
  methods: {
    async register () {
      const token = this.$store.getters.token
      await apiClient.post('/users', {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })

      this.$router.push({
        path: '/officers'
      })
    }
  }
}
</script>

<style scoped>
.lname, .fname, .cnum, .email, .password, .cpassword{
  padding: 8px;
  text-align: left;
  font-size: 14px;
}
</style>
