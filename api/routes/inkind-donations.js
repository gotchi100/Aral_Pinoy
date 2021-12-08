'use strict'

const express = require('express')
const { Types } = require('mongoose')
const Joi = require('joi')
const joiObjectId = require('joi-objectid')

Joi.objectId = joiObjectId(Joi)

const InkindDonationController = require('../controllers/inkind-donations')

const createInkindDonationValidator = Joi.object({
  sku: Joi.string().trim().max(100).uppercase().required(),
  name: Joi.string().trim().max(255).required(),
  description: Joi.string().trim().empty('').max(200),
  quantity: Joi.number().integer(),
  unit: Joi.string().trim().max(20).required(),
  donor: Joi.string().trim().max(255),
  categoryId: Joi.objectId(),
  categoryCustomFields: Joi.array().items(
    Joi.object({
      key: Joi.string().trim().max(100).required(),
      value: Joi.string().trim().max(255).required(),
    })
  ),
}).options({
  stripUnknown: true
})

const listInkindDonationsValidator = Joi.object({
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).default(25),
  'filters.query': Joi.string().trim().max(255)
}).options({ 
  stripUnknown: true
})

function validateCreateInkindDonation(req, res, next) {
  const { value: validatedBody, error } = createInkindDonationValidator.validate(req.body)

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

async function create(req, res, next) {
  try {
    const results = await InkindDonationController.create(req.body)

    return res.status(201).json(results)
  } catch (error) {
    next(error)
  }
}

function validateListInkindDonation(req, res, next) {
  const { value: validatedQuery, error } = listInkindDonationsValidator.validate(req.query)

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
  try {
    const { results, total } = await InkindDonationController.list(req.query)

    return res.json({
      results,
      total
    })
  } catch (error) {
    next(error)
  }
}

function validateGetInkindDonation(req, res, next) {
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

async function get(req, res, next) {
  const { id } = req.params

  try {
    const results = await InkindDonationController.get(id)

    return res.json(results)
  } catch (error) {
    next(error)
  }
}

const router = express.Router()

router.post('/', validateCreateInkindDonation, create)
router.get('/', validateListInkindDonation, list)
router.get('/:id', validateGetInkindDonation, get)

module.exports = router
