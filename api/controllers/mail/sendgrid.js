'use strict'

const SendgridTransporter = require('../../mail/transporters/sendgrid')

const transporter = new SendgridTransporter()

class SendgridMailController {
  static async sendResetPasswordRequest(to, url) {
    await transporter.sendResetPasswordRequest(to, url)
  }

  static async sendResetPasswordSuccess(to) {
    await transporter.sendResetPasswordSuccess(to)
  }
}

module.exports = SendgridMailController