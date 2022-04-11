'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

class UserRepository {
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

  async get (id) {
    const { data } = await this.apiClient.get(`/users/${id}`)

    return data
  }

  async update (id, payload) {
    await this.apiClient.patch(`/users/${id}`, payload)
  }
}

module.exports = UserRepository
