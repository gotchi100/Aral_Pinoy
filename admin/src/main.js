import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuex from 'vuex'

import App from './App.vue'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard.vue'
import InKindReport from './pages/InKindReport.vue'
import MonetaryReport from './pages/MonetaryReport.vue'
import EventEvalReport from './pages/EventEvalReport.vue'
import VolunteerReport from './pages/VolunteerReport.vue'
import AdminProfile from './pages/AdminProfile.vue'
import Events from './pages/AdminEventList.vue'
import Volunteers from './pages/AdminVolunteerList.vue'
import OfficersList from './pages/AdminOfficerList.vue'
import InKindList from './pages/AdminInKindList.vue'
import AddUser from './pages/AdminAddUser.vue'
import AdminCreateEvent from './pages/AdminCreateEvent.vue'

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

const store = new Vuex.Store(vuexStore)

const routes = [
  {
    path: '/',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/inkindreport',
    component: InKindReport,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/monetaryreport',
    component: MonetaryReport,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/eventevalreport',
    component: EventEvalReport,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/volunteerreport',
    component: VolunteerReport,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/adminprofile',
    component: AdminProfile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/events',
    component: Events,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/volunteers',
    component: Volunteers,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/officers',
    component: OfficersList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/inkindlist',
    component: InKindList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/adduser',
    component: AddUser,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/createevent',
    component: AdminCreateEvent,
    meta: {
      requiresAuth: true
    }
  }
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
    if (to.path === '/login' && store.getters.isLoggedIn) {
      next({ path: '/dashboard' })
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
