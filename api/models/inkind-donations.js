'use strict'

const mongoose = require('mongoose')

const inkindDonationSchema = new mongoose.Schema({
  sku: {
    type: String,
    unique: true
  },
  skuText: {
    type: String,
    select: false
  },
  name: String,
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
  group: String
}, {
  collection: 'inkindDonations',
  validateBeforeSave: false
})

inkindDonationSchema.index({
  skuText: 'text',
  name: 'text'
})

module.exports = mongoose.model('InkindDonation', inkindDonationSchema)
