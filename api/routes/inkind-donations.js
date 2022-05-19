'use strict'

const express = require('express')
const { Types } = require('mongoose')
const multer  = require('multer')
const Joi = require('joi')
const joiObjectId = require('joi-objectid')

Joi.objectId = joiObjectId(Joi)

const InkindDonationController = require('../controllers/inkind-donations')

const upload = multer({
  limits: {
    fileSize: 5000000 // 5 MB
  }
})

const createInkindDonationValidator = Joi.object({
  sku: Joi.string().trim().max(100).uppercase().required(),
  name: Joi.string().trim().max(100).required(),
  description: Joi.string().trim().empty('').max(200),
  quantity: Joi.number().integer(),
  unit: Joi.string().trim().max(20).required(),
  donor: Joi.string().trim().max(255),
  donorEmail: Joi.string().trim().empty('').email(),
  categoryId: Joi.objectId(),
  categoryCustomFields: Joi.array().items(
    Joi.object({
      key: Joi.string().trim().max(100).required(),
      value: Joi.string().trim().max(255).required(),
    })
  ),
  group: Joi.string().trim().max(255),
}).options({
  stripUnknown: true
})

const listInkindDonationsValidator = Joi.object({
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).default(25),
  grouped: Joi.boolean().default(false),
  'filters.query': Joi.string().trim().max(255),
  'filters.categoryCustomFields': Joi.array().items(
    Joi.string().valid('bestBeforeDate', 'expirationDate')
  ),
  'sort.field': Joi.string().valid('sku', 'name', 'category.customFields.bestBeforeDate', 'category.customFields.expirationDate'),
  'sort.order': Joi.string().valid('asc', 'desc')
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
    const results = await InkindDonationController.create({
      ...req.body,
      file: req.file
    })

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
  const {
    offset,
    limit,
    grouped,
    'filters.query': filterQuery,
    'filters.categoryCustomFields': filterCategoryCustomFields,
    'sort.field': sortField,
    'sort.order': sortOrder
  } = req.query

  try {
    const { results, total } = await InkindDonationController.list({
      offset,
      limit,
      grouped,
      filters: {
        query: filterQuery,
        categoryCustomFields: filterCategoryCustomFields
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

async function get(req, res, next) {
  const { id } = req.params

  try {
    const results = await InkindDonationController.get(id)

    return res.json(results)
  } catch (error) {
    next(error)
  }
}

async function deleteOne(req, res, next) {
  const { id } = req.params

  try {
    await InkindDonationController.deleteOne(id)

    return res.json({
      ok: true
    })
  } catch (error) {
    next(error)
  }
}

const router = express.Router()

router.post('/', upload.single('file'), validateCreateInkindDonation, create)
router.get('/', validateListInkindDonation, list)
router.get('/:id', validateIdParams, get)
router.delete('/:id', validateIdParams, deleteOne)

module.exports = router
