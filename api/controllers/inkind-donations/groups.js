'use strict'

const IkdGroupModel = require('../../models/inkind-donations/groups')

class InkindDonationGroupsController {
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

    const [groups, total] = await Promise.all([
      IkdGroupModel.find(matchQuery, undefined, { 
        lean: true,
        limit,
        skip: offset
      }),
      IkdGroupModel.countDocuments(matchQuery)
    ])

    return {
      results: groups,
      total
    }
  }
}

module.exports = InkindDonationGroupsController