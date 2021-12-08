'use strict'

const mongoose = require('mongoose')

const inkindDonationSchema = new mongoose.Schema({
  sku: {
    type: String,
    unique: true
  },
  skuText: {
    type: String,
    text: true,
    select: false
  },
  name: {
    type: String,
    text: true
  },
  description: String,
  quantity: {
    type: Number,
    default: 0
  },
  unit: String,
  donor: String,
  category: {
    name: String,
    customFields: {}
  },
}, {
  collection: 'inkindDonations',
  validateBeforeSave: false
})

module.exports = mongoose.model('InkindDonation', inkindDonationSchema)
