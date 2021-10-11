<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="home">
      <img :src="logo" style="width: 75px; height: 75px">
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
    </b-collapse>

    <b-navbar-nav class="ml-auto">
      <b-navbar-nav>
        <b-nav-item to="login">Login</b-nav-item>
        <b-nav-item to="register">Register</b-nav-item>
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
