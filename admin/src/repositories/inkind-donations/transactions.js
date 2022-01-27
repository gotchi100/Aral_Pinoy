'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

class InkindDonationTransactionRepository {
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
    const { data } = await this.apiClient.post('/inkind-donation-transactions', payload)

    return data
  }
}

module.exports = InkindDonationTransactionRepository
