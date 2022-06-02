'use strict'

const express = require('express')
const { Types } = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const UsersController = require('../controllers/users')
const { provinces, cities } = require('../constants/philippines')

const createUserValidator = Joi.object({
  email: Joi.string().email().trim().lowercase().max(256).required(), // TODO: Remove email from user update validation
  password: Joi.string().max(64).required(),
  firstName: Joi.string().trim().max(100).required(),
  middleName: Joi.string().trim().max(100),
  lastName: Joi.string().trim().max(100).required(),
  gender: Joi.string().valid('Male', 'Female'),
  birthDate: Joi.date().iso(),
  location: Joi.object({
    country: Joi.string().valid('PHILIPPINES'),
    province: Joi.string().valid(...provinces),
    city: Joi.string().valid(...cities),
  }),
  contactNumber: Joi.string().trim().max(20),
  skills: Joi.array().items(Joi.objectId()).unique()
})

const paginationValidator = Joi.object({
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).default(25),
  countVolunteeredEvents: Joi.boolean().default(false),
  'filters.roles': Joi.array().items(Joi.string().valid('admin', 'officer', 'volunteer')).unique(),
  'filters.name': Joi.string().trim().empty(''),
  'sort.field': Joi.string().valid('firstName', 'lastName', 'eventsVolunteeredCount'),
  'sort.order': Joi.string().valid('asc', 'desc')
}).options({ 
  stripUnknown: true
})

const updateUserValidator = Joi.object({
  email: Joi.string().email().trim().lowercase().max(256).empty(''),
  firstName: Joi.string().trim().max(100).empty(''),
  middleName: Joi.string().trim().max(100).empty('').allow(null),
  lastName: Joi.string().trim().max(100).empty(''),
  gender: Joi.string().valid('Male', 'Female'),
  birthDate: Joi.date().iso(),
  contactNumber: Joi.string().trim().max(20).empty('').allow(null),
  location: Joi.object({
    province: Joi.string().valid(...provinces),
    city: Joi.string().valid(...cities),
  }),
  skillIds: Joi.array().items(Joi.objectId()).unique()
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

function validateListUsers(req, res, next) {
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

async function list(req, res, next) {
  const {
    offset,
    limit,
    countVolunteeredEvents,
    'filters.roles': filterRoles,
    'filters.name': filterName,
    'sort.field': sortField,
    'sort.order': sortOrder
  } = req.query

  try {
    const { results, total } = await UsersController.list({
      offset,
      limit,
      countVolunteeredEvents,
      filters: {
        name: filterName,
        roles: filterRoles
      },
      sort: {
        field: sortField,
        order: sortOrder
      }
    })

    return res.json({
      results,
      total
    })
  } catch (error) {
    next(error)
  }
}

function validateIdParams(req, res, next) {
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

function validateUpdateUser(req, res, next) {
  const { value: validatedBody, error } = updateUserValidator.validate(req.body)

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

async function updateUser(req, res, next) {
  const { id } = req.params
  const {
    email,
    firstName,
    middleName,
    lastName,
    gender,
    birthDate,
    contactNumber,
    location,
    skillIds
  } = req.body

  try {
    await UsersController.update(id, {
      email,
      firstName,
      middleName,
      lastName,
      gender,
      birthDate,
      contactNumber,
      location,
      skillIds
    })

    return res.status(200).json({
      ok: true
    })
  } catch (error) {
    next(error)
  }
}

const router = express.Router()

router.post('/', validateCreateUserBody, UsersController.create)
router.get('/', validateListUsers, list)
router.get('/:id', validateIdParams, UsersController.get)
router.patch('/:id', validateIdParams, validateUpdateUser, updateUser)

module.exports = router
