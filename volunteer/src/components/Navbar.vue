<template>
  <b-navbar class="navbar">
    <b-navbar-brand to="/">
      <img
        :src="logo"
        style="margin-left: 25px; width: 55px; height: 32px"
      >
    </b-navbar-brand>

    <b-navbar-nav>
      <b-nav-item
        style="margin-left: 18px;"
        class="events"
        v-bind="eventNavigationLink"
      >
        Events
      </b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav>
      <b-nav-item
        style="margin-left: 18px;"
        class="about"
        v-bind="aboutNavigationLink"
      >
        About Us
      </b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav v-if="isLoggedIn">
      <b-nav-item
        style="margin-left: 18px;"
        class="calendar"
        to="/event-calendar"
      >
        Events Calendar
      </b-nav-item>
    </b-navbar-nav>

    <b-collapse
      id="nav-collapse"
      is-nav
    />

    <template v-if="isLoggedIn">
      <b-navbar-nav>
        <b-nav-item-dropdown
          class="user"
          style="margin-right: 70px"
        >
          <template #button-content>
            {{ user.firstName }}
            <span
              v-if="unseenNotificationCount > 0"
              class="position-absolute translate-middle badge rounded-pill bg-danger"
            >
              {{ unseenNotificationCount }}
            </span>
          </template>

          <b-dropdown-item to="/profile">
            Profile
          </b-dropdown-item>

          <b-dropdown-item to="/notifications">
            Notifications
            <span
              v-if="unseenNotificationCount !== 0"
              class="position-absolute translate-middle badge rounded-pill bg-danger"
            >
              {{ unseenNotificationCountString }}
            </span>
          </b-dropdown-item>

          <b-dropdown-item @click="logout">
            Logout
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </template>

    <template v-else>
      <b-navbar-nav
        class="ml-auto"
      >
        <b-navbar-nav right>
          <b-nav-item
            to="/login"
            style="margin-right: 8px;"
            class="login"
          >
            Login
          </b-nav-item>
          <b-nav-item
            to="/register"
            style="margin-right: 10px;"
            class="register"
          >
            Register
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'

import NotificationRepository from '../repositories/notifications'
import { apiClient } from '../axios'

const notificationRepository = new NotificationRepository(apiClient)

const logo = require('../assets/aralpinoy.png')

export default {
  name: 'Navbar',
  data () {
    return {
      logo,
      unseenNotificationCount: 0
    }
  },
  computed: {
    ...mapGetters(['user', 'token', 'isLoggedIn']),
    eventNavigationLink () {
      if (this.$route.name !== 'Home') {
        return {
          to: '/?scroll=events'
        }
      }

      return {
        href: '#events'
      }
    },
    aboutNavigationLink () {
      if (this.$route.name !== 'Home') {
        return {
          to: '/?scroll=about'
        }
      }

      return {
        href: '#about'
      }
    },
    unseenNotificationCountString () {
      if (this.unseenNotificationCount > 99) {
        return '99+'
      }

      return this.unseenNotificationCount
    }
  },
  async created () {
    notificationRepository.setAuthorizationHeader(`Bearer ${this.token}`)

    await this.getUnseenNotificationCount()
  },
  methods: {
    async getUnseenNotificationCount () {
      const count = await notificationRepository.countUnseen({
        userId: this.user._id
      })

      this.unseenNotificationCount = count
    },
    logout () {
      this.$store.dispatch('logout')

      this.$router.push({
        path: '/login'
      })
    }
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
.navbar{
  background-color: #b6b6b6;
}
.events, .about, .login, .register, .calendar, .user {
  color: black;
  font-family: 'Bebas Neue', cursive;
  font-size: 18px;
}
</style>
