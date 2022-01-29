'use strict'

const { Types } = require('mongoose')

const MonetaryDonationModel = require('../models/monetary-donations')
const UserModel = require('../models/users')

const PaymayaClient = require('../clients/paymaya')

const { ConflictError, NotFoundError } = require('../errors')

const PAYMAYA_PAYMENT_STATUS_MAP = {
  PAYMENT_SUCCESS: 'success',
  PAYMENT_FAILED: 'failed',
  PAYMENT_CANCELLED: 'canceled'
}

const PAYMAYA_PAYMENT_REVERSE_MAP = {
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

class MonetaryDonationController {
  static async create(donation) {
    const {
      userId,
      amount,
      referenceNumber,
      metadata
    } = donation

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
      const results = await MonetaryDonationModel.create({
        _id: referenceNumber,
        status: 'pending',
        _creationExpiry: new Date(),
        amount,
        user,
        metadata
      })
  
      return results.toObject({
        minimize: true,
        versionKey: false,
        useProjection: true
      })
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError('duplicate_monetary_donation')
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
      }
    } = options

    const filterQuery = {}

    const queryOptions = { 
      limit,
      skip: offset
    }

    if (status !== undefined) {
      filterQuery.status = {
        $in: status
      }
    }

    if (userId !== undefined) {
      filterQuery.user = new Types.ObjectId(userId)
    }

    if (expand === true) {
      queryOptions.populate = ['user']
    }

    if (sort !== undefined) {
      const { field, order } = sort

      queryOptions.sort = {
        [field]: SORT_ORDER_MAPPING[order]
      }
    }

    const [donations, total] = await Promise.all([
      MonetaryDonationModel.find(filterQuery, undefined, queryOptions),
      MonetaryDonationModel.countDocuments(filterQuery)
    ])

    return {
      results: donations,
      total
    }
  }

  static async handleRedirection(id) {
    const donation = await MonetaryDonationModel.findById(id, [
      '__v',
      'amount',
      'status',
    ])

    if (donation === null) {
      throw new NotFoundError('monetary_donation')
    }

    if (donation.status === 'success') {
      return
    }

    const paymayaPayment = await MonetaryDonationController.getPaymayaPaymentByReferenceNumber(id)
    const status = PAYMAYA_PAYMENT_STATUS_MAP[paymayaPayment.status]

    if (status === undefined) {
      throw new Error(`Unable to determine payment status: ${paymayaPayment.status}`)
    }

    if (status === donation.status) {
      return
    }

    const updateResults = await MonetaryDonationModel.updateOne({
      _id: id,
      __v: donation.__v
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
        },
        status
      }
    })

    if (updateResults.matchedCount === 0) {
      throw new ConflictError('version_conflict')
    }
  }

  static async reverseDonation(id, details) {
    const {
      reason,
      type
    } = details

    const donation = await MonetaryDonationModel.findById(id, [
      '__v', 
      'status', 
      'paymaya',
      'amount'
    ])

    const paymayaPayment = await MonetaryDonationController.getPaymayaPaymentByReferenceNumber(id)

    const reverseType = PAYMAYA_PAYMENT_REVERSE_MAP[type]
    const canDelete = paymayaPayment[reverseType]
    
    if (!canDelete) {
      throw new ConflictError(`cannot_${type}`)
    }

    if (type === 'void') {
      await MonetaryDonationController.voidPaymayaPayment(donation.paymaya.paymentId, reason)
    } else if (type === 'refund') {
      await MonetaryDonationController.refundPaymayaPayment(donation.paymaya.paymentId, {
        amount: donation.amount,
        reason,
        referenceNumber: id
      })
    }

    const reverseStatus = PAYMAYA_PAYMENT_DELETE_STATUS_MAP[type]

    const updateResults = await MonetaryDonationModel.updateOne({
      _id: id,
      __v: donation.__v
    }, {
      $inc: {
        __v: 1
      },
      $set: {
        paymaya: {
          reason,
        },
        status: reverseStatus
      }
    })

    if (updateResults.matchedCount === 0) {
      throw new ConflictError('version_conflict')
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

module.exports = MonetaryDonationController