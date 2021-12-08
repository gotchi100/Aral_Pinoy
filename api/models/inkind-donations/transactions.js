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
    category: {
      name: String
    },
  },
  quantity: Number,
  date: Date
}, {
  collection: 'inkindDonationTransactions',
  validateBeforeSave: false
})

module.exports = mongoose.model('InkindDonationTransaction', schema)
