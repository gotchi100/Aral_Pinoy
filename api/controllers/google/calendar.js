'use strict'

const { Calendar } = require('@googleapis/calendar').calendar_v3

const GoogleOAuth = require('../../google/oauth')

const config = require('../../config')

const {
  STATUSES: EVENT_STATUSES
} = require('../../constants/events')

/** @typedef {import('@googleapis/calendar').calendar_v3.Schema$Event} Event */
/** @typedef {import('@googleapis/calendar').calendar_v3.Schema$EventAttendee} EventAttendee */

const EVENT_STATUS_TO_CALENDAR_MAPPING = {
  [EVENT_STATUSES.CANCELED] : 'cancelled'
}

class GoogleCalendarController {
  constructor() {
    this.calendar = new Calendar({
      auth: GoogleOAuth.auth
    })
  }

  /**
   * 
   * @param {Object} eventDetails
   * @param {string} eventDetails.id
   * @param {string} eventDetails.address
   * @param {string} eventDetails.description
   * @param {string[]} eventDetails.attendees
   * @param {Date} eventDetails.startDate
   * @param {Date} eventDetails.endDate
   */
  async createEvent(eventDetails) {
    const {
      id,
      summary,
      address,
      description,
      attendees,
      startDate,
      endDate,
    } = eventDetails

    const calendarEvent = {
      calendarId: 'primary',
      sendUpdates: 'all',
      requestBody: {
        id,
        summary,
        location: address,
        description,
        attendees,
        start: {
          dateTime: startDate.toJSON(),
          timeZone: 'Asia/Manila'
        },
        end: {
          dateTime: endDate.toJSON(),
          timeZone: 'Asia/Manila'
        },
        guestsCanInviteOthers: false,
        guestsCanSeeOtherGuests: false,
        visibility: 'private',
        source: {
          title: 'Aral Pinoy Admin Event Details',
          url: `${config.admin.domainName}/#/events/${id}`
        }
      }
    }

    await this.calendar.events.insert(calendarEvent)
  }

  /**
   * 
   * @param {string} id 
   * @returns {Promise<Event>}
   */
  async getEvent(id) {
    const { data } = await this.calendar.events.get({
      calendarId: 'primary',
      eventId: id,
    })

    return data
  }

  /**
   * 
   * @param {string} id
   * @param {EventAttendee[]} attendees
   */
  async updateEventAttendees(id, attendees) {
    const calendarEvent = {
      calendarId: 'primary',
      eventId: id,
      sendUpdates: 'all',
      requestBody: {
        attendees
      }
    }

    await this.calendar.events.patch(calendarEvent)
  }

  /**
   * 
   * @param {string} id
   * @param {string} status
   */
  async updateEventStatus(id, status) {
    const mappedStatus = EVENT_STATUS_TO_CALENDAR_MAPPING[status]

    if (mappedStatus === undefined) {
      throw new Error(`Unknown calendar event status: ${status}`)
    }

    const calendarEvent = {
      calendarId: 'primary',
      eventId: id,
      sendUpdates: 'all',
      requestBody: {
        status: mappedStatus
      }
    }

    await this.calendar.events.patch(calendarEvent)
  }
}

module.exports = new GoogleCalendarController()