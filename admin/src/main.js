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

const routes = [
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/inkindreport', component: InKindReport },
  { path: '/monetaryreport', component: MonetaryReport },
  { path: '/eventevalreport', component: EventEvalReport },
  { path: '/volunteerreport', component: VolunteerReport },
  { path: '/adminprofile', component: AdminProfile },
  { path: '/events', component: Events },
  { path: '/volunteers', component: Volunteers }
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
