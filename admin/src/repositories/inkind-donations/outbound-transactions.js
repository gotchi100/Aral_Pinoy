'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

class InkindDonationOutboundTransactionRepository {
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
    const { data } = await this.apiClient.post('/inkind-donation-outbound-transactions', payload)

    return data
  }

  async list (filters = {}, options = {}) {
    const {
      limit = 5,
      offset = 0,
      sort = {}
    } = options

    const queryString = new URLSearchParams()

    queryString.set('limit', limit)
    queryString.set('offset', offset)

    if (filters.receiverType !== undefined) {
      queryString.set('filters.receiverType', filters.receiverType)
    }

    if (Array.isArray(filters.status) && filters.status.length > 0) {
      for (const status of filters.status) {
        queryString.append('filters.status[]', status)
      }
    }

    if (sort.field !== undefined && sort.order !== undefined) {
      queryString.set('sort.field', sort.field)
      queryString.set('sort.order', sort.order)
    }

    const { data } = await this.apiClient.get(`/inkind-donation-outbound-transactions?${queryString.toString()}`)

    return {
      results: data.results,
      total: data.total
    }
  }
}

module.exports = InkindDonationOutboundTransactionRepository
