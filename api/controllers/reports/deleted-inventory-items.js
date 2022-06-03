'use strict'

const { startOfDay, endOfDay } = require('date-fns')

const InkindDonationModel = require('../../models/inkind-donations')
const objectUtils = require('../../utils/objects')

const SORT_ORDER_MAPPING = {
  asc : 1,
  desc : -1
}

class ReportDeletedInventoryItemsController {
  /**
   * @param {Object} [params={}] Parameters
   * @param {Object} [params.dateRange={}] Date range object
   * @param {Date} [params.dateRange.start] Start date
   * @param {Date} [params.dateRange.end] End date
   * @param {number} [params.offset] Pagination offset
   * @param {number} [params.limit] Pagination limit
   * @param {Object} [params.sort] Pagination sort 
   * @param {string} params.sort.field Pagination sort field 
   * @param {'asc' | 'desc'} params.sort.order Pagination sort order
   * @returns {Promise<Object[]>}
   */
  static async get(params = {}) {
    const {
      dateRange = {},
      offset,
      limit,
      sort = {}
    } = params

    const {
      start,
      end
    } = dateRange

    const {
      field : sortField,
      order : sortOrder
    } = sort

    const findQuery = {
      deleted: true,
    }

    const queryOptions = {
      sort: {
        deletedOn : -1
      },
      skip: offset,
      limit
    }

    if (start !== undefined) {
      objectUtils.set(findQuery, 'deletedOn.$gte', startOfDay(start))
    }

    if (end !== undefined) {
      objectUtils.set(findQuery, 'deletedOn.$lte', endOfDay(end))
    }

    if (sortField !== undefined && sortOrder !== undefined) {
      queryOptions.sort = {
        [sortField] : SORT_ORDER_MAPPING[sortOrder]
      }
    }

    const [deletedItems, count] = await Promise.all([
      InkindDonationModel.find(findQuery, undefined, queryOptions),
      InkindDonationModel.countDocuments(findQuery)
    ])
    
    return {
      results: deletedItems,
      total: count
    }
  }
}

module.exports = ReportDeletedInventoryItemsController