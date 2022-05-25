'use strict'

const express = require('express')
const Joi = require('joi')

const ReportEventsController = require('../controllers/reports/events')

const dateRangeQueryValidator = Joi.object({
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')).required()
})

function validateDateRangeQuery(req, res, next) {
  const { value: validatedQuery, error } = dateRangeQueryValidator.validate(req.query)

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

async function getEventsReport(req, res, next) {
  const {
    startDate,
    endDate
  } = req.query

  try {
    const results = await ReportEventsController.get({
      start: startDate,
      end: endDate
    })

    return res.json({
      results
    })
  } catch (error) {
    next(error)
  }
}

const router = express.Router()

router.get('/events', validateDateRangeQuery, getEventsReport)

module.exports = router
