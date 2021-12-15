'use strict'

const mongoose = require('mongoose')
const { nanoid } = require('nanoid')

function generateId() {
  return nanoid(30)
}

const schema = new mongoose.Schema({
  _id: {
    type: String,
    default: generateId
  },
  email: String,
  createdAt: {
    type: Date,
    expires: 3600
  },
  expiresAt: Date
}, {
  collection: 'forgotPasswordTokens',
  validateBeforeSave: false
})

module.exports = mongoose.model('ForgotPasswordToken', schema)
