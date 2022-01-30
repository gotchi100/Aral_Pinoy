'use strict'

const express = require('express')
const { Types } = require('mongoose')
const Joi = require('joi')
const joiObjectId = require('joi-objectid')

const EventExpenseController = require('../../controllers/events/expenses')

Joi.objectId = joiObjectId(Joi)

const listValidator = Joi.object({
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).default(25),
  'filters.eventId': Joi.objectId(),
}).options({ 
  stripUnknown: true
})

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
    offset,
    limit,
    'filters.eventId': filterEventId,
  } = req.query

  try {
    const { results, total } = await EventExpenseController.list({
      offset,
      limit,
      filters: {
        eventId: filterEventId,
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
    const results = await EventExpenseController.get(id)

    return res.json(results)
  } catch (error) {
    next(error)
  }
}

const router = express.Router()

router.get('/', validateList, list)
router.get('/:id', validateIdParam, get)

module.exports = router
