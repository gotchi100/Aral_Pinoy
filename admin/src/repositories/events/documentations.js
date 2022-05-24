'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

const REPOSITORY_BASE_URL = '/event-documentations'

class EventDocumentationRepository {
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

  /**
   *
   * @param {Object} payload Payload
   * @param {string} payload.eventId Event Id
   * @param {File} payload.file File
   * @returns {Promise<Object>}
   */
  async create (payload) {
    const {
      eventId,
      file
    } = payload

    const form = new FormData()

    form.set('eventId', eventId)
    form.set('type', 'IMAGE')
    form.set('documentation', file)

    const { data } = await this.apiClient.post(`${REPOSITORY_BASE_URL}`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return data
  }

  /**
   *
   * @param {Object} filters Filters
   * @param {string} filters.eventId Event Id
   * @param {Object} options Options
   * @param {Object} options.limit List limit
   * @param {Object} options.offset List offset
   * @returns {Promise<void>}
   */
  async list (eventId, options = {}) {
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

    queryString.set('eventId', eventId)

    const { data } = await this.apiClient.get(`${REPOSITORY_BASE_URL}?${queryString.toString()}`)

    return {
      results: data.results,
      total: data.total
    }
  }

  /**
   *
   * @param {string} documentationId Documentation Id
   * @returns {Promise<void>}
   */
  async deleteDocumentation (documentationId) {
    await this.apiClient.delete(`${REPOSITORY_BASE_URL}/${documentationId}`)
  }
}

module.exports = EventDocumentationRepository
