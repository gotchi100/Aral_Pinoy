<template>
  <b-navbar class="navbar">
    <b-navbar-brand to="/dashboard">
      <img :src="logo" style="margin-left: 25px; width: 55px; height: 32px">
    </b-navbar-brand>

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
        <b-nav-item-dropdown style="margin-left: 18px; color: black;" class="donations" text="Donations">
            <b-dropdown-item to="/inkind-list">In-Kind</b-dropdown-item>
            <b-dropdown-item href="#">Monetary</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
      <b-navbar-nav right>
        <b-nav-item-dropdown style="margin-left: 18px; color: black;" class="reports" text="Reports">
            <b-dropdown-item to="/inkind-report">In-Kind Donations</b-dropdown-item>
            <b-dropdown-item to="/monetary-report">Monetary Donations</b-dropdown-item>
            <b-dropdown-item to="/event-eval-report">Event Evaluation</b-dropdown-item>
            <b-dropdown-item to="/volunteer-report">Volunteer</b-dropdown-item>
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
            <b-dropdown-item href="#">Edit Homepage</b-dropdown-item>
            <b-dropdown-item href="#">Edit Dashboard</b-dropdown-item>
            <b-dropdown-item to="/skills">Edit Skills</b-dropdown-item>
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
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
