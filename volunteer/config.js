'use strict'

const {
  VUE_APP_API_BASE_URL,
  VUE_APP_GOOGLE_OAUTH_API_REDIRECT_URI
} = process.env

const config = {
  api: {
    baseUrl: VUE_APP_API_BASE_URL
  },
  google: {
    oauth: {
      apiRedirectUri: VUE_APP_GOOGLE_OAUTH_API_REDIRECT_URI
    }
  }
}

module.exports = config
