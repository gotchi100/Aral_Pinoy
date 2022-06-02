<template>
  <div />
</template>

<script>
export default {
  name: 'GoogleSignIn',
  created () {
    const { user, token, errorMessage } = this.$route.query

    const routeHistory = {
      path: '/login',
      query: {}
    }

    if (!user || !token) {
      if (errorMessage !== undefined) {
        routeHistory.query.errorMessage = `google_${errorMessage}`
      }

      return this.$router.push(routeHistory)
    }

    let parsedUser

    try {
      parsedUser = JSON.parse(atob(user))
    } catch (error) {
      return this.$router.push({
        path: '/login',
        query: {
          errorMessage: 'invalid_user'
        }
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
