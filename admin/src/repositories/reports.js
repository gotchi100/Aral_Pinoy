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

  /**
   * @param {Object} params Parameters
   * @param {string} params.itemId Item Id
   * @param {Object} params.dateRange Date range
   * @param {string} params.dateRange.start Start date
   * @param {string} params.dateRange.end End date
   * @returns {Promise<{ results: Object[] }>}
   */
  async getInventoryItem (params) {
    const {
      itemId,
      dateRange
    } = params

    const {
      start,
      end
    } = dateRange

    const queryString = new URLSearchParams()
    queryString.set('startDate', start)
    queryString.set('endDate', end)
    queryString.set('itemId', itemId)

    const { data } = await this.apiClient.get(`${REPOSITORY_BASE_URL}/inventory-item?${queryString.toString()}`)

    return data
  }

  /**
   * @param {Object} dateRange Date range
   * @param {string} dateRange.start Start date
   * @param {string} dateRange.end End date
   * @returns {Promise<{ results: Object[] }>}
   */
  async getDeletedInventoryItems (dateRange) {
    const {
      start,
      end
    } = dateRange

    const queryString = new URLSearchParams()
    queryString.set('startDate', start)
    queryString.set('endDate', end)

    const { data } = await this.apiClient.get(`${REPOSITORY_BASE_URL}/deleted-inventory-items?${queryString.toString()}`)

    return data
  }

  /**
   * @returns {Promise<{ results: Object[] }>}
   */
  async getExpiringInventoryItems () {
    const { data } = await this.apiClient.get(`${REPOSITORY_BASE_URL}/expiring-inventory-items`)

    return data
  }

  /**
   * @returns {Promise<{ results: Object[] }>}
   */
  async getInventoryItems () {
    const { data } = await this.apiClient.get(`${REPOSITORY_BASE_URL}/inventory-items`)

    return data
  }

  /**
   *
   * @param {Object} dateRange Date range
   * @param {string} dateRange.start Start date
   * @param {string} dateRange.end End date
   * @returns {Promise<{ results: Object[] }>}
   */
  async getMonetaryDonations (dateRange) {
    const {
      start,
      end
    } = dateRange

    const queryString = new URLSearchParams()
    queryString.set('startDate', start)
    queryString.set('endDate', end)

    const { data } = await this.apiClient.get(`${REPOSITORY_BASE_URL}/monetary-donations?${queryString.toString()}`)

    return data
  }

  /**
   *
   * @param {Object} dateRange Date range
   * @param {string} dateRange.start Start date
   * @param {string} dateRange.end End date
   * @returns {Promise<{ results: Object[] }>}
   */
  async getSdgs (dateRange) {
    const {
      start,
      end
    } = dateRange

    const queryString = new URLSearchParams()
    queryString.set('startDate', start)
    queryString.set('endDate', end)

    const { data } = await this.apiClient.get(`${REPOSITORY_BASE_URL}/sdgs?${queryString.toString()}`)

    return data
  }

  /**
   *
   * @param {Object} dateRange Date range
   * @param {string} dateRange.start Start date
   * @param {string} dateRange.end End date
   * @returns {Promise<{ results: Object[] }>}
   */
  async getIncomeStatement (dateRange) {
    const {
      start,
      end
    } = dateRange

    const queryString = new URLSearchParams()
    queryString.set('startDate', start)
    queryString.set('endDate', end)

    const { data } = await this.apiClient.get(`${REPOSITORY_BASE_URL}/income-statement?${queryString.toString()}`)

    return data
  }
}

module.exports = ReportRepository
