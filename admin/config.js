'use strict'

const {
  VUE_APP_API_BASE_URL
} = process.env

const config = {
  api: {
    baseUrl: VUE_APP_API_BASE_URL
  }
}

module.exports = config
