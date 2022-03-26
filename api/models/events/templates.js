'use strict'

const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  name: String,
  description: String,
  requirements: {
    max: {
      type: Number,
      default: 1
    }
  },
  skills: {
    type: [mongoose.SchemaTypes.ObjectId],
    default: [],
    ref: 'Skill'
  }
}, {
  _id: false,
  validateBeforeSave: false
})

const questionSchema = new mongoose.Schema({
  label: String,
  type: {
    type: String
  }
}, {
  _id: false,
  validateBeforeSave: false
})

function getMonetaryDonation(value) {
  return value / 1000
}

function setMonetaryDonation(value) {
  return value * 1000
}

const schema = new mongoose.Schema({
  name: String,
  description: String,
  goals : {
    monetaryDonation: {
      type: Number,
      default: 0,
      get: getMonetaryDonation,
      set: setMonetaryDonation
    }
  },
  location: {
    name: String
  },
  sdgIds: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
  jobs: {
    type: [jobSchema],
    default: undefined
  },
  questions: {
    type: [questionSchema],
    default: undefined
  }
}, {
  collection: 'eventTemplates',
  id: false,
  validateBeforeSave: false,
  toObject: {
    getters: true
  },
  toJSON: {
    getters: true
  }
})

module.exports = mongoose.model('EventTemplate', schema)
