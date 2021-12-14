'use strict'

const BaseTransporter = require('./base')
const config = require('../../config')

class GmailTransporter extends BaseTransporter {
  constructor() {
    const { user, pass } = config.smtp.gmail.auth
    
    super('smtp.gmail.com', 587, {
      user,
      pass
    })
  }
}

module.exports = GmailTransporter