<template>
  <b-container
    class="mt-2"
    fluid
    style="height: 92vh"
  >
    <b-row>
      <b-col cols="12">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=aralpinoycapstone%40gmail.com&ctz=Asia%2FManila"
          style="border: 0; height: 92vh"
          width="100%"
          frameborder="0"
          scrolling="no"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Calendar',
  data () {
    return {}
  }
}
</script>

<style scoped>
html, body {
  height: 100%
}
</style>
