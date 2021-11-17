'use strict'

const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    text: true
  },
  norm: {
    type: String,
    unique: true,
    select: false
  },
  description: String
})

module.exports = mongoose.model('Skill', skillSchema)
