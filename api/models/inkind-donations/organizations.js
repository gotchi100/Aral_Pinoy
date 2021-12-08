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
  description: String
}, {
  collection: 'inkindDonationOrganizations',
  validateBeforeSave: false
})

module.exports = mongoose.model('InkindDonationOrganization', schema)
