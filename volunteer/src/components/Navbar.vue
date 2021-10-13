<template>
  <b-navbar class="navbar">
    <b-navbar-brand to="/">
      <img :src="logo" style="margin-left: 25px; width: 55px; height: 32px">
    </b-navbar-brand>

    <b-navbar-nav>
      <b-nav-item style="margin-left: 18px;" class="events">Events</b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav>
      <b-nav-item style="margin-left: 18px;" class="about">About Us</b-nav-item>
    </b-navbar-nav>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
    </b-collapse>

    <b-navbar-nav class="ml-auto">
      <b-navbar-nav right>
        <b-nav-item to="login" style="margin-right: 8px;" class="login">Login</b-nav-item>
        <b-nav-item to="register" style="margin-right: 10px;" class="register">Register</b-nav-item>
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
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
.navbar{
  background-color: #b6b6b6;
}
.events, .about, .login, .register {
  color: black;
  font-family: 'Bebas Neue', cursive;
  font-size: 18px;
}
</style>
