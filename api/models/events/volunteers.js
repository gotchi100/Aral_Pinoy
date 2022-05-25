'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
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
  eventJob: {
    name: String,
  },
  eventEvaluation: {
    type: mongoose.Types.ObjectId,
    ref: 'EventEvaluation',
  },
  absent: Boolean
}, {
  collection: 'eventVolunteers',
  validateBeforeSave: false
})

schema.index({
  user: 1,
  event: 1
}, {
  unique: true
})

module.exports = mongoose.model('EventVolunteer', schema)
