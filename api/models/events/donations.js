'use strict'

const mongoose = require('mongoose')

function getAmount(value) {
  return value / 1000
}

function setAmount(value) {
  return value * 1000
}

const schema = new mongoose.Schema({
  _id: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    index: true
  },
  event: {
    type: mongoose.Types.ObjectId,
    ref: 'Event',
    index: true
  },
  paymaya: {
    paymentId: String,
    canVoid: Boolean,
    canRefund: Boolean,
    reason: String,
  },
  amount: {
    type: Number,
    get: getAmount,
    set: setAmount
  },
  status: String,
  _creationExpiry: {
    type: Date,
    expires: 3600
  },
  metadata: {
    contactDetails: {
      firstName: String,
      middleName: String,
      lastName: String,
      email: String,
      phone: String,
    }
  }
}, {
  collection: 'eventDonations',
  validateBeforeSave: false,
  toObject: {
    getters: true
  },
  toJSON: {
    getters: true
  },
  timestamps: true
})

module.exports = mongoose.model('EventDonation', schema)
