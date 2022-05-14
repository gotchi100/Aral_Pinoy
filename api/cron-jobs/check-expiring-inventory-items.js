'use strict'

const { Types } = require('mongoose')
const { addMonths, endOfMonth } = require('date-fns')

const InkindDonationModel = require('../models/inkind-donations')
const NotificationModel = require('../models/notifications')
const UserModel = require('../models/users')
const NOTIFICATION_TYPES = require('../constants/notifications').TYPES

async function getAdminsAndOfficers() {
  const users = await UserModel.find({
    roles: {
      $in: ['admin','officer']
    }
  }, ['_id'])

  return users
}

async function getExpiringItems(dateThreshold) {
  const expiringItems = await InkindDonationModel.find({
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
              $lte: dateThreshold
            }
          },
          {
            'category.customFields.bestBeforeDate': {
              $lte: dateThreshold
            }
          }
        ]
      }
    ]
  }, ['sku', 'name', 'quantity', 'category'])

  return expiringItems
}

async function run() {
  const users = await getAdminsAndOfficers()

  if (users.length === 0) {
    return
  }

  const nextMonth = addMonths(new Date(), 1)
  const endOfNextMonth = endOfMonth(nextMonth)

  const expiringItems = await getExpiringItems(endOfNextMonth)

  if (expiringItems.length === 0) {
    return
  }

  for (const user of users) {
    const userId = new Types.ObjectId(user._id)

    await NotificationModel.updateOne({
      user: userId,
      type: NOTIFICATION_TYPES.EXPIRING_INVENTORY_ITEM,
      'typeDetails.dateThreshold': endOfNextMonth
    }, {
      $setOnInsert: {
        user: userId,
        seen: false,
        read: false,
        type: NOTIFICATION_TYPES.EXPIRING_INVENTORY_ITEM,
        typeDetails: {
          expiringItems,
          dateThreshold: endOfNextMonth
        },
        createdAt: new Date()
      }
    }, {
      upsert: true
    })
  }
}

module.exports = function (agenda) {
  agenda.define('check expiring inventory items', run)
}