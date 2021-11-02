'use strict'

const mongoose = require('mongoose')

const { Schema } = mongoose

const roleSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Role', roleSchema)
