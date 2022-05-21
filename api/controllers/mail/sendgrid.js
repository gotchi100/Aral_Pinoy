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

  static async sendIkdAcknowledgement(to, item) {
    await transporter.sendIkdAcknowledgement(to, item)
  }

  /**
   * Send event invitation email via SendGrid
   * @param {Object} email Email details
   * @param {string} email.to To address
   * @param {Object} event Event details
   * @param {string} event.name Event name
   * @param {string} event.url URL to the event
   */
  static async sendEventInvitation(email, event) {
    await transporter.sendEventInvitation(email, event)
  }
}

module.exports = SendgridMailController