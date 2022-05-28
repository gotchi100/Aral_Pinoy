'use strict'

const { startOfDay, endOfDay } = require('date-fns')

const EventModel = require('../../models/events')

class ReportEventsController {
  /**
   * 
   * @param {Object} dateRange Date range object
   * @param {Date} dateRange.start Start date
   * @param {Date} dateRange.end End date
   * @returns 
   */
  static async get(dateRange) {
    const {
      start,
      end
    } = dateRange

    const events = await EventModel.find({
      $and: [{
        status: 'ENDED',
      }, {
        'date.start': {
          $lte: startOfDay(start),
        }
      }, {
        'date.start': {
          $gte: endOfDay(end),
        }
      }]
    }, ['_id', 'name', 'date'], {
      lean: true
    })

    return events
  }
}

module.exports = ReportEventsController