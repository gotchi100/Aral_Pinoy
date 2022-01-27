'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

class EventRepository {
  /**
   *
   * @param {Axios} apiClient
   */
  constructor (apiClient) {
    const { baseURL } = apiClient.defaults

    this.apiClient = axios.create({
      baseURL
    })
  }

  setAuthorizationHeader (value) {
    this.apiClient.defaults.headers.Authorization = value
  }

  async get (id) {
    const { data } = await this.apiClient.get(`/events/${id}`)

    return data
  }
}

module.exports = EventRepository
