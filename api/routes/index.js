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
const registerValidator = Joi.object({
  email: Joi.string().email().trim().lowercase().max(256).required(),
  password: Joi.string().max(64).required(),
  contactNumber: Joi.string().trim().max(20),
  firstName: Joi.string().trim().max(100).required(),
  middleName: Joi.string().trim().max(100),
  lastName: Joi.string().trim().max(100).required()
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
        roles: 'Volunteer'
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

router.post(
  '/register',
  function (req, res, next) {
    const { value: validatedBody, error } = registerValidator.validate(req.body)

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
  async function(req, res, next) {
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
    user.roles = ['Volunteer']

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
)

module.exports = router
