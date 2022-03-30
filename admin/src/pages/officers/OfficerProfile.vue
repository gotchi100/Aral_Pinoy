<template>
  <div>
    <div
      class="image"
      style="padding: 28px;"
    >
      <img
        :src="logo"
        style="width: 320px; height: 150px"
      >
    </div>

    <b-container fluid>
      <b-row class="justify-content-md-center">
        <b-col cols="8">
          <b-card bg-variant="light">
            <h3 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">
              Officer Profile
            </h3>
            <b-container fluid>
              <b-row class="my-1">
                <label
                  class="name"
                  for="input-small"
                  style="font-family:'Bebas Neue', cursive;"
                >First Name</label>
                <b-col>
                  <b-skeleton
                    v-if="isLoadingUser"
                    type="input"
                  />
                  <b-form-input
                    v-else
                    v-model="user.firstName"
                    disabled
                  />
                </b-col>
              </b-row>
              <b-row class="my-1">
                <label
                  class="name"
                  for="input-small"
                  style="font-family:'Bebas Neue', cursive;"
                >Last Name</label>
                <b-col>
                  <b-skeleton
                    v-if="isLoadingUser"
                    type="input"
                  />
                  <b-form-input
                    v-else
                    v-model="user.lastName"
                    disabled
                  />
                </b-col>
              </b-row>
              <b-row class="my-1">
                <label
                  for="input-small"
                  style="font-family:'Bebas Neue', cursive;"
                >Contact Number</label>
                <b-col>
                  <b-skeleton
                    v-if="isLoadingUser"
                    type="input"
                  />
                  <b-form-input
                    v-else
                    v-model="user.contactNumber"
                    disabled
                  />
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label
                  for="gender"
                  style="font-family:'Bebas Neue', cursive;"
                >Gender</label>
                <b-col>
                  <b-skeleton
                    v-if="isLoadingUser"
                    type="input"
                  />
                  <b-form-input
                    v-else
                    id="gender"
                    v-model="user.gender"
                    disabled
                  />
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label
                  for="birthDate"
                  style="font-family:'Bebas Neue', cursive;"
                >Date of Birth</label>
                <b-col>
                  <b-skeleton
                    v-if="isLoadingUser"
                    type="input"
                  />
                  <b-form-input
                    v-else
                    id="birthDate"
                    :value="birthDate"
                    disabled
                  />
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label
                  for="homeAddress"
                  style="font-family:'Bebas Neue', cursive;"
                >Home Address</label>
                <b-col>
                  <b-skeleton
                    v-if="isLoadingUser"
                    type="input"
                  />
                  <b-form-input
                    v-else
                    id="homeAddress"
                    :value="homeAddress"
                    disabled
                  />
                </b-col>
              </b-row>

              <b-row class="my-1">
                <label
                  class="email"
                  for="input-small"
                  style="font-family:'Bebas Neue', cursive;"
                >Email Address</label>
                <b-col>
                  <b-skeleton
                    v-if="isLoadingUser"
                    type="input"
                  />
                  <b-form-input
                    v-else
                    v-model="user.email"
                    disabled
                  />
                </b-col>
              </b-row>
              <!-- <b-row class="my-1">
                <label class="change" for="input-small" style="font-family:'Bebas Neue', cursive;">Change Password?</label>
              </b-row>
              <b-row class="my-1" v-if="isDisabled">
                <label class="password" for="input-small" style="font-family:'Bebas Neue', cursive;">New Password</label>
                <b-col>
                  <b-form-input v-model="password" :disabled="!isDisabled"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1" v-if="isDisabled">
                <label class="cpassword" for="input-small" style="font-family:'Bebas Neue', cursive;">Confirm Password</label>
                <b-col>
                  <b-form-input v-model="cpassword" :disabled="!isDisabled"></b-form-input>
                </b-col>
              </b-row>
              <b-button pill variant="danger" @click="isDisabled = true" v-show="!isDisabled" style="margin: 8px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
                    Edit
              </b-button>
              <b-button pill variant="danger" @click="isDisabled = false" v-show="isDisabled" style="margin: 8px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
                    Save
              </b-button> -->
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const logo = require('../../assets/aralpinoywords.png')
const { apiClient } = require('../../axios')

export default {
  data () {
    return {
      logo,
      user: null,
      isLoadingUser: true
    }
  },
  computed: {
    ...mapGetters(['token']),
    birthDate () {
      if (this.isLoadingUser) {
        return ''
      }

      if (!this.user.birthDate) {
        return ''
      }

      return new Date(this.user.birthDate).toLocaleString('en-us', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    homeAddress () {
      if (this.isLoadingUser) {
        return ''
      }

      if (!this.user.address || !this.user.address.home) {
        return ''
      }

      return this.user.address.home
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    async getUser () {
      this.isLoadingUser = true

      const { id } = this.$route.params

      try {
        const { data } = await apiClient.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        this.user = data
      } finally {
        this.isLoadingUser = false
      }
    }
  }
}
</script>
