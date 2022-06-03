'use strict'

const InkindDonationModel = require('../../models/inkind-donations')

class ReportInventoryItemsController {
  /**
	 * @param {Object} [params={}] Parameters
	 * @param {Object} [params.group] Group name
	 * @param {number} [params.options={}] Options
	 * @param {number} [params.options.offset] Pagination offset
	 * @param {number} [params.options.limit] Pagination limit
	 * @returns {Promise<Object[]>}
	 */
  static async getItemsByGroup(params = {}) {
    const {
      group,
      options = {}
    } = params

    const {
      offset,
      limit,
    } = options

    const findQuery = {
      deleted: false
    }

    if (group !== undefined) {
      findQuery.group = group
    } else {
      findQuery.group = {
        $exists: false
      }
    }

    const [items, count] = await Promise.all([
      InkindDonationModel.find(findQuery, undefined, {
        skip: offset,
        limit
      }),
      InkindDonationModel.countDocuments(findQuery)
    ])

    return {
      results: items,
      total:  count
    }
  }

  /**
	 * @param {Object} [params={}] Parameters
	 * @param {Object} [params.category] Category name
	 * @param {number} [params.options={}] Options
	 * @param {number} [params.options.offset] Pagination offset
	 * @param {number} [params.options.limit] Pagination limit
	 * @returns {Promise<Object[]>}
	 */
  static async getItemsByCategory(params = {}) {
    const {
      category,
      options = {}
    } = params

    const {
      offset,
      limit,
    } = options

    const findQuery = {
      deleted: false
    }

    if (category !== undefined) {
      findQuery['category.name'] = category
    } else {
      findQuery.category = {
        $exists: false
      }
    }

    const [items, count] = await Promise.all([
      InkindDonationModel.find(findQuery, undefined, {
        skip: offset,
        limit
      }),
      InkindDonationModel.countDocuments(findQuery)
    ])

    return {
      results: items,
      total:  count
    }
  }
}

module.exports = ReportInventoryItemsController