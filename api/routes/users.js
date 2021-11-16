'use strict'

const express = require('express')
const { Types } = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const UsersController = require('../controllers/users')

const createUserValidator = Joi.object({
  email: Joi.string().email().trim().lowercase().max(256).required(),
  password: Joi.string().max(64).required(),
  contactNumber: Joi.string().trim().max(20),
  firstName: Joi.string().trim().max(100).required(),
  middleName: Joi.string().trim().max(100),
  lastName: Joi.string().trim().max(100).required(),
  gender: Joi.string().valid('Male', 'Female'),
  birthDate: Joi.date().iso(),
  address: Joi.object({
    home: Joi.string().trim().max(256)
  }),
  skills: Joi.array().items(Joi.objectId()).unique()
})

const paginationValidator = Joi.object({
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).default(25),
  'filters.roles': Joi.array().items(Joi.string().valid('admin', 'officer', 'volunteer')).unique()
}).options({ 
  stripUnknown: true
})

function validateCreateUserBody(req, res, next) {
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
}

function validateListUsersBody(req, res, next) {
  const { value: validatedQuery, error } = paginationValidator.validate(req.query)

  if (error !== undefined) {      
    return res.status(400).json({
      code: 'BadRequest',
      status: 400,
      message: error.message
    })
  }

  req.query = validatedQuery

  next()
}

function validateGetUserBody(req, res, next) {
  const { id } = req.params

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      code: 'BadRequest',
      status: 400,
      message: 'ID is invalid'
    })
  }

  next()
}

const router = express.Router()

router.post('/', validateCreateUserBody, UsersController.create)
router.get('/', validateListUsersBody, UsersController.list)
router.get('/:id', validateGetUserBody, UsersController.get)

module.exports = router
