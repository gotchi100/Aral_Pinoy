'use strict'

const { addMonths, endOfMonth } = require('date-fns')

const InkindDonationModel = require('../../models/inkind-donations')

class ReportExpiringInventoryItemsController {
  /**
   * @param {Object} [params={}] Parameters
   * @param {number} [params.offset] Pagination offset
   * @param {number} [params.limit] Pagination limit
   * @returns {Promise<Object[]>}
   */
  static async get(params = {}) {
    const {
      offset,
      limit,
    } = params

    const today = new Date()

    const nextMonth = addMonths(today, 1)
    const endOfNextMonth = endOfMonth(nextMonth)

    const findQuery = {
      $and: [
        {
          deleted : false,
          'category.customFields': {
            $exists: true
          }
        },
        {
          $or: [
            {
              'category.customFields.expirationDate': {
                $gte: today,
                $lte: endOfNextMonth
              }
            },
            {
              'category.customFields.bestBeforeDate': {
                $gte: today,
                $lte: endOfNextMonth
              },
              'category.customFields.expirationDate' : {
                $exists: false
              }
            },
          ]
        }
      ]
    }
  
    const [expiringItems, count] = await Promise.all([
      InkindDonationModel.find(findQuery, undefined, {
        sort: {
          'category.customFields.bestBeforeDate': 1,
          'category.customFields.expirationDate' : 1
        },
        skip: offset,
        limit
      }),
      InkindDonationModel.countDocuments(findQuery)
    ])
    
    return {
      results: expiringItems,
      total: count
    }
  }
}

module.exports = ReportExpiringInventoryItemsController