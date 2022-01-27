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

  async list (filters = {}, options = {}) {
    const {
      limit,
      offset,
      sort = {}
    } = options

    const queryString = new URLSearchParams()

    if (limit !== undefined) {
      queryString.set('limit', limit)
    }

    if (offset !== undefined) {
      queryString.set('offset', offset)
    }

    if (filters.name !== undefined && filters.name !== '') {
      queryString.set('filters.name', filters.name)
    }

    if (Array.isArray(filters.roles) && filters.roles.length > 0) {
      for (const role of filters.roles) {
        queryString.append('filters.roles[]', role)
      }
    }

    if (sort.field !== undefined && sort.order !== undefined) {
      queryString.set('sort.field', sort.field)
      queryString.set('sort.order', sort.order)
    }

    const { data } = await this.apiClient.get(`/users?${queryString.toString()}`)

    return {
      results: data.results,
      total: data.total
    }
  }
}

module.exports = UserRepository
