'use strict'

const { startOfDay, endOfDay } = require('date-fns')

const InkindDonationModel = require('../../models/inkind-donations')
const objectUtils = require('../../utils/objects')

class ReportDeletedInventoryItemsController {
  /**
   * @param {Object} dateRange Date range object
   * @param {Date} dateRange.start Start date
   * @param {Date} dateRange.end End date
   * @returns {Promise<Object[]>}
   */
  static async get(dateRange) {
    const {
      start,
      end
    } = dateRange

    const findQuery = {
      deleted: true,
    }

    if (start !== undefined) {
      objectUtils.set(findQuery, 'deletedOn.$gte', startOfDay(start))
    }

    if (end !== undefined) {
      objectUtils.set(findQuery, 'deletedOn.$lte', endOfDay(end))
    }

    const deletedItems = await InkindDonationModel.find(findQuery, undefined, {
      sort: {
        deletedOn : -1
      }
    })
    
    return deletedItems
  }
}

module.exports = ReportDeletedInventoryItemsController