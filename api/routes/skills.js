'use strict'

const express = require('express')
const { Types } = require('mongoose')
const Joi = require('joi')

const SkillsController = require('../controllers/skills')

const createSkillValidator = Joi.object({
  name: Joi.string().trim().max(50).required(),
  description: Joi.string().trim().max(200),
})
const listSkillsValidator = Joi.object({
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).default(25),
  'filters.name': Joi.string().trim().max(50).allow('')
}).options({ 
  stripUnknown: true
})

function validateCreateSkillBody(req, res, next) {
  const { value: validatedBody, error } = createSkillValidator.validate(req.body)

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

function validateListSkillsBody(req, res, next) {
  const { value: validatedQuery, error } = listSkillsValidator.validate(req.query)

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

function validateGetSkillBody(req, res, next) {
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

router.post('/', validateCreateSkillBody, SkillsController.create)
router.get('/', validateListSkillsBody, SkillsController.list)
router.get('/:id', validateGetSkillBody, SkillsController.get)

module.exports = router
