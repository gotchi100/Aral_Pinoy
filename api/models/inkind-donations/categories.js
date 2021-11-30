'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    text: true
  },
  norm: {
    type: String,
    unique: true,
    select: false
  },
  description: String,
  customFields: {
    bestBeforeDate: {
      type: Boolean,
      default: false
    },
    expirationDate: {
      type: Boolean,
      default: false
    },
  }
}, {
  collection: 'inkindDonationCategories',
  validateBeforeSave: false
})

module.exports = mongoose.model('InkindDonationCategory', schema)
