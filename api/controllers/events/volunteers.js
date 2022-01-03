'use strict'

const { Types } = require('mongoose')

const EventVolunteerModel = require('../../models/events/volunteers')
const UserModel = require('../../models/users')
const EventModel = require('../../models/events')

const { ConflictError, NotFoundError } = require('../../errors')

class EventVolunteerController {
  static async create(userId, eventId, volunteerJob) {
    try {
      const user = await UserModel.findById(userId, ['_id'])

      if (user === null) {
        throw new NotFoundError(`User does not exist: ${userId}`)
      }

      const event = await EventModel.findById(eventId, ['__v', 'jobs'])

      if (event === null) {
        throw new NotFoundError(`Event does not exist: ${eventId}`)
      }

      if (event.jobs === undefined) {
        throw new ConflictError('Unable to volunteer to event: Event does not have any jobs')
      }

      const eventJobIndex = event.jobs.findIndex((job) => job.name === volunteerJob)

      if (eventJobIndex === -1) {
        throw new NotFoundError(`Event job does not exist: ${volunteerJob}`)
      }

      const eventJob = event.jobs[eventJobIndex]

      if (eventJob.slots.current >= eventJob.slots.max) {
        throw new ConflictError('Unable to volunteer to event: Job has already reached its maximum')
      }

      const eventUpdateResults = await EventModel.updateOne({
        _id: eventId,
        __v: event.__v
      }, {
        $inc: {
          __v: 1,
          [`jobs.${eventJobIndex}.slots.current`]: 1,
          'goals.numVolunteers.current': 1
        }
      })

      if (eventUpdateResults.matchedCount === 0) {
        throw new ConflictError('Event was updated. Please try again')
      }

      const results = await EventVolunteerModel.create({
        user: userId,
        event: eventId,
        eventJob: {
          name: volunteerJob
        }
      })
  
      return results.toObject({ 
        minimize: true,
        versionKey: false,
        useProjection: true
      })
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError('Volunteer is already associated to event')
      }
      
      throw error
    }
  }

  static async list(options = {}) {
    const {
      limit,
      offset,
      expand,
      filters: {
        userId,
        eventId
      }
    } = options

    const matchQuery = {}
    const queryOptions = { 
      lean: true,
      limit,
      skip: offset
    }

    if (userId !== undefined) {
      matchQuery.user = new Types.ObjectId(userId)
    }

    if (eventId !== undefined) {
      matchQuery.event = new Types.ObjectId(eventId)
    }

    if (expand === true) {
      queryOptions.populate = ['user', 'event']
    }

    const [eventVolunteers, total] = await Promise.all([
      EventVolunteerModel.find(matchQuery, undefined, queryOptions),
      EventVolunteerModel.countDocuments(matchQuery)
    ])

    return {
      results: eventVolunteers,
      total
    }
  }
}

module.exports = EventVolunteerController