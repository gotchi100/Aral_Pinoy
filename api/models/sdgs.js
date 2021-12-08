'use strict'

const mongoose = require('mongoose')

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
  imageUrl: String,
  questions: [sdgQuestionSchema]
}, {
  validateBeforeSave: false
})

module.exports = mongoose.model('Sdg', sdgSchema)
