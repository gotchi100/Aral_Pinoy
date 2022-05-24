'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  event: {
    type: mongoose.Types.ObjectId,
    ref: 'Event',
  },
  type: {
    type: String,
  },
  originalFilename: String,
  storagePath: String,
  url: String
}, {
  collection: 'eventDocumentations',
  validateBeforeSave: false,
  timestamps: true
})

module.exports = mongoose.model('EventDocumentations', schema)
