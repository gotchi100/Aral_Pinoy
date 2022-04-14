'use strict'

const { Types } = require('mongoose')

const config = require('../../config')

const EventVolunteerModel = require('../../models/events/volunteers')
const UserModel = require('../../models/users')
const EventModel = require('../../models/events')

const GoogleCalendarController = require('../google/calendar')

const { ConflictError, NotFoundError } = require('../../errors')

class EventVolunteerController {
  static async create(userId, eventId, volunteerJob) {
    try {
      const user = await UserModel.findById(userId, ['_id', 'email'])

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

      EventVolunteerController.addGoogleCalendarAttendee(eventId, user.email).catch((error) => console.dir(error, { depth: null }))
  
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

  static async addGoogleCalendarAttendee(eventId, attendeeEmail) {
    if (config.environment.isDevelopment) {
      return
    }

    const calendarEvent = await GoogleCalendarController.getEvent(eventId)
    const attendees = calendarEvent.attendees.concat([{
      email: attendeeEmail,
      responseStatus: 'accepted'
    }])

    await GoogleCalendarController.updateEventAttendees(eventId, attendees)
  }

  static async list(options = {}) {
    const {
      limit,
      offset,
      expand,
      filters: {
        userId,
        eventId,
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
      queryOptions.populate = [
        {
          path: 'user'
        }, 
        {
          path: 'event',
        }]
    }

    const [eventVolunteers, eventVolunteersTotal] = await Promise.all([
      EventVolunteerModel.find(matchQuery, undefined, queryOptions),
      EventVolunteerModel.countDocuments(matchQuery)
    ])

    return {
      results: eventVolunteers,
      total: eventVolunteersTotal
    }

    // const results = []
    // let total = eventVolunteersTotal

    // for (const eventVolunteer of eventVolunteers) {
    //   console.log(eventVolunteer._id)
    //   if (eventVolunteer.event === null) {
    //     total -= 1

    //     continue
    //   }

    //   results.push(eventVolunteer)
    // }

    // return {
    //   results,
    //   total
    // }
  }

  static async delete(id, options = {}) {
    const { 
      returnDocument = false
    } = options

    const eventVolunteer = await EventVolunteerModel.findById(id, ['user', 'event', 'eventJob.name'], { 
      lean: true,
      populate: ['user', 'event']
    })

    if (eventVolunteer === null) {
      throw new NotFoundError(`Event volunteer does not exist: ${id}`)
    }

    const {
      user,
      event,
      eventJob: {
        name: jobName
      }
    } = eventVolunteer

    const jobIndex = event.jobs.findIndex((job) => job.name === jobName)

    if (jobIndex !== -1) {
      await EventVolunteerController.updateEventJob(event, jobIndex, -1)
    }

    const deleteResults = await EventVolunteerModel.deleteOne({
      _id: id,
    })

    if (deleteResults.deletedCount === 0) {
      throw new NotFoundError(`Event volunteer does not exist: ${id}`)
    }

    EventVolunteerController.removeGoogleCalendarAttendee(event._id.toString(), user.email).catch(console.error)

    if (returnDocument) {
      return eventVolunteer
    }
  }

  static async replace(id, volunteerJob) {
    const { 
      user: userId,
      event: eventId
    } = await EventVolunteerController.delete(id, {
      returnDocument: true
    })

    await EventVolunteerController.create(userId, eventId, volunteerJob)
  }

  static async removeGoogleCalendarAttendee(eventId, attendeeEmailToRemove) {
    if (config.environment.isDevelopment) {
      return
    }

    const calendarEvent = await GoogleCalendarController.getEvent(eventId)
    const attendees = calendarEvent.attendees.filter((attendee) => attendee.email !== attendeeEmailToRemove)

    await GoogleCalendarController.updateEventAttendees(eventId, attendees)
  }
  
  static async updateEventJob(event, jobIndex, value) {
    const eventUpdateResults = await EventModel.updateOne({
      _id: event._id,
      __v: event.__v,
      [`jobs.${jobIndex}.slots.current`]: {
        $gt: 0
      },
      'goals.numVolunteers.current': {
        $gt: 0
      }
    }, {
      $inc: {
        __v: 1,
        [`jobs.${jobIndex}.slots.current`]: value,
        'goals.numVolunteers.current': value
      }
    })

    if (eventUpdateResults.matchedCount === 0) {
      throw new ConflictError('Event was updated. Please try again')
    }
  }
}

module.exports = EventVolunteerController