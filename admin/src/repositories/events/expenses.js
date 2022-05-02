'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

const REPOSITORY_ROUTE_PREFIX = '/event-expenses'

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
      offset = 0,
      grouped = false,
      sort = {}
    } = options

    const queryString = new URLSearchParams()

    queryString.set('limit', limit)
    queryString.set('offset', offset)
    queryString.set('grouped', grouped)

    if (filters.eventId !== undefined) {
      queryString.set('filters.eventId', filters.eventId)
    }

    if (sort.field !== undefined && sort.order !== undefined) {
      queryString.set('sort.field', sort.field)
      queryString.set('sort.order', sort.order)
    }

    const { data } = await this.apiClient.get(`${REPOSITORY_ROUTE_PREFIX}?${queryString.toString()}`)

    return {
      results: data.results,
      total: data.total
    }
  }
}

module.exports = EventExpenseRepository
