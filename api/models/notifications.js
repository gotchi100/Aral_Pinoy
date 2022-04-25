'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  seen: {
    type: Boolean,
  },
  read: {
    type: Boolean
  },
  type: {
    type: String
  },
  typeDetails: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Notification', schema)
