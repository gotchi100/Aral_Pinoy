let localStorageUser = window.localStorage.getItem('user')
const localStorageToken = window.localStorage.getItem('token')

if (localStorageUser) {
  localStorageUser = JSON.parse(localStorageUser)
}

export default {
  state: {
    user: localStorageUser || null,
    token: localStorageToken || null
  },
  mutations: {
    setUser (state, userDetails) {
      state.user = userDetails

      if (userDetails !== null) {
        window.localStorage.setItem('user', JSON.stringify(userDetails))
      } else {
        window.localStorage.removeItem('user')
      }
    },
    setToken (state, token) {
      state.token = token

      if (token !== null) {
        window.localStorage.setItem('token', token)
      } else {
        window.localStorage.removeItem('token')
      }
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
    },
    token: (state) => {
      return state.token
    }
  }
}
