'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

const REPOSITORY_ROUTE_PREFIX = '/inkind-donation-transactions'

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
    const {
      sku,
      quantity,
      date,
      reason,
      file
    } = payload

    const form = new FormData()

    form.set('sku', sku)
    form.set('quantity', quantity)
    form.set('date', date)

    if (reason !== null) {
      form.set('reason', reason)
    }

    if (file !== null) {
      form.set('file', file)
    }

    const { data } = await this.apiClient.post(REPOSITORY_ROUTE_PREFIX, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return data
  }
}

module.exports = InkindDonationTransactionRepository
