'use strict'

const IkdDonorModel = require('../../models/inkind-donations/donors')

class InkindDonationDonorController {
  static async list(query) {
    const {
      limit,
      offset,
      filters = {}
    } = query

    const matchQuery = {}

    if (filters.name !== undefined && filters.name !== '') {
      matchQuery.$text = {
        $search: decodeURIComponent(filters.name)
      }
    }

    const [donors, total] = await Promise.all([
      IkdDonorModel.find(matchQuery, undefined, { 
        lean: true,
        limit,
        skip: offset
      }),
      IkdDonorModel.countDocuments(matchQuery)
    ])

    return {
      results: donors,
      total
    }
  }
}

module.exports = InkindDonationDonorController