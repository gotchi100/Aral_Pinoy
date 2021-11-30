'use strict'

const express = require('express')
const { Types } = require('mongoose')
const Joi = require('joi')

const IkdCategoriesController = require('../../controllers/inkind-donations/categories')

const createCategoryValidator = Joi.object({
  name: Joi.string().trim().max(50).required(),
  description: Joi.string().trim().empty('').max(200),
  customFields: Joi.object({
    bestBeforeDate: Joi.boolean(),
    expirationDate: Joi.boolean()
  })
})

const listCategoriesValidator = Joi.object({
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).default(25),
  'filters.name': Joi.string().trim().max(100).allow('')
}).options({ 
  stripUnknown: true
})

function validateCreateCategoryBody(req, res, next) {
  const { value: validatedBody, error } = createCategoryValidator.validate(req.body)

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
    const results = await IkdCategoriesController.create(req.body)

    return res.status(201).json(results)
  } catch (error) {
    next(error)
  }
}

function validateListCategoriesBody(req, res, next) {
  const { value: validatedQuery, error } = listCategoriesValidator.validate(req.query)

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
    const { results, total } = await IkdCategoriesController.list(req.query)

    return res.json({
      results,
      total
    })
  } catch (error) {
    next(error)
  }
}

function validateGetCategoryBody(req, res, next) {
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
    const results = await IkdCategoriesController.get(id)

    return res.json(results)
  } catch (error) {
    next(error)
  }
}

const router = express.Router()

router.post('/', validateCreateCategoryBody, create)
router.get('/', validateListCategoriesBody, list)
router.get('/:id', validateGetCategoryBody, get)

module.exports = router
