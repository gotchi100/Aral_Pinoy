'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

class EventVolunteerRepository {
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
      expand
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

    if (filters.eventStatuses !== undefined) {
      for (const status of filters.eventStatuses) {
        queryString.append('filters.eventStatuses[]', status)
      }
    }

    if (filters.userId !== undefined) {
      queryString.set('filters.userId', filters.userId)
    }

    if (filters.eventId !== undefined) {
      queryString.set('filters.eventId', filters.eventId)
    }

    const { data } = await this.apiClient.get(`/event-volunteers?${queryString.toString()}`)

    return {
      results: data.results,
      total: data.total
    }
  }

  async replace (id, payload) {
    await this.apiClient.put(`/event-volunteers/${id}`, payload)
  }
}

module.exports = EventVolunteerRepository
