'use strict'

const { Calendar } = require('@googleapis/calendar').calendar_v3

const GoogleOAuth = require('../../google/oauth')

const config = require('../../config')

class GoogleCalendarController {
  constructor() {
    this.calendar = new Calendar({
      auth: GoogleOAuth.auth
    })
  }

  /**
   * 
   * @param {Object} eventDetails 
   * @param {string} eventDetails.address
   * @param {string} eventDetails.description
   * @param {string[]} eventDetails.attendees
   * @param {Date} eventDetails.startDate
   * @param {Date} eventDetails.endDate
   * @param {Object} [eventDetails.metadata]
   * @param {string} [eventDetails.metadata.eventId]
   */
  async createEvent(eventDetails) {
    const {
      summary,
      address,
      description,
      attendees,
      startDate,
      endDate,
      metadata
    } = eventDetails

    const calendarEvent = {
      calendarId: 'primary',
      sendUpdates: 'all',
      requestBody: {
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
        visibility: 'private'
      }
    }

    if (metadata !== undefined && metadata.eventId !== undefined) {
      calendarEvent.requestBody.source = {
        title: 'Aral Pinoy Admin Event Details',
        url: `${config.admin.domainName}/#/events/${metadata.eventId}`
      }
    }

    await this.calendar.events.insert(calendarEvent)
  }
}

module.exports = new GoogleCalendarController()