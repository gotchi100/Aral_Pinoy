'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  status: {
    type: String,
    default: 'PENDING'
  },
  item: {
    sku: String,
    name: String,
    quantity: Number,
    category: {
      name: String
    },
  },
  reason: String,
  quantity: Number,
  date: Date,
  receiptImageUrl: String
}, {
  collection: 'inkindDonationTransactions',
  validateBeforeSave: false
})

module.exports = mongoose.model('InkindDonationTransaction', schema)
