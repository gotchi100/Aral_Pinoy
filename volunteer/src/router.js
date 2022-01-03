import VueRouter from 'vue-router'

import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import ProfilePage from './pages/Profile'
import CalendarPage from './pages/EventCalendar'
import ForgotPassword from './pages/ForgotPassword.vue'
import ResetPassword from './pages/ResetPassword.vue'
import GoogleSignInCallbackPage from './pages/GoogleSignIn'
import EvaluationPage from './pages/Evaluation.vue'
import PrivacyPolicyPage from './pages/PrivacyPolicy.vue'
import TermsConditionPage from './pages/TermsCondition.vue'

// /events
import EventList from './pages/events/EventList'

const routes = [
  { name: 'Home', path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/google-sign-in', component: GoogleSignInCallbackPage },
  { path: '/register', component: RegisterPage },
  { path: '/profile', component: ProfilePage },
  { path: '/calendar', component: CalendarPage },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/reset-password', component: ResetPassword },
  { path: '/evaluation', component: EvaluationPage },
  { path: '/privacy-policy', component: PrivacyPolicyPage },
  { path: '/terms-and-conditions', component: TermsConditionPage },

  { name: 'Events', path: '/events', component: EventList }
]

const router = new VueRouter({
  routes
})

const publicPaths = ['/login', '/register', '/google-sign-in', '/forgot-password', '/reset-password']

export default function initRouter (store) {
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
      if (publicPaths.includes(to.path) && store.getters.isLoggedIn) {
        next({ path: '/' })
      } else {
        next() // does not require auth, make sure to always call next()!
      }
    }
  })

  return router
}
