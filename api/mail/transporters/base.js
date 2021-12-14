'use strict'

const path = require('path')

const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

class BaseTransporter {
  constructor(host, port, auth) {
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth,
    })

    this.transporter.use('compile', hbs({
      viewEngine: {
        defaultLayout: null,
      },
      viewPath: path.resolve(__dirname, '../templates')
    }))

    this.from = auth.user
  }

  async sendResetPasswordRequest(to, url) {
    await this.transporter.sendMail({
      from: this.from,
      to,
      subject: 'Reset your password',
      template: 'reset-password-request',
      context: {
        url
      }
    })
  }

  async sendResetPasswordSuccess(to) {
    await this.transporter.sendMail({
      from: this.from,
      to,
      subject: 'Password has been reset',
      template: 'reset-password-success'
    })
  }
}

module.exports = BaseTransporter
