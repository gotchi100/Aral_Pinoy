'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

class InkindDonationRepository {
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
    const { data } = await this.apiClient.post('/inkind-donations', payload)

    return data
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

    if (filters.query !== undefined && filters.query !== '') {
      queryString.set('filters.query', filters.query)
    }

    if (Array.isArray(filters.categoryCustomFields) && filters.categoryCustomFields.length > 0) {
      for (const customField of filters.categoryCustomFields) {
        queryString.append('filters.categoryCustomFields[]', customField)
      }
    }

    if (sort.field !== undefined && sort.order !== undefined) {
      queryString.set('sort.field', sort.field)
      queryString.set('sort.order', sort.order)
    }

    const { data } = await this.apiClient.get(`/inkind-donations?${queryString.toString()}`)

    return {
      results: data.results,
      total: data.total
    }
  }
}

module.exports = InkindDonationRepository
