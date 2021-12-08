'use strict'

const express = require('express')
const { Types } = require('mongoose')
const Joi = require('joi')

const SdgController = require('../controllers/sdgs')

const listSdgsValidator = Joi.object({
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).default(25),
}).options({ 
  stripUnknown: true
})

function validateListSdg(req, res, next) {
  const { value: validatedQuery, error } = listSdgsValidator.validate(req.query)

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
    const { results, total } = await SdgController.list(req.query)

    return res.json({
      results,
      total
    })
  } catch (error) {
    next(error)
  }
}

function validateGetSdg(req, res, next) {
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
    const results = await SdgController.get(id)

    return res.json(results)
  } catch (error) {
    next(error)
  }
}

const router = express.Router()

router.get('/', validateListSdg, list)
router.get('/:id', validateGetSdg, get)

module.exports = router
