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

  async list (filters = {}, options = {}) {
    const {
      limit,
      offset
    } = options

    const queryString = new URLSearchParams()

    if (limit !== undefined) {
      queryString.set('limit', limit)
    }

    if (offset !== undefined) {
      queryString.set('offset', offset)
    }

    if (filters.userId !== undefined) {
      queryString.set('filters.userId', filters.userId)
    }

    if (filters.eventId !== undefined) {
      queryString.set('filters.eventId', filters.eventId)
    }

    const { data } = await this.apiClient.get(`/event-evaluations?${queryString.toString()}`)

    return {
      results: data.results,
      total: data.total
    }
  }

  async get (id) {
    const { data } = await this.apiClient.get(`/event-evaluations/${id}`)

    return data
  }
}

module.exports = EventEvaluationRepository
