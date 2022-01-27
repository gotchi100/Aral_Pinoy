'use strict'

const IkdOrganizationModel = require('../../models/inkind-donations/organizations')

class InkindDonationOrganizationController {
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

    const [organizations, total] = await Promise.all([
      IkdOrganizationModel.find(matchQuery, undefined, { 
        lean: true,
        limit,
        skip: offset
      }),
      IkdOrganizationModel.countDocuments(matchQuery)
    ])

    return {
      results: organizations,
      total
    }
  }
}

module.exports = InkindDonationOrganizationController