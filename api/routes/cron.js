'use strict'

const express = require('express')
const Joi = require('joi')
const Agenda = require('agenda')

const config = require('../config')

const agenda = new Agenda({ 
  db: { 
    address: config.mongodb.uri 
  }
})

const listValidator = Joi.object({
  jobName: Joi.string().valid(
    'check expiring inventory items',
    'check events with insufficient volunteers',
    'delete expired inventory items'
  ),
}).options({ 
  stripUnknown: true
})

function validateTrigger(req, res, next) {
  const { value: validatedBody, error } = listValidator.validate(req.body)

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

async function trigger(req, res, next) {
  const {
    jobName
  } = req.body

  try {
    agenda.now(jobName)

    return res.json({
      ok: true
    })
  } catch (error) {
    next(error)
  }
}

const router = express.Router()

router.post('/', validateTrigger, trigger)

module.exports = router
