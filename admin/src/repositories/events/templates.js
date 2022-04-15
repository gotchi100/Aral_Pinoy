'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

class EventTemplateRepository {
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

  async create (payload) {
    const { data } = await this.apiClient.post('/event-templates', payload)

    return data
  }

  async list (options = {}) {
    const {
      sort: {
        field: sortField,
        order: sortOrder
      }
    } = options

    const queryString = new URLSearchParams()

    if (sortField !== undefined && sortOrder !== undefined) {
      queryString.set('sort.field', sortField)
      queryString.set('sort.order', sortOrder)
    }

    const { data } = await this.apiClient.get(`/event-templates?${queryString.toString()}`)

    return {
      results: data.results,
      total: data.total
    }
  }

  async get (id) {
    const { data } = await this.apiClient.get(`/event-templates/${id}`)

    return data
  }

  async deleteTemplate (id) {
    await this.apiClient.delete(`/event-templates/${id}`)
  }
}

module.exports = EventTemplateRepository
