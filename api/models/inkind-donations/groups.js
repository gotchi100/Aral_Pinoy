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
  }
}, {
  collection: 'inkindDonationGroups',
  validateBeforeSave: false
})

module.exports = mongoose.model('InkindDonationGroup', schema)
