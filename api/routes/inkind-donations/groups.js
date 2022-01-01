'use strict'

const express = require('express')
const Joi = require('joi')

const IkdGroupController = require('../../controllers/inkind-donations/groups')

const listCategoriesValidator = Joi.object({
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).default(25),
  'filters.name': Joi.string().trim().max(100).allow('')
}).options({ 
  stripUnknown: true
})

function validateListGroupsBody(req, res, next) {
  const { value: validatedQuery, error } = listCategoriesValidator.validate(req.query)

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
    const { results, total } = await IkdGroupController.list(req.query)

    return res.json({
      results,
      total
    })
  } catch (error) {
    next(error)
  }
}

const router = express.Router()

router.get('/', validateListGroupsBody, list)

module.exports = router
