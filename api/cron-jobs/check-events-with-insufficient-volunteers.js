'use strict'

const { Types } = require('mongoose')

const EventModel = require('../models/events')
const NotificationModel = require('../models/notifications')
const UserModel = require('../models/users')
const NOTIFICATION_TYPES = require('../constants/notifications').TYPES

const TWO_WEEK_MS = 1209600000

const INSUFFICIENT_THRESHOLD_RATE = 0.20 * 100

async function run() {
  const today = new Date()
  const todayAfterTwoWeeks = new Date(Date.now() + TWO_WEEK_MS)
  
  // TODO: Let database calculate the insufficient event volunteers
  const events = await EventModel.find({
    status: 'UPCOMING',
    'date.start': {
      $gte: today,
      $lte: todayAfterTwoWeeks
    },
    'goals.numVolunteers.target': {
      $gt: 0
    }
  }, ['_id', 'goals'])

  if (events.length === 0) {
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

  const insufficientEventIds = []

  for (const event of events) {
    const {
      current,
      target
    } = event.goals.numVolunteers

    const goalPercentage = (current / target) * 100

    if (goalPercentage <= INSUFFICIENT_THRESHOLD_RATE) {
      insufficientEventIds.push(event._id)
    }
  }

  if (insufficientEventIds.length === 0) {
    return
  }

  for (const eventId of insufficientEventIds) {
    for (const user of users) {
      const userId = new Types.ObjectId(user._id)

      await NotificationModel.updateOne({
        user: userId,
        type: NOTIFICATION_TYPES.EVENT_VOLUNTEERS_NEEDED,
        'typeDetails.event': eventId
      }, {
        $setOnInsert: {
          user: userId,
          seen: false,
          read: false,
          type: NOTIFICATION_TYPES.EVENT_VOLUNTEERS_NEEDED,
          typeDetails: {
            event: eventId
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
  agenda.define('check events with insufficient volunteers', run)
}