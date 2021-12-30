<template>
  <b-navbar class="navbar">
    <b-navbar-brand to="/dashboard">
      <img :src="logo" style="margin-left: 25px; width: 55px; height: 32px">
    </b-navbar-brand>

    <template v-if="isLoggedIn">
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav right>
          <b-nav-item-dropdown style="margin-left: 18px; color: black;" class="events" text="Events">
              <b-dropdown-item to="/events">Event List</b-dropdown-item>
              <b-dropdown-item href="#">Event Calendar</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar-nav>

      <b-navbar-nav>
        <b-nav-item to="/volunteers" style="margin-left: 18px;" class="volunteers">Volunteers</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav>
        <b-nav-item to="/officers" style="margin-left: 18px;" class="officers">Officers</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-navbar-nav right>
          <div>
            <b-nav-item-dropdown id="dropdown-grouped" style="margin-left: 18px; color: black;" class="donations" text="Donations">
              <b-dropdown-group id="dropdown-group-1" header="In-Kind" style="font-family: 'Bebas Neue', cursive; color: black;">
                <b-dropdown-item to="/inkind-donations">In-Kind Inventory</b-dropdown-item>
                <b-dropdown-item to="/inkind-donations/outbound">Donated In-Kind</b-dropdown-item>
              </b-dropdown-group>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-group id="dropdown-group-2" header="Monetary" style="font-family: 'Bebas Neue', cursive; color: black;">
                <b-dropdown-item to="/monetary-donations/monetarylist">Monetary Inventory</b-dropdown-item>
              </b-dropdown-group>
            </b-nav-item-dropdown>
          </div>
        </b-navbar-nav>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-navbar-nav right>
          <b-nav-item-dropdown style="margin-left: 18px; color: black;" class="reports" text="Reports">
              <b-dropdown-item to="/reports/inkind-donations">In-Kind Donations</b-dropdown-item>
              <b-dropdown-item to="/reports/monetary-donations">Monetary Donations</b-dropdown-item>
              <b-dropdown-item to="/reports/events">Event Evaluation</b-dropdown-item>
              <b-dropdown-item to="/reports/volunteers">Volunteer</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
      </b-collapse>

      <b-navbar-nav class="ml-auto">
        <b-navbar-nav right>
          <b-nav-item-dropdown style="margin-right: 40px; color: black;" class="user" :text="$store.state.user.firstName">
              <b-dropdown-item to="/profile">Profile</b-dropdown-item>
              <b-dropdown-item to="/edit-homepage">Edit Homepage</b-dropdown-item>
              <b-dropdown-item to="/skills">Edit Skills</b-dropdown-item>
              <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar-nav>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'

const logo = require('../assets/aralpinoy.png')

export default {
  name: 'Navbar',
  data () {
    return {
      logo
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
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
.events, .volunteers, .officers, .donations, .reports, .user {
  color: black;
  font-family: 'Bebas Neue', cursive;
  font-size: 18px;
}
</style>
