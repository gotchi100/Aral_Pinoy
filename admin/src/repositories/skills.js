'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

class SkillRepository {
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
    const { data } = await this.apiClient.post('/skills', payload)

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

    if (filters.name !== undefined && filters.name !== '') {
      queryString.set('filters.name', filters.name)
    }

    if (sort.field !== undefined && sort.order !== undefined) {
      queryString.set('sort.field', sort.field)
      queryString.set('sort.order', sort.order)
    }

    const { data } = await this.apiClient.get(`/skills?${queryString.toString()}`)

    return {
      results: data.results,
      total: data.total
    }
  }

  async update (id, payload) {
    await this.apiClient.put(`/skills/${id}`, payload)
  }

  async delete (id) {
    await this.apiClient.delete(`/skills/${id}`)
  }
}

module.exports = SkillRepository
