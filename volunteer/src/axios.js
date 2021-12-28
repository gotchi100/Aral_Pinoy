'use strict'

const axios = require('axios').default

const config = require('../config')

const apiClient = axios.create({
  baseURL: config.api.baseUrl
})

module.exports = {
  apiClient
}
