'use strict'

const { startOfDay, endOfDay, format } = require('date-fns')
const { Types } = require('mongoose')

const InkindDonationModel = require('../../models/inkind-donations')
const IkdTransactionModel = require('../../models/inkind-donations/transactions')

class ReportInventoryItemController {
  /**
   * @param {Object} params Parameters
   * @param {string} params.itemId Inventory item Id
   * @param {Object} params.dateRange Date range object
   * @param {Date} params.dateRange.start Start date
   * @param {Date} params.dateRange.end End date
   * @returns 
   */
  static async get(params) {
    const {
      itemId,
      dateRange
    } = params

    const {
      start,
      end
    } = dateRange

    const inventoryItem = await InkindDonationModel.findOne({
      _id: new Types.ObjectId(itemId),
      deleted: false
    }, ['sku'], {
      lean: true
    })
    
    if (inventoryItem === null) {
      return {
        stockQuantity: {
          labels: [],
          data: []
        }
      }
    }

    const transactions = await IkdTransactionModel.find({
      'item.sku': inventoryItem.sku,
      date: {
        $gte: startOfDay(start),
        $lte: endOfDay(end)
      }
    }, undefined, {
      sort: {
        date: 1
      }
    })

    if (transactions.length === 0) {
      return {
        stockQuantity: {
          labels: [],
          data: []
        }
      }
    }
    
    const stockQuantityLabels = []
    const stockQuantityData = []

    const itemQtyDateMap = new Map()

    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i]
      const adjustedQuantity = transaction.item.quantity + transaction.quantity
      const transactionDate = format(transaction.date, 'MM/dd/yy')

      itemQtyDateMap.set(transactionDate, adjustedQuantity)
    }

    for (const [date, quantity] of itemQtyDateMap.entries()) {
      stockQuantityLabels.push(date)
      stockQuantityData.push(quantity)
    }

    return {
      stockQuantity: {
        labels: stockQuantityLabels,
        data: stockQuantityData
      },
    }
  }
}

module.exports = ReportInventoryItemController