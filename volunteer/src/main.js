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
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import EventsPage from './pages/Events'
import ProfilePage from './pages/Profile'
import CalendarPage from './pages/EventCalendar'
import EventDetailsPage from './pages/EventPage'
import trial from './trial/Profile2.vue'

import vuexStore from './store'

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

const routes = [
  { path: '/', component: EventDetailsPage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/events', component: EventsPage },
  { path: '/profile', component: ProfilePage },
  { path: '/home', component: HomePage },
  { path: '/calendar', component: CalendarPage },
  { path: '/trial', component: trial }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLoggedIn) {
      next({ path: '/login' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    if ((to.path === '/login' || to.path === '/register') && store.getters.isLoggedIn) {
      next({ path: '/' })
    } else {
      next() // does not require auth, make sure to always call next()!
    }
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
