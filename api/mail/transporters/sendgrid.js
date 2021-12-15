'use strict'

const BaseTransporter = require('./base')
const config = require('../../config')

class SendgridTransporter extends BaseTransporter {
  constructor() {
    const { user, pass } = config.smtp.sendgrid.auth
    
    super('smtp.sendgrid.net', 587, {
      user,
      pass
    })
  }

  get noReplyFromAddress() {
    return 'noreply@aralpinoy.xyz'
  }

  get supportFromAddress() {
    return 'support@aralpinoy.xyz'
  }

  sendResetPasswordRequest(to, url) {
    return this.transporter.sendMail({
      from: this.noReplyFromAddress,
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
      from: this.supportFromAddress,
      to,
      replyTo: 'aralpinoycapstone@gmail.com',
      subject: 'Password has been reset',
      template: 'reset-password-success'
    })
  }
}

module.exports = SendgridTransporter