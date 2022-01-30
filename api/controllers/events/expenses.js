'use strict'

const { Types } = require('mongoose')

const EventExpenseModel = require('../../models/events/expenses')

const { 
  NotFoundError,
} = require('../../errors')

class EventExpenseController {
  static async list(options = {}) {
    const {
      limit,
      offset,
      filters: {
        eventId
      }
    } = options

    const matchQuery = {}
    const queryOptions = { 
      limit,
      skip: offset
    }

    if (eventId !== undefined) {
      matchQuery.event = new Types.ObjectId(eventId)
    }

    const [expenses, total] = await Promise.all([
      EventExpenseModel.find(matchQuery, undefined, queryOptions),
      EventExpenseModel.countDocuments(matchQuery)
    ])

    return {
      results: expenses,
      total
    }
  }

  static async get(id) {
    const expense = await EventExpenseModel.findById(id, undefined, {
      lean: true,
      populate: ['event']
    })

    if (expense === null) {
      throw new NotFoundError('event_expense')
    }

    return expense
  }
}

module.exports = EventExpenseController