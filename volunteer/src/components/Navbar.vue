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

    <b-navbar-nav v-if="$store.getters.isLoggedIn">
      <b-nav-item
        style="margin-left: 18px;"
        class="calendar"
        to="/event-calendar"
      >
        Events Calendar
      </b-nav-item>
    </b-navbar-nav>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse
      id="nav-collapse"
      is-nav
    />

    <b-navbar-nav
      v-if="!$store.getters.isLoggedIn"
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

    <b-navbar-nav
      v-else
      class="ml-auto"
    >
      <b-navbar-nav right>
        <b-nav-item-dropdown
          style="margin-right: 40px; color: black;"
          class="user"
          :text="$store.state.user.firstName"
        >
          <b-dropdown-item to="/profile">
            Profile
          </b-dropdown-item>
          <b-dropdown-item @click="logout">
            Logout
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
const logo = require('../assets/aralpinoy.png')

export default {
  name: 'Navbar',
  data () {
    return {
      logo
    }
  },
  computed: {
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
    }
  },
  methods: {
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
