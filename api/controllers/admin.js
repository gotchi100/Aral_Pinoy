'use strict'

const argon = require('argon2')
const jwt = require('jsonwebtoken')

const UserModel = require('../models/users')
const config = require('../config')

class AdminController {
  static async login (req, res, next) {
    const {
      email,
      password
    } = req.body

    try {
      const user = await UserModel.findOne({
        email,
        roles: {
          $in: ['admin','officer']
        }
      }, '+password', {
        lean: true
      })
  
      if (user === null) {
        return res.status(404).json({
          code: 'NotFound',
          status: 404,
          message: 'Invalid email address or password'
        })
      }

      const isPasswordMatching = await argon.verify(user.password, password)

      if (!isPasswordMatching) {
        return res.status(404).json({
          code: 'NotFound',
          status: 404,
          message: 'Invalid email address or password'
        })
      }

      const token = jwt.sign({
        sub : user._id,
      }, config.jwt.secret, {
        algorithm : 'HS256',
        expiresIn : '4h'
      })

      delete user.password
  
      return res.json({
        user,
        token
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AdminController