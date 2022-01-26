'use strict'

const express = require('express')
const Joi = require('joi')

const IkdDonorController = require('../../controllers/inkind-donations/donors')

const listValidator = Joi.object({
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).default(25),
  'filters.name': Joi.string().trim().max(100).allow('')
}).options({ 
  stripUnknown: true
})

function validateList(req, res, next) {
  const { value: validatedQuery, error } = listValidator.validate(req.query)

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
    'filters.name': filterName
  } = req.query

  try {
    const { results, total } = await IkdDonorController.list({
      offset,
      limit,
      filters: {
        name: filterName
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

const router = express.Router()

router.get('/', validateList, list)

module.exports = router
