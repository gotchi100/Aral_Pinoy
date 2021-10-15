<template>
  <b-navbar class="navbar">
    <b-navbar-brand>
      <img :src="logo" style="margin-left: 25px; width: 55px; height: 32px">
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
    </b-collapse>
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
</style>
