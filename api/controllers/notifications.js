'use strict'

const { Types } = require('mongoose')

const NotificationModel = require('../models/notifications')
const EventModel = require('../models/events')

const {
  NotFoundError
} = require('../errors')

class NotificationController {
  static async list(query) {
    const {
      filters = {},
      limit,
      offset,
      countOnly
    } = query

    const matchQuery = {}

    if (filters.userId !== undefined) {
      matchQuery.user = new Types.ObjectId(filters.userId)
    }

    if (filters.read !== undefined) {
      matchQuery.read = filters.read
    }
    
    if (filters.seen !== undefined) {
      matchQuery.seen = filters.seen
    }

    const total = await NotificationModel.countDocuments(matchQuery)

    if (countOnly === true) {
      return {
        total
      }
    }

    const notifications = await NotificationModel.find(matchQuery, undefined, { 
      lean: true,
      limit,
      skip: offset,
      sort: {
        createdAt: -1
      },
      populate: [{
        path: 'typeDetails.event',
        model: EventModel
      }]
    })

    return {
      results: notifications,
      total
    }
  }

  static async markAllAsRead(ids) {
    const idsToUpdate = ids.map(id => new Types.ObjectId(id))

    const { matchedCount } = await NotificationModel.updateOne({
      _id: {
        $in: idsToUpdate
      }
    }, {
      $set: {
        read: true,
      },
      $inc: {
        __v: 1
      }
    })

    if (matchedCount === 0) {
      throw new NotFoundError('Notifications do not exist')
    }
  }

  static async markAsRead(id) {
    const { matchedCount } = await NotificationModel.updateOne({
      _id: new Types.ObjectId(id)
    }, {
      $set: {
        read: true,
      },
      $inc: {
        __v: 1
      }
    })

    if (matchedCount === 0) {
      throw new NotFoundError('Notification does not exist')
    }
  }

  static async markAsSeen(id) {
    const { matchedCount } = await NotificationModel.updateOne({
      _id: new Types.ObjectId(id)
    }, {
      $set: {
        seen: true,
      },
      $inc: {
        __v: 1
      }
    })

    if (matchedCount === 0) {
      throw new NotFoundError('Notification does not exist')
    }
  }
}

module.exports = NotificationController