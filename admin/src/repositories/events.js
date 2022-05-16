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
      sort = {}
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
      if (Array.isArray(filters.status)) {
        for (const status of filters.status) {
          queryString.append('filters.status[]', status)
        }
      } else {
        queryString.set('filters.status', filters.status)
      }
    }

    if (filters.hasMonetaryGoal !== undefined) {
      queryString.set('filters.hasMonetaryGoal', filters.hasMonetaryGoal)
    }

    if (sort.field !== undefined && sort.order !== undefined) {
      queryString.set('sort.field', sort.field)
      queryString.set('sort.order', sort.order)
    }

    const { data } = await this.apiClient.get(`/events?${queryString.toString()}`)

    return {
      results: data.results,
      total: data.total
    }
  }

  async update (id, payload) {
    await this.apiClient.patch(`/events/${id}`, payload)
  }

  async getRecommendedVolunteers (id) {
    const { data } = await this.apiClient.get(`/events/${id}/recommended-volunteers`)

    return data
  }

  async inviteVolunteers (id, userIds) {
    await this.apiClient.post(`/events/${id}/invite-volunteers`, {
      userIds
    })
  }
}

module.exports = EventRepository
