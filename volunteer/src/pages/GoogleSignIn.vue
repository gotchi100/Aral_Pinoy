<template>
  <div />
</template>

<script>
export default {
  name: 'GoogleSignIn',
  created () {
    const { user, token } = this.$route.query

    if (!user || !token) {
      this.$router.push({
        path: '/login'
      })
    }

    let parsedUser

    try {
      parsedUser = JSON.parse(atob(user))
    } catch (error) {
      this.$router.push({
        path: '/login'
      })
    }

    this.$store.dispatch('login', {
      user: parsedUser,
      token
    })

    this.$router.push({
      path: '/'
    })
  }
}
</script>
