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

  async list (filters = {}, options = {}) {
    const {
      limit,
      offset,
      sort: {
        field: sortField,
        order: sortOrder
      }
    } = options

    const queryString = new URLSearchParams()

    if (limit !== undefined) {
      queryString.set('limit', limit)
    }

    if (offset !== undefined) {
      queryString.set('offset', offset)
    }

    if (filters.name !== undefined && filters.name !== '') {
      queryString.set('filters.name', filters.name)
    }

    if (filters.status !== undefined && filters.status !== '') {
      queryString.set('filters.status', filters.status)
    }

    if (filters.hasMonetaryGoal !== undefined) {
      queryString.set('filters.hasMonetaryGoal', filters.hasMonetaryGoal)
    }

    if (sortField !== undefined && sortOrder !== undefined) {
      queryString.set('sort.field', sortField)
      queryString.set('sort.order', sortOrder)
    }

    const { data } = await this.apiClient.get(`/events?${queryString.toString()}`)

    return {
      results: data.results,
      total: data.total
    }
  }
}

module.exports = EventRepository
