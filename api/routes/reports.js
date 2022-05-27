'use strict'

const express = require('express')
const Joi = require('joi')
const joiObjectId = require('joi-objectid')

Joi.objectId = joiObjectId(Joi)

const ReportEventsController = require('../controllers/reports/events')
const ReportVolunteersController = require('../controllers/reports/volunteers')
const ReportInventoryItemController = require('../controllers/reports/inventory-item')
const ReportMonetaryDonationController = require('../controllers/reports/monetary-donations')

const dateRangeQueryValidator = Joi.object({
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')).required()
})

function validateDateRangeQuery(req, res, next) {
  const { value: validatedQuery, error } = dateRangeQueryValidator.validate(req.query, {
    allowUnknown: true
  })

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

async function getVolunteersReport(req, res, next) {
  const {
    startDate,
    endDate
  } = req.query

  try {
    const results = await ReportVolunteersController.get({
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

const inventoryItemQueryValidator = Joi.object({
  itemId: Joi.objectId().required(),
})

function validateInventoryItemQuery(req, res, next) {
  const { value: validatedQuery, error } = inventoryItemQueryValidator.validate(req.query, {
    allowUnknown: true
  })

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

async function getInventoryItemReport(req, res, next) {
  const {
    startDate,
    endDate,
    itemId
  } = req.query

  try {
    const results = await ReportInventoryItemController.get({
      itemId,
      dateRange: {
        start: startDate,
        end: endDate
      }
    })

    return res.json({
      results
    })
  } catch (error) {
    next(error)
  }
}

async function getMonetaryDonationsReport(req, res, next) {
  const {
    startDate,
    endDate
  } = req.query

  try {
    const results = await ReportMonetaryDonationController.get({
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
router.get('/volunteers', validateDateRangeQuery, getVolunteersReport)
router.get('/inventory-item', validateDateRangeQuery, validateInventoryItemQuery, getInventoryItemReport)
router.get('/monetary-donations', validateDateRangeQuery, getMonetaryDonationsReport)

module.exports = router