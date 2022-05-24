'use strict'

const express = require('express')
const Joi = require('joi')
const joiObjectId = require('joi-objectid')
const multer  = require('multer')
const { Types } = require('mongoose')

const EventDocumentationController = require('../../controllers/events/documentations')

const upload = multer({
  limits: {
    fileSize: 50000000 // 50 MB
  }
})

Joi.objectId = joiObjectId(Joi)

const createValidator = Joi.object({
  eventId: Joi.objectId().required(),
  type: Joi.string().valid('IMAGE')
}).options({
  stripUnknown: true
})

const listValidator = Joi.object({
  eventId: Joi.objectId().required(),
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).default(25),
}).options({
  stripUnknown: true
})

function validateCreate(req, res, next) {
  const { value: validatedBody, error } = createValidator.validate(req.body)

  if (error !== undefined) {      
    return res.status(400).json({
      code: 'BadRequest',
      status: 400,
      message: error.message
    })
  }

  if (req.file === undefined) {
    return res.status(400).json({
      code: 'BadRequest',
      status: 400,
      message: 'No file uploaded'
    })
  }

  req.body = validatedBody

  next()
}

async function create(req, res, next) {
  const {
    eventId,
    type
  } = req.body

  try {
    const results = await EventDocumentationController.create({
      eventId,
      type,
      file: req.file
    })

    return res.status(201).json(results)
  } catch (error) {
    next(error)
  }
}

function validateList(req, res, next) {
  const { value: validatedBody, error } = listValidator.validate(req.query)

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

async function list(req, res, next) {
  const {
    eventId,
    offset,
    limit
  } = req.body

  try {
    const { results, total } = await EventDocumentationController.list({
      eventId,
      options: {
        offset,
        limit
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

async function deleteDocumentation(req, res, next) {
  const { id } = req.params

  try {
    await EventDocumentationController.deleteDocumentation({
      documentationId: id,
    })

    return res.json({
      ok: true
    })
  } catch (error) {
    next(error)
  }
}

const router = express.Router()

router.post('/', upload.single('documentation'), validateCreate, create)
router.get('/', validateList, list)
router.delete('/:id', validateIdParams, deleteDocumentation)

module.exports = router
