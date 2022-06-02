'use strict'

const { endOfDay } = require('date-fns')
const debug = require('debug')

const InkindDonationModel = require('../models/inkind-donations')
const NotificationModel = require('../models/notifications')
const UserModel = require('../models/users')
const NOTIFICATION_TYPES = require('../constants/notifications').TYPES

const logger = debug('api:cron:delete-expired-inventory-items')

async function getAdminsAndOfficers() {
  const users = await UserModel.find({
    roles: {
      $in: ['admin','officer']
    }
  }, ['_id'])

  return users
}

async function getAndDeleteExpiredItems() {
  const expiredItems = await InkindDonationModel.find({
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
              $lte: endOfDay(new Date())
            }
          },
          {
            'category.customFields.bestBeforeDate': {
              $lte: endOfDay(new Date())
            },
            'category.customFields.expirationDate': {
              $exists: false
            }
          }
        ]
      }
    ]
  }, ['_id', 'sku', 'name', 'quantity', 'category'])

  return expiredItems
}

async function run() {
  logger('Running cron task')

  const users = await getAdminsAndOfficers()

  if (users.length === 0) {
    logger('No users found')

    return
  }

  const deletionThreshold = endOfDay(new Date())

  logger(`Searching for expired items since ${deletionThreshold.toJSON()}`)

  const expiredItems = await getAndDeleteExpiredItems()

  if (expiredItems.length === 0) {
    logger('No expired items found')

    return
  }

  const expiredItemIds = []

  for (const expiredItem of expiredItems) {
    expiredItemIds.push(expiredItem._id)
  }
  
  const { modifiedCount } = await InkindDonationModel.updateMany({
    _id: {
      $in: expiredItemIds
    },
    deleted: false
  }, {
    $set: {
      deleted: true
    },
    $currentDate: {
      deletedOn: true
    }
  })

  logger(`Safely deleted ${modifiedCount} item/s`)

  for (const user of users) {
    const userId = user._id

    const { upsertedCount } = await NotificationModel.updateOne({
      user: userId,
      type: NOTIFICATION_TYPES.EXPIRED_INVENTORY_ITEM,
      'typeDetails.dateThreshold': deletionThreshold
    }, {
      $setOnInsert: {
        user: userId,
        seen: false,
        read: false,
        type: NOTIFICATION_TYPES.EXPIRED_INVENTORY_ITEM,
        typeDetails: {
          expiredItems,
          deletionThreshold
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
  agenda.define('delete expired inventory items', run)
}