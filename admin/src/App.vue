<template>
  <div id="app">

    <AdminNavbar v-if="$route.path !== '/login'" />
    <Navbar v-else />

    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import AdminNavbar from './components/AdminNavbar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    AdminNavbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
