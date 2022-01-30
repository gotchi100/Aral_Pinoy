'use strict'

const mongoose = require('mongoose')

function getAmount(value) {
  return value / 1000
}

function setAmount(value) {
  return value * 1000
}

const schema = new mongoose.Schema({
  event: {
    type: mongoose.Types.ObjectId,
    ref: 'Event',
    index: true
  },
  type: {
    type: String
  },
  typeNorm: {
    type: String,
  },
  amount: {
    type: Number,
    get: getAmount,
    set: setAmount
  },
  remarks: String
}, {
  collection: 'eventExpenses',
  validateBeforeSave: false,
  toObject: {
    getters: true
  },
  toJSON: {
    getters: true
  },
  timestamps: true
})

module.exports = mongoose.model('EventExpense', schema)
