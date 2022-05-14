'use strict'

const {
  VUE_APP_API_BASE_URL,
  VUE_APP_GOOGLE_OAUTH_API_REDIRECT_URI,
  VUE_APP_GOOGLE_MAPS_API_KEY
} = process.env

const config = {
  api: {
    baseUrl: VUE_APP_API_BASE_URL
  },
  google: {
    oauth: {
      apiRedirectUri: VUE_APP_GOOGLE_OAUTH_API_REDIRECT_URI
    },
    maps: {
      apiKey: VUE_APP_GOOGLE_MAPS_API_KEY
    }
  }
}

module.exports = config
