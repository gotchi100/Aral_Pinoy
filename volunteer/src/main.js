import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuex from 'vuex'
import VModal from 'vue-js-modal'

import App from './App.vue'

import { apiClient } from './axios'
import vuexStore from './store'
import getRouter from './router'

library.add(fas)
library.add(fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VModal)

const store = new Vuex.Store(vuexStore)

const router = getRouter(store)

apiClient.interceptors.response.use((response) => response, function (error) {
  if (error.response?.status === 401) {
    store.dispatch('logout')

    router.push({
      path: '/login?status=401'
    })
  }

  return Promise.reject(error)
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
