'use strict'

const InkindDonationTransactionModel = require('../../models/inkind-donations/transactions')
const InkindDonationModel = require('../../models/inkind-donations')

const { TRANSACTION_STATUSES } = require('../../constants/inkind-donations')

const { 
  BadRequestError,
  NotFoundError, 
  ConflictError
} = require('../../errors')

class InkindDonationTransactionsController {
  static async create(transaction) {
    const {
      sku,
      quantity,
      date
    } = transaction
    
    const item = await InkindDonationModel.findOne({
      sku
    }, ['name', 'category', '__v'], {
      lean: true
    })
    
    if (item === null) {
      throw new NotFoundError(`In-Kind Donation does not exist: ${sku}`)
    }
    
    const createdTransaction = await InkindDonationTransactionModel.create({
      item: {
        sku,
        name: item.name,
        category: item.category
      },
      quantity,
      date: new Date(date),
    })
    
    return createdTransaction.toObject({ 
      minimize: true,
      versionKey: false,
    })
  }

  static async list(query) {
    const {
      limit,
      offset
    } = query

    const [transactions, total] = await Promise.all([
      InkindDonationTransactionModel.find(undefined, undefined, { 
        lean: true,
        limit,
        skip: offset
      }),
      InkindDonationTransactionModel.countDocuments()
    ])

    return {
      results: transactions,
      total
    }
  }

  static async get(id) {
    const transaction = await InkindDonationTransactionModel.findById(id, undefined, { lean: true })

    if (transaction === null) {
      throw new NotFoundError(`In-kind donation transaction does not exist: ${id}`)
    }

    return transaction
  }

  static async updateStatus(id, status) {
    const transaction = await InkindDonationTransactionModel.findById({
      _id: id,
    }, [
      '__v',
      'type',
      'quantity',
      'status',
      'item.sku'
    ], {
      lean: true
    })

    if (transaction === null) {
      throw new NotFoundError(`In-kind donation transaction does not exist: ${id}`)
    }

    if (transaction.status === status) {
      return
    }

    if (transaction.status !== TRANSACTION_STATUSES.PENDING) {
      throw new BadRequestError(`Transaction cannot be updated: Status is "${transaction.status}"`)
    } 

    if (status !== TRANSACTION_STATUSES.RETURNED) {
      const item = await InkindDonationModel.findOne({
        sku: transaction.item.sku,
      }, ['__v'], {
        lean: true
      })
  
      if (item === null) {
        throw new NotFoundError(`In-kind donation SKU item does not exist: ${transaction.item.sku}`)
      }
      
      const itemUpdateResults = await InkindDonationModel.updateOne({
        sku: transaction.item.sku,
        __v : item.__v
      }, {
        $inc: {
          quantity: transaction.quantity,
          __v : 1
        }
      })
  
      if (itemUpdateResults.matchedCount === 0) {
        throw new ConflictError('In-kind donation was updated, please try again')
      }
    }

    const transactionResults = await InkindDonationTransactionModel.updateOne({
      _id: id,
      __v: transaction.__v
    }, {
      $set: {
        status
      },
      $inc: {
        __v : 1
      }
    })

    if (transactionResults.matchedCount === 0) {
      throw new ConflictError('Transaction was already updated, please try again')
    }
  }
}

module.exports = InkindDonationTransactionsController