'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    text: true
  },
  email: String,
  norm: {
    type: String,
    unique: true,
    select: false
  },
  description: String
}, {
  collection: 'inkindDonationDonors',
  validateBeforeSave: false
})

module.exports = mongoose.model('InkindDonationDonor', schema)
