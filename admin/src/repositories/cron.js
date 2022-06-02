'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

const REPOSITORY_BASE_URL = '/cron'

class CronRepository {
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

  async triggerInsufficientEventVolunteersCheck () {
    await this.apiClient.post(REPOSITORY_BASE_URL, {
      jobName: 'check events with insufficient volunteers'
    })
  }

  async triggerExpiringInventoryItemsCheck () {
    await this.apiClient.post(REPOSITORY_BASE_URL, {
      jobName: 'check expiring inventory items'
    })
  }

  async triggerExpiredInventoryItemsDeletion () {
    await this.apiClient.post(REPOSITORY_BASE_URL, {
      jobName: 'delete expired inventory items'
    })
  }
}

module.exports = CronRepository
