'use strict'

const IkdGroupModel = require('../../models/inkind-donations/groups')

class InkindDonationGroupsController {
  static async list(query) {
    const {
      limit,
      offset,
      'filters.name': filterName
    } = query

    const matchQuery = {}

    if (filterName !== undefined && filterName !== '') {
      matchQuery.$text = {
        $search: decodeURIComponent(filterName)
      }
    }

    const [categories, total] = await Promise.all([
      IkdGroupModel.find(matchQuery, undefined, { 
        lean: true,
        limit,
        skip: offset
      }),
      IkdGroupModel.countDocuments(matchQuery)
    ])

    return {
      results: categories,
      total
    }
  }
}

module.exports = InkindDonationGroupsController