'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

const REPOSITORY_BASE_URL = '/reports'

class ReportRepository {
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

  /**
   *
   * @param {Object} dateRange Date range
   * @param {string} dateRange.start Start date
   * @param {string} dateRange.end End date
   * @returns {Promise<{ results: Object[] }>}
   */
  async getEvents (dateRange) {
    const {
      start,
      end
    } = dateRange

    const queryString = new URLSearchParams()
    queryString.set('startDate', start)
    queryString.set('endDate', end)

    const { data } = await this.apiClient.get(`${REPOSITORY_BASE_URL}/events?${queryString.toString()}`)

    return data
  }

  /**
   *
   * @param {Object} dateRange Date range
   * @param {string} dateRange.start Start date
   * @param {string} dateRange.end End date
   * @returns {Promise<{ results: Object[] }>}
   */
  async getVolunteers (dateRange) {
    const {
      start,
      end
    } = dateRange

    const queryString = new URLSearchParams()
    queryString.set('startDate', start)
    queryString.set('endDate', end)

    const { data } = await this.apiClient.get(`${REPOSITORY_BASE_URL}/volunteers?${queryString.toString()}`)

    return data
  }
}

module.exports = ReportRepository
