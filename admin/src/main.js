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
import VModal from 'vue-js-modal'

import App from './App.vue'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard.vue'
import InKindReport from './pages/InKindReport.vue'
import MonetaryReport from './pages/MonetaryReport.vue'
import EventEvalReport from './pages/EventEvalReport.vue'
import VolunteerReport from './pages/VolunteerReport.vue'
import AdminProfile from './pages/AdminProfile.vue'
import Events from './pages/AdminEventList.vue'
import EventDetails from './pages/events/EventDetails.vue'
import Volunteers from './pages/AdminVolunteerList.vue'
import OfficersList from './pages/AdminOfficerList.vue'
import InKindList from './pages/AdminInKindList.vue'
import AddUser from './pages/AdminAddUser.vue'
import AdminCreateEvent from './pages/AdminCreateEvent.vue'
import Skills from './pages/AdminSkillsPage.vue'
import AddSkills from './pages/AdminAddSkill.vue'
import ViewVolunteerProfile from './pages/AdminVolunteerViewProfile.vue'
import ViewOfficerProfile from './pages/AdminViewOfficerProfile.vue'
import CategoryList from './pages/AdminCategoryList.vue'
import AddCategory from './pages/AdminAddCategory.vue'
import ForgetPassword from './pages/AdminForgetPassword.vue'
import EditSDG1 from './pages/AdminEditSDG1.vue'
import EditSDG4 from './pages/AdminEditSDG4.vue'
import EditSDG13 from './pages/AdminEditSDG13.vue'
import Homepage from './pages/AdminEditHomepage.vue'
import EventPage from './pages/AdminEventPage.vue'
import Crowdsource from './pages/events/Crowdsource.vue'

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
    path: '/inkind-report',
    component: InKindReport,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/monetary-report',
    component: MonetaryReport,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/event-eval-report',
    component: EventEvalReport,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/volunteer-report',
    component: VolunteerReport,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
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
    path: '/events/:id',
    component: EventDetails,
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
    path: '/inkind-list',
    component: InKindList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-user',
    component: AddUser,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/create-event',
    component: AdminCreateEvent,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/skills',
    component: Skills,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-skills',
    component: AddSkills,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/view-volunteer-profile',
    component: ViewVolunteerProfile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/view-officer-profile',
    component: ViewOfficerProfile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/category-list',
    component: CategoryList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-category',
    component: AddCategory,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/forget-password',
    component: ForgetPassword
  },
  {
    path: '/edit-sdg1',
    component: EditSDG1,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit-sdg4',
    component: EditSDG4,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit-sdg13',
    component: EditSDG13,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/homepage',
    component: Homepage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/event-page',
    component: EventPage
  },
  {
    path: '/crowdsource',
    component: Crowdsource,
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
