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
  skills: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'Skill'
    }],
    default: []
  }
}, {
  collection: 'eventJobs',
  validateBeforeSave: false
})

module.exports = mongoose.model('EventJob', schema)
