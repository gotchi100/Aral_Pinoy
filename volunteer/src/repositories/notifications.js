'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

const REPOSITORY_BASE_URL = '/notifications'

class NotificationRepository {
  /**
   *
   * @param {Axios} apiClient
   */
  constructor (apiClient) {
    const { baseURL } = apiClient.defaults

    /** @type {Axios} */
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

    if (filters.read !== undefined) {
      queryString.set('filters.read', filters.read)
    }

    const { data } = await this.apiClient.get(`${REPOSITORY_BASE_URL}?${queryString.toString()}`)

    return {
      results: data.results,
      total: data.total
    }
  }

  async countUnseen (filters = {}) {
    const queryString = new URLSearchParams()

    queryString.set('filters.seen', false)

    if (filters.userId !== undefined) {
      queryString.set('filters.userId', filters.userId)
    }

    const { data } = await this.apiClient.get(`${REPOSITORY_BASE_URL}?${queryString.toString()}`)

    return data.total
  }

  async markAsSeen (id) {
    await this.apiClient.patch(`${REPOSITORY_BASE_URL}/${id}/seen`)
  }

  async markAsRead (ids) {
    await this.apiClient.patch(`${REPOSITORY_BASE_URL}/readAll`, {
      ids
    })
  }
}

module.exports = NotificationRepository
