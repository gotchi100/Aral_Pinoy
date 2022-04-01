'use strict'

const axios = require('axios')
const { isObject } = require('lodash')

/** @typedef {import('axios').Axios} Axios */

const REPOSITORY_ROUTE_PREFIX = '/inkind-donations'

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
    const form = new FormData()

    for (const [key, value] of Object.entries(payload)) {
      if (value === null) {
        continue
      }

      if (!Array.isArray(value)) {
        form.set(key, value)

        continue
      }

      for (let i = 0; i < value.length; i++) {
        const item = value[i]

        if (!isObject(item)) {
          form.set(`${key}[${i}]`, item)

          continue
        }

        for (const [itemKey, itemValue] of Object.entries(item)) {
          form.set(`${key}[${i}][${itemKey}]`, itemValue)
        }
      }
    }

    const { data } = await this.apiClient.post(REPOSITORY_ROUTE_PREFIX, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

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

    const { data } = await this.apiClient.get(`${REPOSITORY_ROUTE_PREFIX}?${queryString.toString()}`)

    return {
      results: data.results,
      total: data.total
    }
  }
}

module.exports = InkindDonationRepository
