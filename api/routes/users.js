'use strict'

const express = require('express')
const { Types } = require('mongoose')
const Joi = require('joi')

const UserModel = require('../models/users')

const router = express.Router()
const createUserValidator = Joi.object({
  email: Joi.string().email().trim().lowercase().max(256).required(),
  password: Joi.string().max(64).required(),
  contactNumber: Joi.string().trim().max(20),
  firstName: Joi.string().trim().max(100).required(),
  middleName: Joi.string().trim().max(100),
  lastName: Joi.string().trim().max(100).required()
})

router.post(
  '/',
  function (req, res, next) {
    const { value: validatedBody, error } = createUserValidator.validate(req.body)

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
    user.roles = ['Officer']

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

router.get(
  '/:id',
  function (req, res, next) {
    const { id } = req.params

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        code: 'BadRequest',
        status: 400,
        message: 'ID is invalid'
      })
    }

    next()
  },
  async function(req, res, next) {
    const { id } = req.params

    const user = await UserModel.findById(id, undefined, { lean: true })

    if (user === null) {
      return res.status(404).json({
        code: 'NotFound',
        status: 404,
        message: 'User not found'
      })
    }

    res.json(user)

    next()
  }
)

module.exports = router
