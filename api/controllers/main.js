'use strict'

const argon = require('argon2')
const jwt = require('jsonwebtoken')

const UserModel = require('../models/users')
const config = require('../config')

class MainController {
  static async login (req, res, next) {
    const {
      email,
      password
    } = req.body

    try {
      const user = await UserModel.findOne({
        email,
        roles: 'volunteer'
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
  
      res.send({
        user,
        token
      })
    } catch (error) {
      next(error)
    }
  }

  static async register (req, res, next) {
    const {
      email,
      password,
      contactNumber,
      firstName,
      middleName,
      lastName
    } = req.body

    const user = new UserModel()

    user.email = email
    user.password = password
    user.contactNumber = contactNumber
    user.firstName = firstName
    user.middleName = middleName
    user.lastName = lastName
    user.roles = ['volunteer']

    try {
      await user.save()

      return res.status(201).json({
        email,
        contactNumber,
        firstName,
        middleName,
        lastName
      })
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.email === 1) {
        return res.status(400).json({
          code: 'EmailAlreadyExists',
          status: 400,
          message: `Duplicate email: ${error.keyValue.email}`
        })
      }

      next(error)
    }
  }
}

module.exports = MainController