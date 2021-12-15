'use strict'

const { addHours } = require('date-fns')

const UserModel = require('../models/users')
const ForgotPasswordTokenModel = require('../models/forgot-password-tokens')

const SendgridMailController = require('../controllers/mail/sendgrid')

const { 
  BadRequestError,
  NotFoundError,
  ConflictError
} = require('../errors')

const config = require('../config')

class ForgotPasswordController {
  static async create (email, origin) {
    let roles
    let domainName
    
    if (origin === 'admin') {
      roles = {
        $in: ['admin','officer']
      }
      domainName = config.admin.domainName
    } else if (origin === 'volunteer') {
      roles = 'volunteer'
      domainName = config.volunteer.domainName
    } else {
      throw new BadRequestError(`Invalid origin: ${origin}`)
    }

    const user = await UserModel.findOne({
      email,
      roles
    }, ['email'], {
      lean: true
    })

    if (user === null) {
      throw new NotFoundError(`User does not exist: ${email}`)
    }

    const today = new Date()

    let token = await ForgotPasswordTokenModel.findOne({
      email,
      expiresAt: {
        $gt: today
      }
    }, ['_id'], {
      lean: true
    })

    if (token === null) {
      token = await ForgotPasswordTokenModel.create({
        email,
        createdAt: today,
        expiresAt: addHours(today, 1)
      })
    }

    const queryString = new URLSearchParams()

    queryString.set('token', token._id)

    await SendgridMailController.sendResetPasswordRequest(email, `${domainName}/#/reset-password?${queryString.toString()}`)
  }

  static async resetPassword (id, password) {
    const token = await ForgotPasswordTokenModel.findOne({
      _id: id,
      expiresAt: {
        $gt: new Date()
      }
    }, ['email'], {
      lean: true
    })

    if (token === null) {
      throw new ConflictError('Password reset token has expired')
    }

    const updateResults = await UserModel.updateOne({
      email: token.email
    }, {
      $set: {
        password
      }
    })

    if (updateResults.matchedCount === 0) {
      throw new NotFoundError('Email no longer exists')
    }

    await ForgotPasswordTokenModel.deleteOne({
      _id: id
    })

    await SendgridMailController.sendResetPasswordSuccess(token.email)
  }
}

module.exports = ForgotPasswordController