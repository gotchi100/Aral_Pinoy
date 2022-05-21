'use strict'

const { addMonths, endOfMonth } = require('date-fns')
const debug = require('debug')

const InkindDonationModel = require('../models/inkind-donations')
const NotificationModel = require('../models/notifications')
const UserModel = require('../models/users')
const NOTIFICATION_TYPES = require('../constants/notifications').TYPES

const logger = debug('api:cron:check-expiring-inventory-items')

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
        deleted : false,
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
  logger('Running cron task')

  const users = await getAdminsAndOfficers()

  if (users.length === 0) {
    logger('No users found')

    return
  }

  const nextMonth = addMonths(new Date(), 1)
  const endOfNextMonth = endOfMonth(nextMonth)
  logger(`Searching for items before provided date: ${endOfNextMonth.toJSON()}`)

  const expiringItems = await getExpiringItems(endOfNextMonth)

  if (expiringItems.length === 0) {
    logger('No expiring items found')

    return
  }

  for (const user of users) {
    const userId = user._id

    const { upsertedCount } = await NotificationModel.updateOne({
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

    if (upsertedCount > 0) {
      logger(`User notification sent to ${user._id.toString()}`)
    }
  }

  logger('Task ended successfully')
}

module.exports = function (agenda) {
  agenda.define('check expiring inventory items', run)
}