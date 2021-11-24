'use strict'

const mongoose = require('mongoose')

function setMonetaryDonation(value) {
  return value * 1000
}

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

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    text: true
  },
  description: {
    type: String
  },
  date: {
    start: {
      type: Date
    },
    end: {
      type: Date
    }
  },
  logoUrl: {
    type: String
  },
  goals : {
    numVolunteers: {
      type: Number
    },
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
}, {
  id: false,
  validateBeforeSave: false
})

module.exports = mongoose.model('Event', eventSchema)
