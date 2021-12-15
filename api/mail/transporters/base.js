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
  }
}

module.exports = BaseTransporter
