<template>
    <div>
        <img alt="Vue logo" src="../assets/logo.png">
        <Content/>
    </div>
</template>

<script>

import Content from '../components/Login_Form'

export default ({

  name: 'Login_Page',
  components: {
    Content
  }
})
</script>
