'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

class EventDonationRepository {
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
      limit,
      offset,
      expand,
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

    if (expand !== undefined) {
      queryString.set('expand', expand)
    }

    if (filters.status !== undefined) {
      queryString.set('filters.status', filters.status)
    }

    if (filters.userId !== undefined) {
      queryString.set('filters.userId', filters.userId)
    }

    if (filters.eventId !== undefined) {
      queryString.set('filters.eventId', filters.eventId)
    }

    if (sortField !== undefined && sortOrder !== undefined) {
      queryString.set('sort.field', sortField)
      queryString.set('sort.order', sortOrder)
    }

    const { data } = await this.apiClient.get(`/event-donations?${queryString.toString()}`)

    return {
      results: data.results,
      total: data.total
    }
  }
}

module.exports = EventDonationRepository