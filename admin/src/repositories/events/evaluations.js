'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

class EventEvaluationRepository {
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
    const { data } = await this.apiClient.get(`/event-evaluations/${id}`)

    return data
  }
}

module.exports = EventEvaluationRepository
