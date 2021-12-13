'use strict'

const mongoose = require('mongoose')

function setMonetaryDonation(value) {
  return value * 1000
}

const sdgQuestionSchema = new mongoose.Schema({
  label: String,
  type: {
    type: String
  }
}, {
  _id: false,
  validateBeforeSave: false
})

const sdgSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  questions: [sdgQuestionSchema]
}, {
  _id: false,
  validateBeforeSave: false
})

const contactPersonSchema = new mongoose.Schema({
  name: String,
  contactMethods: {
    email: String,
    mobile: String
  }
}, {
  _id: false,
  validateBeforeSave: false
})

const ikdSchema = new mongoose.Schema({
  item: {
    sku: String,
    name: String,
    category: {
      name: String
    }
  },
  quantity: Number
}, {
  _id: false,
  validateBeforeSave: false
})

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    text: true
  },
  description: String,
  status: String,
  date: {
    start: Date,
    end: Date
  },
  logoUrl: String,
  goals : {
    numVolunteers: Number,
    monetaryDonation: {
      type: Number,
      set: setMonetaryDonation
    }
  },
  location: {
    name: String
  },
  contactPersons: {
    type: [contactPersonSchema]
  },
  sdgs: [sdgSchema],
  ikds: [ikdSchema]
}, {
  id: false,
  validateBeforeSave: false
})

module.exports = mongoose.model('Event', eventSchema)
