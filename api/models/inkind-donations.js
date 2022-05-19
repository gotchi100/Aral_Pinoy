'use strict'

const mongoose = require('mongoose')

const inkindDonationSchema = new mongoose.Schema({
  sku: String,
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
  group: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedOn: Date
}, {
  collection: 'inkindDonations',
  validateBeforeSave: false
})

inkindDonationSchema.index({
  skuText: 'text',
  name: 'text'
})

inkindDonationSchema.index({
  sku: 1
}, {
  unique: 1,
  partialFilterExpression: {
    deleted: false
  }
})

module.exports = mongoose.model('InkindDonation', inkindDonationSchema)
