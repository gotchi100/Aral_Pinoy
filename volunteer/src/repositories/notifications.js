'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

let results = [{
  _id: '1',
  user: '2',
  seen: false,
  read: true,
  type: 'new-event-role',
  typeDetails: {
    event: {
      _id: '62602ab945ecc2fc1d993eb0',
      name: 'Batangas Tree Planting',
      logoUrl: 'https://storage.googleapis.com/staging_aral-pinoy-events/62602ab945ecc2fc1d993eb0/logo-l27qyoax-treeplant.jpg'
    },
    role: 'Trash Collector'
  },
  createdAt: new Date('2022-03-22').toJSON()
}, {
  _id: '2',
  user: '2',
  seen: false,
  read: false,
  type: 'new-event-role',
  typeDetails: {
    event: {
      _id: '61f55740015b1bf805e4b1fa',
      name: 'Education Under the Bridge BATA NATIONAL HIGH SCHOOL',
      logoUrl: 'https://storage.googleapis.com/staging_aral-pinoy-events/61f55740015b1bf805e4b1fa/logo-kyzyrye2-large_IMG_20190603_150544.jpg'
    },
    role: 'Assistant Teacher'
  },
  createdAt: new Date('2022-02-22').toJSON()
}, {
  _id: '3',
  user: '2',
  seen: true,
  read: false,
  type: 'new-event-role',
  typeDetails: {
    event: {
      _id: '61f699fa4978949a9fc50f0e',
      name: 'Sta. Ana Elementary School Brigada Pabasa',
      logoUrl: 'https://storage.googleapis.com/staging_aral-pinoy-events/61f699fa4978949a9fc50f0e/logo-kz1byqq2-Brigada%20Pagbasa.png'
    },
    role: 'Assistant Teacher'
  },
  createdAt: new Date('2022-01-22').toJSON()
}]

class NotificationRepository {
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

  async list (filters = {}, options = {}) {
    // TODO: Integrate notifications
    const {
      limit,
      offset
    } = options

    // const queryString = new URLSearchParams()

    // if (limit !== undefined) {
    //   queryString.set('limit', limit)
    // }

    // if (offset !== undefined) {
    //   queryString.set('offset', offset)
    // }

    // if (filters.userId !== undefined) {
    //   queryString.set('filters.userId', filters.userId)
    // }
    const listResult = results.filter((notification) => {
      const statements = [true]

      if (filters.read !== undefined) {
        statements.push(filters.read === notification.read)
      }

      return statements.every((statement) => statement === true)
    })

    return {
      results: listResult.slice(offset * limit, (offset + 1) * limit),
      total: listResult.length
    }
  }

  async countUnseen (filters = {}) {
    // TODO: Integrate notifications

    // if (filters.userId !== undefined) {
    //   queryString.set('filters.userId', filters.userId)
    // }

    return results.filter((notification) => {
      return notification.seen === false
    }).length
  }

  async markAsSeen (id) {
    const newResults = []

    for (const item of results) {
      if (item._id !== id) {
        newResults.push(item)

        continue
      }

      newResults.push({
        ...item,
        seen: true
      })
    }

    results = newResults
  }

  async markAsRead (ids) {
    const newResults = []

    for (const item of results) {
      if (!ids.includes(item._id)) {
        newResults.push(item)

        continue
      }

      newResults.push({
        ...item,
        read: true
      })
    }

    results = newResults
  }
}

module.exports = NotificationRepository
