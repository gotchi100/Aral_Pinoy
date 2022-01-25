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

    this.volunteerUrl = new URL(config.volunteer.domainName)
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
      replyTo: 'support@aralpinoy.xyz',
      subject: 'Password has been reset',
      template: 'reset-password-success'
    })
  }

  sendIkdAcknowledgement(to, item) {
    return this.transporter.sendMail({
      from: this.supportFromAddress,
      to,
      replyTo: 'support@aralpinoy.xyz',
      subject: 'Thank you for your In-Kind Donation!',
      template: 'inkind-donation-acknowledgement',
      context: {
        item: {
          name: item.name,
          quantity: item.quantity,
          unit: item.unit
        },
        volunteerHref: this.volunteerUrl.href,
        volunteerDomain: this.volunteerUrl.hostname
      }
    })
  }
}

module.exports = SendgridTransporter