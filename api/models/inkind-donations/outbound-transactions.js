'use strict'

const mongoose = require('mongoose')

const contactMethodSchema = new mongoose.Schema({
  type: String,
  value: String
}, {
  _id: false,
  validateBeforeSave: false
})

const organizationContactSchema = new mongoose.Schema({
  name: String,
  contactMethods: [contactMethodSchema]
}, {
  _id: false,
  validateBeforeSave: false
})

const schema = new mongoose.Schema({
  status: {
    type: String,
    default: 'PENDING'
  },
  quantity: Number,
  date: Date,
  item: {
    sku: String,
    name: String,
    category: {
      name: String
    },
  },
  receiver: {
    type: {
      type: String
    },
    event: {
      type: mongoose.Types.ObjectId,
      ref: 'Event'
    },
    organization: {
      name: String,
      contacts: {
        type: [organizationContactSchema],
        default: undefined
      }
    }
  }
}, {
  collection: 'inkindDonationOutboundTransactions',
  validateBeforeSave: false
})

module.exports = mongoose.model('InkindDonationOutboundTransaction', schema)
