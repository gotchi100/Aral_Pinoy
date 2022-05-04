'use strict'

const { Types } = require('mongoose')

const InkindDonationModel = require('../models/inkind-donations')
const NotificationModel = require('../models/notifications')
const UserModel = require('../models/users')
const NOTIFICATION_TYPES = require('../constants/notifications').TYPES

const ONE_MONTH_MS = 2628000000

async function run() {
  const todayAfterOneMonth = new Date(Date.now() + ONE_MONTH_MS)
  
  const items = await InkindDonationModel.find({
    $and: [
      {
        'category.customFields': {
          $exists: true
        }
      },
      {
        $or: [
          {
            'category.customFields.expirationDate': {
              $lte: todayAfterOneMonth
            }
          },
          {
            'category.customFields.bestBeforeDate': {
              $lte: todayAfterOneMonth
            }
          }
        ]
      }
    ]
  })

  if (items.length === 0) {
    return
  }

  const users = await UserModel.find({
    roles: {
      $in: ['admin','officer']
    }
  }, ['_id'])

  if (users.length === 0) {
    return
  }

  for (const item of items) {
    for (const user of users) {
      const userId = new Types.ObjectId(user._id)

      let expirationDate

      if (item.category.customFields.expirationDate !== undefined) {
        expirationDate = item.category.customFields.expirationDate
      } else {
        expirationDate = item.category.customFields.bestBeforeDate
      }

      await NotificationModel.updateOne({
        user: userId,
        type: NOTIFICATION_TYPES.EXPIRING_INVENTORY_ITEM,
        'typeDetails.itemSku': item.sku
      }, {
        $setOnInsert: {
          user: userId,
          seen: false,
          read: false,
          type: NOTIFICATION_TYPES.EXPIRING_INVENTORY_ITEM,
          typeDetails: {
            itemSku: item.sku,
            itemName: item.name,
            expirationDate
          },
          createdAt: new Date()
        }
      }, {
        upsert: true
      })
    }
  }
}

module.exports = function (agenda) {
  agenda.define('check expiring inventory items', run)
}