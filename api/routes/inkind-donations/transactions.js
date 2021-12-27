'use strict'

const express = require('express')
const { Types } = require('mongoose')
const Joi = require('joi')

const IkdTransactionController = require('../../controllers/inkind-donations/transactions')
const { TRANSACTION_STATUSES } = require('../../constants/inkind-donations')

const createTransactionValidator = Joi.object({
  sku: Joi.string().trim().max(100).uppercase().required(),
  quantity: Joi.number().integer().required(),
  date: Joi.string().isoDate().required(),
  reason: Joi.string().required()
}).options({
  stripUnknown: true
})

const listTransactionsValidator = Joi.object({
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).default(25),
}).options({ 
  stripUnknown: true
})

const updateTransactionValidator = Joi.object({
  status: Joi.string().valid(TRANSACTION_STATUSES.COMPLETE, TRANSACTION_STATUSES.RETURNED).required()
})

function validateCreateTransaction(req, res, next) {
  const { value: validatedBody, error } = createTransactionValidator.validate(req.body)

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
    const results = await IkdTransactionController.create(req.body)

    return res.status(201).json(results)
  } catch (error) {
    next(error)
  }
}

function validateListTransaction(req, res, next) {
  const { value: validatedQuery, error } = listTransactionsValidator.validate(req.query)

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
    const { results, total } = await IkdTransactionController.list(req.query)

    return res.json({
      results,
      total
    })
  } catch (error) {
    next(error)
  }
}

function validateGetTransaction(req, res, next) {
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
    const results = await IkdTransactionController.get(id)

    return res.json(results)
  } catch (error) {
    next(error)
  }
}

function validateUpdateTransactionStatus(req, res, next) {
  const { id } = req.params

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      code: 'BadRequest',
      status: 400,
      message: 'ID is invalid'
    })
  }

  const { 
    value: validatedBody,
    error
  } = updateTransactionValidator.validate(req.body)

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

async function updateStatus(req, res, next) {
  const { id } = req.params

  try {
    await IkdTransactionController.updateStatus(id, req.body.status)

    return res.json({
      ok: true
    })
  } catch (error) {
    next(error)
  }
}

const router = express.Router()

router.post('/', validateCreateTransaction, create)
router.get('/', validateListTransaction, list)
router.get('/:id', validateGetTransaction, get)
router.put('/:id/status', validateUpdateTransactionStatus, updateStatus)

module.exports = router
