'use strict'

const InkindDonationModel = require('../../models/inkind-donations')

class ReportInventoryItemsController {
  /**
   * @returns {Promise<Object[]>}
   */
  static async get() {
    const inventoryItemsByGroup = await ReportInventoryItemsController.getItemsByGroup()
    const inventoryItemsByCategory = await ReportInventoryItemsController.getItemsByCategory()
    
    return {
      inventoryItemsByGroup,
      inventoryItemsByCategory
    }
  }

  static async getItemsByGroup() {
    const aggregationResults = await InkindDonationModel.aggregate([
      {
        $match: {
          deleted: false
        }
      },
      {
        $group: {
          _id: '$group',
          quantity: {
            $sum: '$quantity'
          }
        }
      },
      { 
        $addFields: {
          fieldType: { 
            $type: '$_id'
          } 
        } 
      },
      {
        $sort: {
          fieldType: -1,
          _id: 1,
        }
      },
      {
        $project: {
          fieldType: 0
        }
      },
      {
        $project: {
          _id: {
            $ifNull: ['$_id', 'Ungrouped Items'],
          },
          quantity: 1
        }
      }
    ])

    return aggregationResults
  }

  static async getItemsByCategory() {
    const aggregationResults = await InkindDonationModel.aggregate([
      {
        $match: {
          deleted: false
        }
      },
      {
        $group: {
          _id: '$category.name',
          quantity: {
            $sum: '$quantity'
          }
        }
      },
      { 
        $addFields: {
          fieldType: { 
            $type: '$_id'
          } 
        } 
      },
      {
        $sort: {
          fieldType: -1,
          _id: 1,
        }
      },
      {
        $project: {
          fieldType: 0
        }
      },
      {
        $project: {
          _id: {
            $ifNull: ['$_id', 'Uncategorized Items'],
          },
          quantity: 1
        }
      }
    ])

    return aggregationResults
  }
}

module.exports = ReportInventoryItemsController