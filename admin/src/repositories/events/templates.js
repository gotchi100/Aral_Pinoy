'use strict'

const axios = require('axios')

/** @typedef {import('axios').Axios} Axios */

class EventTemplateRepository {
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

    // TODO: Create event template using API
    // const { data } = await this.apiClient.post('/event-templates', payload)

    // return data
  }

  async list (options = {}) {
    return {
      results: [
        {
          id: '1',
          name: 'Lorem Ipsum',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: '2',
          name: 'Dolor Sit',
          description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        },
        {
          id: '3',
          name: 'Sed Do',
          description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.'
        }
      ],
      total: 3
    }

    // TODO: Get event templates from API
    // const {
    //   sort: {
    //     field: sortField,
    //     order: sortOrder
    //   }
    // } = options

    // const queryString = new URLSearchParams()

    // if (sortField !== undefined && sortOrder !== undefined) {
    //   queryString.set('sort.field', sortField)
    //   queryString.set('sort.order', sortOrder)
    // }

    // const { data } = await this.apiClient.get(`/event-templates?${queryString.toString()}`)

    // return {
    //   results: data.results,
    //   total: data.total
    // }
  }

  async get (id) {
    return {
      id: '1',
      name: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      location: {
        name: 'Remote'
      },
      goals: {
        monetaryDonation: 10000
      },
      sdgIds: ['61af6619c387080ad5c7574e'],
      questions: [
        {
          label: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
          type: 'matrix'
        },
        {
          label: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
          type: 'matrix'
        },
        {
          label: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
          type: 'matrix'
        }
      ],
      jobs: [
        {
          name: 'Excepteur sint',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          requirements: {
            max: 1
          },
          skills: [
            {
              _id: '61955106dad05992c3c52353',
              name: 'Test 2',
              description: undefined
            }
          ]
        }
      ]
    }

    // TODO: Get event template from API
    // const { data } = await this.apiClient.get(`/event-templates/${id}`)

    // return data
  }
}

module.exports = EventTemplateRepository
