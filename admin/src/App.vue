<template>
  <div id="app">
    <Navbar />
    <img alt="Vue logo" src="./assets/logo.png">
    <Content msg="Admin Title"/>
  </div>
</template>

<script>
import Content from './components/Content.vue'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Content,
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
