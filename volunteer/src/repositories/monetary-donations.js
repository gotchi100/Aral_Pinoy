'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

class MonetaryDonationRepository {
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
      expand = false,
      sort: {
        field: sortField,
        order: sortOrder
      }
    } = options

    const queryString = new URLSearchParams()

    queryString.set('limit', limit)
    queryString.set('offset', offset)
    queryString.set('expand', expand)

    if (filters.status !== undefined) {
      if (Array.isArray(filters.status) && filters.status.length > 0) {
        for (const status of filters.status) {
          queryString.append('filters.status[]', status)
        }
      } else {
        queryString.set('filters.status', filters.status)
      }
    }

    if (filters.userId !== undefined) {
      queryString.set('filters.userId', filters.userId)
    }

    if (sortField !== undefined && sortOrder !== undefined) {
      queryString.set('sort.field', sortField)
      queryString.set('sort.order', sortOrder)
    }

    const { data } = await this.apiClient.get(`/monetary-donations?${queryString.toString()}`)

    return {
      results: data.results,
      total: data.total
    }
  }
}

module.exports = MonetaryDonationRepository
