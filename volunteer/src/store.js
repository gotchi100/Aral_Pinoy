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
    token: localStorageToken || null
  },
  mutations: {
    setUser (state, userDetails) {
      state.user = userDetails
      window.localStorage.setItem('user', JSON.stringify(userDetails))
    },
    setToken (state, token) {
      state.token = token

      window.localStorage.setItem('token', token)
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
    }
  },
  getters: {
    user: (state) => {
      return state.user
    },
    isLoggedIn: (state) => {
      return state.token !== null
    }
  }
}
