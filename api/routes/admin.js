'use strict'

const express = require('express')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

const UserModel = require('../models/users')
const config = require('../config')

const router = express.Router()
const loginValidator = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
})

router.post(
  '/login', 
  function (req, res, next) {
    const { value: validatedBody, error } = loginValidator.validate(req.body)

    if (error !== undefined) {      
      return res.status(400).json({
        code: 'BadRequest',
        status: 400,
        message: error.message
      })
    }

    req.body = validatedBody

    next()
  },
  async function (req, res, next) {
    const {
      email,
      password
    } = req.body

    try {
      const user = await UserModel.findOne({
        email,
        roles: {
          $in: ['Admin','Officer']
        }
      }, '+password', {
        lean: true
      })
  
      if (user === null || user.password !== password) {
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
  })

module.exports = router
