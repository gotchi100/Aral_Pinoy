'use strict'

const argon = require('argon2')
const jwt = require('jsonwebtoken')
const axios = require('axios').default
const base64 = require('base64-url')

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
  
      return res.json({
        user,
        token
      })
    } catch (error) {
      next(error)
    }
  }

  static async googleSignIn (req, res, next) {
    // TODO: Protect against CSRF
    // See more at https://developers.google.com/identity/protocols/oauth2/web-server#creatingclient 
    const { error, code } = req.query

    if (error) {
      return next(error)
    }

    try {
      const tokenResults = await axios.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: config.google.oauth.clientId,
        client_secret: config.google.oauth.clientSecret,
        redirect_uri: config.google.oauth.redirectUri,
        grant_type: 'authorization_code'
      })

      const { access_token } = tokenResults.data

      const userInfoResults = await axios.get('https://openidconnect.googleapis.com/v1/userinfo', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })

      const googleUser = userInfoResults.data

      let user = await UserModel.findOne({
        email: googleUser.email,
        roles: 'volunteer'
      }, undefined, {
        lean: true
      })

      if (user === null) {
        user = await UserModel.create({
          email: googleUser.email,
          firstName: googleUser.given_name,
          lastName: googleUser.family_name,
          roles: 'volunteer'
        })

        user = user.toObject()
      }

      const token = jwt.sign({
        sub : user._id,
      }, config.jwt.secret, {
        algorithm : 'HS256',
        expiresIn : '4h'
      })

      const queryString = new URLSearchParams()

      queryString.set('user', base64.encode(JSON.stringify(user)))
      queryString.set('token', token)

      return res.redirect(`${config.volunteer.google.oauth.redirectUri}?${queryString.toString()}`)
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