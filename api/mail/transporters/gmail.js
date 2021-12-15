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

    this.from = user
  }

  sendResetPasswordRequest(to, url) {
    return this.transporter.sendMail({
      from: this.from,
      to,
      subject: 'Reset your password',
      template: 'reset-password-request',
      context: {
        url
      }
    })
  }

  sendResetPasswordSuccess(to) {
    return this.transporter.sendMail({
      from: this.from,
      to,
      subject: 'Password has been reset',
      template: 'reset-password-success'
    })
  }
}

module.exports = GmailTransporter