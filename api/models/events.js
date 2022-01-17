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
  name: String,
  description: String,
  imageUrl: String,
  questions: [sdgQuestionSchema]
}, {
  _id: false,
  validateBeforeSave: false
})

const contactMethodSchema = new mongoose.Schema({
  type: String,
  value: String
}, {
  _id: false,
  validateBeforeSave: false
})

const contactSchema = new mongoose.Schema({
  name: String,
  contactMethods: [contactMethodSchema]
}, {
  _id: false,
  validateBeforeSave: false
})

const ikdSchema = new mongoose.Schema({
  item: {
    sku: String,
    name: String,
    category: {
      name: String
    }
  },
  quantity: Number
}, {
  _id: false,
  validateBeforeSave: false
})

const skillSchema = new mongoose.Schema({
  name: String,
  norm: String,
  description: String,
}, {
  _id: false,
  validateBeforeSave: false
})

const jobSchema = new mongoose.Schema({
  name: String,
  description: String,
  slots: {
    current: {
      type: Number,
      default: 0
    },
    max: Number
  },
  skills: {
    type: [skillSchema],
    default: []
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
  name: {
    type: String,
    text: true
  },
  description: String,
  status: {
    type: String,
    default: 'UPCOMING'
  },
  date: {
    start: Date,
    end: Date
  },
  logoUrl: String,
  goals : {
    numVolunteers: {
      current: {
        type: Number,
        default: 0
      },
      target: Number,
    },
    monetaryDonation: {
      current: {
        type: Number,
        default: 0,
        get: getMonetaryDonation,
        set: setMonetaryDonation
      },
      target: {
        type: Number,
        get: getMonetaryDonation,
        set: setMonetaryDonation
      }
    }
  },
  location: {
    name: String
  },
  contacts: {
    type: [contactSchema],
    default: undefined
  },
  sdgs: {
    type: [sdgSchema],
    default: undefined
  },
  ikds: {
    type: [ikdSchema],
    default: undefined
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
  id: false,
  validateBeforeSave: false,
  toObject: {
    getters: true
  },
  toJSON: {
    getters: true
  }
})

module.exports = mongoose.model('Event', schema)
