'use strict'

const express = require('express')
const Joi = require('joi')
const joiObjectId = require('joi-objectid')
const { Types } = require('mongoose')

const NotificationController = require('../controllers/notifications')

Joi.objectId = joiObjectId(Joi)

const listRequestValidator = Joi.object({
  'filters.userId': Joi.objectId().required(),
  'filters.seen': Joi.boolean(),
  'filters.read': Joi.boolean(),
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).default(25),
  countOnly: Joi.boolean().default(false),
}).options({ 
  stripUnknown: true
})

function validateListRequest(req, res, next) {
  const { value: validatedQuery, error } = listRequestValidator.validate(req.query)

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
    'filters.userId': filterUserId,
    'filters.seen': filterSeen,
    'filters.read': filterRead,
    offset,
    limit,
    countOnly
  } = req.query

  try {
    const listResult = await NotificationController.list({
      filters: {
        userId: filterUserId,
        read: filterRead,
        seen: filterSeen
      },
      offset,
      limit,
      countOnly
    })

    return res.json({
      results: listResult.results,
      total: listResult.total
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

async function markAsRead(req, res, next) {
  const { id } = req.params

  try {
    await NotificationController.markAsRead(id)

    return res.json({
      ok: true
    })
  } catch (error) {
    next(error)
  }
}

async function markAsSeen(req, res, next) {
  const { id } = req.params

  try {
    await NotificationController.markAsSeen(id)

    return res.json({
      ok: true
    })
  } catch (error) {
    next(error)
  }
}

const markAllAsReadRequestValidator = Joi.object({
  ids: Joi.array().items(Joi.objectId()).unique(),
}).options({ 
  stripUnknown: true
})

function validateMarkAllAsReadRequest(req, res, next) {
  const { value: validatedBody, error } = markAllAsReadRequestValidator.validate(req.body)

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

async function markAllAsRead(req, res, next) {
  const { ids } = req.body

  try {
    await NotificationController.markAllAsRead(ids)

    return res.json({
      ok: true
    })
  } catch (error) {
    next(error)
  }
}

const router = express.Router()

router.get('/', validateListRequest, list)
router.patch('/:id/read', validateIdParams, markAsRead)
router.patch('/:id/seen', validateIdParams, markAsSeen)
router.patch('/readAll', validateMarkAllAsReadRequest, markAllAsRead)

module.exports = router
