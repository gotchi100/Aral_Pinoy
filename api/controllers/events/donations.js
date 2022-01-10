'use strict'

const { Types } = require('mongoose')

const EventDonationModel = require('../../models/events/donations')
const UserModel = require('../../models/users')
const EventModel = require('../../models/events')

const PaymayaClient = require('../../clients/paymaya')

const { ConflictError, NotFoundError } = require('../../errors')

const PAYMAYA_PAYMENT_STATUS_MAP = {
  PAYMENT_SUCCESS: 'success',
  PAYMENT_FAILED: 'failed',
  PAYMENT_CANCELLED: 'canceled'
}

const PAYMAYA_PAYMENT_DELETE_MAP = {
  void: 'canVoid',
  refund: 'canRefund'
}

const PAYMAYA_PAYMENT_DELETE_STATUS_MAP = {
  void: 'voided',
  refund: 'refunded'
}

const SORT_ORDER_MAPPING = {
  asc : 1,
  desc: -1
}

class EventDonationController {
  static async create(eventDonation) {
    const {
      eventId,
      userId,
      amount,
      referenceNumber,
      metadata
    } = eventDonation

    const event = await EventModel.findById(eventId, ['_id', 'status'])

    if (event === null) {
      throw new NotFoundError(`Event does not exist: ${eventId}`)
    }

    if (event.status === 'ENDED' || event.status === 'CANCELED') {
      throw new ConflictError(`Unable to donate to event: Event is [${event.status}]`)
    }

    let user

    if (userId !== undefined) {
      user = await UserModel.findById(userId, ['_id'], {
        lean: true
      })

      if (user === null) {
        throw new NotFoundError(`User does not exist: ${userId}`)
      }
    }

    try {
      const results = await EventDonationModel.create({
        _id: referenceNumber,
        _creationExpiry: new Date(),
        amount,
        user,
        event,
        metadata
      })
  
      return results.toObject({
        minimize: true,
        versionKey: false,
        useProjection: true
      })
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError('Event donation already exists')
      }

      throw error
    }
  }

  static async list(options = {}) {
    const {
      limit,
      offset,
      expand,
      sort,
      filters: {
        status,
        userId,
        eventId
      }
    } = options

    const matchQuery = {}

    const queryOptions = { 
      limit,
      skip: offset
    }

    if (status !== undefined) {
      matchQuery.status = status
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

    if (sort !== undefined) {
      const { field, order } = sort

      queryOptions.sort = {
        [field]: SORT_ORDER_MAPPING[order]
      }
    }

    const [donations, total] = await Promise.all([
      EventDonationModel.find(matchQuery, undefined, queryOptions),
      EventDonationModel.countDocuments(matchQuery)
    ])

    return {
      results: donations,
      total
    }
  }

  static async updateStatus(id) {
    const eventDonation = await EventDonationModel.findById(id, [
      '__v',
      'amount',
      'status',
      'event'
    ], {
      populate: ['event']
    })

    if (eventDonation === null) {
      throw new NotFoundError(`Event donation does not exist: ${id}`)
    }

    if (eventDonation.status !== undefined) {
      throw new ConflictError(`Unable to update event donation: Status is [${eventDonation.status}]`)
    }

    const paymayaPayment = await EventDonationController.getPaymayaPaymentByReferenceNumber(id)
    const status = PAYMAYA_PAYMENT_STATUS_MAP[paymayaPayment.status]

    if (status === undefined) {
      throw new Error(`Unable to determine payment status: ${paymayaPayment.status}`)
    }

    if (status === eventDonation.status) {
      return
    }
    
    if (status === 'success') {
      const event = eventDonation.event
    
      const eventUpdateResults = await EventModel.updateOne({
        _id: event._id,
        __v: event.__v
      }, {
        $inc: {
          __v : 1,

          'goals.monetaryDonation.current': eventDonation.amount
        }
      })

      if (eventUpdateResults.matchedCount === 0) {
        throw new ConflictError('Event was recently updated. Please try again')
      }
    }

    const updateResults = await EventDonationModel.updateOne({
      _id: id,
      __v: eventDonation.__v
    }, {
      $inc: {
        __v: 1
      },
      $unset: {
        _creationExpiry: 1
      },
      $set: {
        paymaya: {
          paymentId: paymayaPayment.id,
          canVoid: paymayaPayment.canVoid,
          canRefund: paymayaPayment.canRefund
        },
        status
      }
    })

    if (updateResults.matchedCount === 0) {
      throw new ConflictError('Event donation was recently updated. Please try again')
    }
  }

  static async delete(id, deleteDetails) {
    const {
      reason,
      type
    } = deleteDetails

    const eventDonation = await EventDonationModel.findById(id, [
      '__v', 
      'status', 
      'paymaya',
      'amount',
      'event'
    ], {
      populate: ['event']
    })

    if (eventDonation === null) {
      throw new NotFoundError(`Event donation does not exist: ${id}`)
    }

    if (eventDonation.status === undefined) {
      throw new ConflictError('Unable to update event donation: Status has not been updated')
    } else if (eventDonation.status !== 'success') {
      throw new ConflictError(`Unable to update event donation: Status is [${eventDonation.status}]`)
    }

    const deleteType = PAYMAYA_PAYMENT_DELETE_MAP[type]
    const canDelete = eventDonation.paymaya[deleteType]

    if (canDelete === undefined) {
      throw new Error(`Unable to determine payment delete type: ${type}`)
    }
    
    if (!canDelete) {
      throw new ConflictError(`Unable to [${type}] paymaya payment: Paymaya does not allow [${type}]`)
    }

    const event = eventDonation.event
    
    const eventUpdateResults = await EventModel.updateOne({
      _id: event._id,
      __v: event.__v
    }, {
      $inc: {
        __v : 1,
        'goals.monetaryDonation.current': -Math.abs(eventDonation.amount)
      }
    })

    if (eventUpdateResults.matchedCount === 0) {
      throw new ConflictError('Event was recently updated. Please try again')
    }

    if (type === 'void') {
      await EventDonationController.voidPaymayaPayment(eventDonation.paymaya.paymentId, reason)
    } else if (type === 'refund') {
      await EventDonationController.refundPaymayaPayment(eventDonation.paymaya.paymentId, {
        amount: eventDonation.amount,
        reason,
        referenceNumber: id
      })
    }

    const deleteStatus = PAYMAYA_PAYMENT_DELETE_STATUS_MAP[type]

    const updateResults = await EventDonationModel.updateOne({
      _id: id,
      __v: eventDonation.__v
    }, {
      $inc: {
        __v: 1
      },
      $set: {
        paymaya: {
          reason,
          canVoid: false,
          canRefund: false
        },
        status: deleteStatus
      }
    })

    if (updateResults.matchedCount === 0) {
      throw new ConflictError('Event donation was recently updated. Please try again')
    }
  }

  static async getPaymayaPaymentByReferenceNumber(id) {
    try {
      const payment = await PaymayaClient.getPaymentByReferenceNumber(id)

      return payment
    } catch (error) {
      if (!error.response) {
        throw error
      }

      const response = error.response

      if (!response.data) {
        throw error
      }

      const data = response.data

      if (!data) {
        throw error
      }

      if (data.code === 'PY0009') {
        throw new NotFoundError(`Reference number for Paymaya payment does not exist: ${id}`)
      }

      throw error
    }
  }

  static async voidPaymayaPayment(id, reason) {
    try {
      const results = await PaymayaClient.voidPayment(id, reason)

      return results
    } catch (error) {
      if (!error.response) {
        throw error
      }

      const response = error.response

      if (!response.data) {
        throw error
      }

      const data = response.data

      if (!data) {
        throw error
      }

      if (data.code === 'PY0045') {
        throw new NotFoundError('Paymaya payment is not available for void')
      }

      throw error
    }
  }

  static async refundPaymayaPayment(id, details) {
    const {
      amount,
      reason,
      referenceNumber,
    } = details

    const payload = {
      totalAmount: {
        amount,
        currency: 'PHP'
      },
      requestReferenceNumber: referenceNumber,
      reason
    }

    try {
      const results = await PaymayaClient.refundPayment(id, payload)

      return results
    } catch (error) {
      if (!error.response) {
        throw error
      }

      const response = error.response

      if (!response.data) {
        throw error
      }

      const data = response.data

      if (!data) {
        throw error
      }

      if (data.code === 'PY0047') {
        throw new NotFoundError('Paymaya payment is ineligible for refund.')
      }

      throw error
    }
  }
}

module.exports = EventDonationController