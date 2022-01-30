'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

class EventExpenseRepository {
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

  async list (filters = {}, options = {}) {
    const {
      limit = 5,
      offset = 0
    } = options

    const queryString = new URLSearchParams()

    queryString.set('limit', limit)
    queryString.set('offset', offset)

    if (filters.eventId !== undefined) {
      queryString.set('filters.eventId', filters.eventId)
    }

    const { data } = await this.apiClient.get(`/event-expenses?${queryString.toString()}`)

    return {
      results: data.results,
      total: data.total
    }
  }
}

module.exports = EventExpenseRepository
