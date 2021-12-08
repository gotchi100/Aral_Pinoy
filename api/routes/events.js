'use strict'

const express = require('express')
const { Types } = require('mongoose')
const Joi = require('joi')
const joiObjectId = require('joi-objectid')
const multer  = require('multer')

Joi.objectId = joiObjectId(Joi)

const EventsController = require('../controllers/events')
const upload = multer({
  limits: {
    fileSize: 5000000 // 5 MB
  }
})

const createEventValidator = Joi.object({
  name: Joi.string().trim().max(50).required(),
  description: Joi.string().trim().empty('').max(200),
  date: Joi.object({
    start: Joi.string().isoDate().required(),
    end: Joi.string().isoDate().required(),
  }).required(),
  goals: Joi.object({
    monetaryDonation: Joi.number().default(0).min(0).precision(2)
  }).required(),
  location: Joi.object({
    name: Joi.string().trim().max(500).required()
  }).required(),
  contactPersons: Joi.array().items(
    Joi.object({
      name: Joi.string().trim().max(255).required(),
      contactMethods: Joi.object({
        email: Joi.string().email(),
        mobile: Joi.string()
      })
    })
  ).unique(),
  jobs: Joi.array().items(
    Joi.object({
      name: Joi.string().trim().max(255).required(),
      maxVolunteers: Joi.number().min(1).default(1),
      skills: Joi.array().items(Joi.objectId()).unique()
    })
  ).unique(),
  sdgIds: Joi.array().items(Joi.objectId()).unique().required(),
})

const listEventsValidator = Joi.object({
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).default(25),
  'filters.name': Joi.string().trim().max(100).allow('')
}).options({ 
  stripUnknown: true
})

function validateCreateEventBody(req, res, next) {
  const { value: validatedBody, error } = createEventValidator.validate(req.body)

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

async function createEvent(req, res, next) {
  try {
    const results = await EventsController.create({
      ...req.body,
      logoFile: req.file
    })

    return res.status(201).json(results)
  } catch (error) {
    next(error)
  }
}

function validateListEventsBody(req, res, next) {
  const { value: validatedQuery, error } = listEventsValidator.validate(req.query)

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

function validateGetEventBody(req, res, next) {
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

const router = express.Router()

router.post('/', upload.single('logo'), validateCreateEventBody, createEvent)
router.get('/', validateListEventsBody, EventsController.list)
router.get('/:id', validateGetEventBody, EventsController.get)

module.exports = router
