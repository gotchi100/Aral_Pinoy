'use strict'

const debug = require('debug')

const config = require('../config')

const EventModel = require('../models/events')
const NotificationModel = require('../models/notifications')
const UserModel = require('../models/users')
const NOTIFICATION_TYPES = require('../constants/notifications').TYPES

const SendgridMailController = require('../controllers/mail/sendgrid')

const logger = debug('api:cron:check-events-with-insufficient-volunteers')

const TWO_WEEK_MS = 1209600000

const INSUFFICIENT_THRESHOLD_RATE = 0.20 * 100

async function run() {
  logger('Running cron task')

  const today = new Date()
  const todayAfterTwoWeeks = new Date(Date.now() + TWO_WEEK_MS)
  logger(`Searching for events within date range: ${today.toJSON()} - ${todayAfterTwoWeeks.toJSON()}`)
  
  
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
  }, ['_id', 'name', 'goals'])

  if (events.length === 0) {
    logger('No events found within date range')

    return
  }

  const users = await UserModel.find({
    roles: {
      $in: ['admin','officer']
    }
  }, ['_id', 'email'])

  if (users.length === 0) {
    logger('No users found')

    return
  }

  const insufficientEvents = []

  for (const event of events) {
    const {
      current,
      target
    } = event.goals.numVolunteers

    const goalPercentage = (current / target) * 100

    if (goalPercentage <= INSUFFICIENT_THRESHOLD_RATE) {
      insufficientEvents.push(event)
    }
  }

  if (insufficientEvents.length === 0) {
    logger('No events found with insufficient volunteers')

    return
  }

  for (const event of insufficientEvents) {
    const eventId = event._id

    const eventUrl = new URL(`/#/events/${eventId.toString()}`, config.volunteer.domainName).href

    for (const user of users) {
      const userId = user._id

      const { upsertedCount } = await NotificationModel.updateOne({
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

      if (upsertedCount > 0) {
        SendgridMailController.sendInsufficientEventVolunteersEmail({
          to: user.email
        }, {
          name: event.name,
          url: eventUrl
        })
          .then(() => {
            logger(`Email sent to ${user._id.toString()}`)

          })
          .catch(console.error)
      }
    }
  }

  logger('Task ended successfully')
}

module.exports = function (agenda) {
  agenda.define('check events with insufficient volunteers', run)
}