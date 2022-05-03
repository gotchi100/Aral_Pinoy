let localStorageUser = window.localStorage.getItem('user')
let localStorageToken = window.localStorage.getItem('token')

if (localStorageUser && localStorageUser !== 'null') {
  localStorageUser = JSON.parse(localStorageUser)
}

if (localStorageToken && localStorageToken === 'null') {
  localStorageToken = null
}

export default {
  state: {
    user: localStorageUser || null,
    token: localStorageToken || null,
    unseenNotificationsCount: 0
  },
  mutations: {
    setUser (state, userDetails) {
      state.user = userDetails
      window.localStorage.setItem('user', JSON.stringify(userDetails))
    },
    setToken (state, token) {
      state.token = token

      window.localStorage.setItem('token', token)
    },
    setUnseenNotificationsCount (state, unseenNotificationsCount) {
      state.unseenNotificationsCount = unseenNotificationsCount
    }
  },
  actions: {
    login (context, payload) {
      context.commit('setUser', payload.user)
      context.commit('setToken', payload.token)
    },
    logout (context) {
      context.commit('setUser', null)
      context.commit('setToken', null)
    },
    decreaseUnseenNotificationsCount (context) {
      context.commit('setUnseenNotificationsCount', context.state.unseenNotificationsCount - 1)
    },
    setUnseenNotificationsCount (context, count) {
      context.commit('setUnseenNotificationsCount', count)
    }
  },
  getters: {
    user: (state) => {
      return state.user
    },
    isLoggedIn: (state) => {
      return state.token !== null
    },
    token: (state) => {
      return state.token
    },
    unseenNotificationsCount: (state) => {
      return state.unseenNotificationsCount
    }
  }
}
