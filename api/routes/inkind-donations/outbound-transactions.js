'use strict'

const express = require('express')
const { Types } = require('mongoose')
const Joi = require('joi')
const joiObjectId = require('joi-objectid')

Joi.objectId = joiObjectId(Joi)

const IkdOutboundTransactionsController = require('../../controllers/inkind-donations/outbound-transactions')
const { 
  TRANSACTION_STATUSES,
  OUTBOUND_RECEIVER_TYPES
} = require('../../constants/inkind-donations')

const receiverTypeSchema = Joi.string().valid(OUTBOUND_RECEIVER_TYPES.ORGANIZATION, OUTBOUND_RECEIVER_TYPES.EVENT)
const transactionStatusSchema = Joi.string().valid(TRANSACTION_STATUSES.COMPLETE, TRANSACTION_STATUSES.RETURNED)

const contactMethodSchema = Joi.object({
  type: Joi.string().valid('MOBILE', 'EMAIL').required(),
  value: Joi.string().trim().max(255).lowercase().required()
})

const contactsSchema = Joi.array().items(
  Joi.object({
    name: Joi.string().trim().max(100).required(),
    contactMethods: Joi.array().items(contactMethodSchema)
  })
)

const organizationSchema = Joi.object({
  name: Joi.string().trim().max(255).required(),
  contacts: contactsSchema.required()
})

const receiverSchema = Joi.object({
  type: receiverTypeSchema.required(),
  eventId: Joi.objectId().when('type', {
    is: OUTBOUND_RECEIVER_TYPES.EVENT,
    then: Joi.required()
  }),
  organization: organizationSchema.when('type', {
    is: OUTBOUND_RECEIVER_TYPES.ORGANIZATION,
    then: Joi.required()
  })
})

const createTransactionValidator = Joi.object({
  sku: Joi.string().trim().max(100).uppercase().required(),
  quantity: Joi.number().integer().positive().required(),
  date: Joi.string().isoDate().required(),
  receiver: receiverSchema.required()
}).options({
  stripUnknown: true
})

const listTransactionsValidator = Joi.object({
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).default(25),
  'filters.receiverType': receiverTypeSchema,
  'filters.status': Joi.array().items(
    Joi.string().valid(TRANSACTION_STATUSES.COMPLETE, TRANSACTION_STATUSES.PENDING, TRANSACTION_STATUSES.RETURNED)
  ),
  'sort.field': Joi.string().valid('date'),
  'sort.order': Joi.string().valid('asc', 'desc')
}).options({ 
  stripUnknown: true
})

const updateTransactionValidator = Joi.object({
  status: transactionStatusSchema.required()
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
    const results = await IkdOutboundTransactionsController.create(req.body)

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
  const {
    offset,
    limit,
    'filters.receiverType': filterReceiverType,
    'filters.status': filterStatus,
    'sort.field': sortField,
    'sort.order': sortOrder
  } = req.query

  try {
    const { results, total } = await IkdOutboundTransactionsController.list({
      offset,
      limit,
      filters: {
        receiverType: filterReceiverType,
        status: filterStatus
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
    const results = await IkdOutboundTransactionsController.get(id)

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
    await IkdOutboundTransactionsController.updateStatus(id, req.body.status)

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
