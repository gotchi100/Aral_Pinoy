'use strict'

const express = require('express')
const { Types } = require('mongoose')
const Joi = require('joi')
const joiObjectId = require('joi-objectid')

const EventTemplateController = require('../../controllers/events/templates')

Joi.objectId = joiObjectId(Joi)

const jobsSchema = Joi.array().items(
  Joi.object({
    name: Joi.string().trim().max(50).required(),
    description: Joi.string().trim().empty('').max(100),
    requirements: Joi.object({
      max: Joi.number().min(1).default(1)
    }).required(),
    skillIds: Joi.array().items(Joi.objectId()).unique()
  })
)

const questionsSchema = Joi.array().items(
  Joi.object({
    label: Joi.string().trim().max(255).required(),
    type: Joi.string().valid('matrix').required()
  })
)

const createValidator = Joi.object({
  name: Joi.string().trim().max(100).required(),
  description: Joi.string().trim().empty('').max(5000),
  goals: Joi.object({
    monetaryDonation: Joi.number().default(0).min(0).precision(2)
  }).required(),
  location: Joi.object({
    name: Joi.string().trim().max(500)
  }).required(),
  jobs: jobsSchema,
  sdgIds: Joi.array().items(Joi.objectId()).unique(),
  questions: questionsSchema
})

const listValidator = Joi.object({
  'sort.field': Joi.string().valid('name'),
  'sort.order': Joi.string().valid('asc', 'desc')
}).options({ 
  stripUnknown: true
})

function validateCreateBody(req, res, next) {
  const { value: validatedBody, error } = createValidator.validate(req.body)

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
  const {
    name,
    description,
    goals,
    location,
    sdgIds,
    jobs,
    questions
  } = req.body

  try {
    const results = await EventTemplateController.create({
      name,
      description,
      goals,
      location,
      sdgIds,
      jobs,
      questions
    })

    return res.status(201).json(results)
  } catch (error) {
    next(error)
  }
}

function validateList(req, res, next) {
  const { value: validatedQuery, error } = listValidator.validate(req.query)

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
    'sort.field': sortField,
    'sort.order': sortOrder
  } = req.query

  let sort

  if (sortField !== undefined && sortOrder !== undefined) {
    sort = {
      field: sortField,
      order: sortOrder
    }
  }

  try {
    const { results, total } = await EventTemplateController.list({
      sort
    })

    return res.json({
      results,
      total
    })
  } catch (error) {
    next(error)
  }
}

function validateIdParam(req, res, next) {
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
    const results = await EventTemplateController.get(id)

    return res.json(results)
  } catch (error) {
    next(error)
  }
}

async function deleteTemplate(req, res, next) {
  const { id } = req.params

  try {
    await EventTemplateController.deleteTemplate(id)

    return res.status(200).json({
      ok: true
    })
  } catch (error) {
    next(error)
  }
}

const router = express.Router()

router.post('/', validateCreateBody, create)

router.get('/', validateList, list)
router.get('/:id', validateIdParam, get)
router.delete('/:id', validateIdParam, deleteTemplate)

module.exports = router
