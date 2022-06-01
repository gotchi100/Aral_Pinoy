'use strict'

const express = require('express')
const Joi = require('joi')
const joiObjectId = require('joi-objectid')

Joi.objectId = joiObjectId(Joi)

const ReportEventsController = require('../controllers/reports/events')
const ReportVolunteersController = require('../controllers/reports/volunteers')
const ReportInventoryItemsController = require('../controllers/reports/inventory-items')
const ReportDeletedInventoryItemsController = require('../controllers/reports/deleted-inventory-items')
const ReportExpiringInventoryItemsController = require('../controllers/reports/expiring-inventory-items')
const ReportMonetaryDonationController = require('../controllers/reports/monetary-donations')
const ReportSdgsController = require('../controllers/reports/sdgs')
const ReportIncomeStatementController = require('../controllers/reports/income-statement')

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

async function getInventoryItemsReport(req, res, next) {
  try {
    const results = await ReportInventoryItemsController.get()

    return res.json({
      results
    })
  } catch (error) {
    next(error)
  }
}

async function getDeletedInventoryItemsReport(req, res, next) {
  const {
    startDate,
    endDate,
  } = req.query

  try {
    const results = await ReportDeletedInventoryItemsController.get({
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

async function getExpiringInventoryItemsReport(req, res, next) {
  try {
    const results = await ReportExpiringInventoryItemsController.get()

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

async function getSdgsReport(req, res, next) {
  const {
    startDate,
    endDate
  } = req.query

  try {
    const results = await ReportSdgsController.get({
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

async function getIncomeStatementReport(req, res, next) {
  const {
    startDate,
    endDate
  } = req.query

  try {
    const results = await ReportIncomeStatementController.get({
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
router.get('/inventory-items', getInventoryItemsReport)
router.get('/deleted-inventory-items', validateDateRangeQuery, getDeletedInventoryItemsReport)
router.get('/expiring-inventory-items', getExpiringInventoryItemsReport)
router.get('/monetary-donations', validateDateRangeQuery, getMonetaryDonationsReport)
router.get('/sdgs', validateDateRangeQuery, getSdgsReport)
router.get('/income-statement', validateDateRangeQuery, getIncomeStatementReport)

module.exports = router
