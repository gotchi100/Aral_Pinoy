'use strict'

const { addMonths, endOfMonth } = require('date-fns')

const InkindDonationModel = require('../../models/inkind-donations')

class ReportExpiringInventoryItemsController {
  /**
   * @returns {Promise<Object[]>}
   */
  static async get() {
    const today = new Date()

    const nextMonth = addMonths(today, 1)
    const endOfNextMonth = endOfMonth(nextMonth)
  
    const expiringItems = await InkindDonationModel.find({
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
    }, undefined, {
      sort: {
        'category.customFields.bestBeforeDate': 1,
        'category.customFields.expirationDate' : 1
      }
    })
    
    return expiringItems
  }
}

module.exports = ReportExpiringInventoryItemsController