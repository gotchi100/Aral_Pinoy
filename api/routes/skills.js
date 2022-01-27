'use strict'

const express = require('express')
const { Types } = require('mongoose')
const Joi = require('joi')

const SkillsController = require('../controllers/skills')

const createSkillValidator = Joi.object({
  name: Joi.string().trim().max(50).required(),
  description: Joi.string().trim().empty('').max(200),
})

const updateSkillValidator = Joi.object({
  name: Joi.string().trim().max(50),
  description: Joi.string().trim().empty('').max(200),
})

const listSkillsValidator = Joi.object({
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).default(25),
  'filters.name': Joi.string().trim().max(100).allow(''),
  'sort.field': Joi.string().valid('name'),
  'sort.order': Joi.string().valid('asc', 'desc')
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

async function list(req, res, next) {
  const {
    offset,
    limit,
    'filters.name': filterName,
    'sort.field': sortField,
    'sort.order': sortOrder
  } = req.query

  try {
    const { results, total } = await SkillsController.list({
      offset,
      limit,
      filters: {
        name: filterName
      },
      sort: {
        field: sortField,
        order: sortOrder
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

function validateIdParameter(req, res, next) {
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

function validateUpdateSkill(req, res, next) {
  const { value: validatedBody, error } = updateSkillValidator.validate(req.body)

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

async function updateSkill(req, res, next) {
  const { id } = req.params
  const { name, description } = req.body

  try {
    await SkillsController.update(id, {
      name,
      description
    })

    return res.status(200).json({
      ok: true
    })
  } catch (error) {
    next(error)
  }
}

async function deleteSkill(req, res, next) {
  const { id } = req.params

  try {
    await SkillsController.delete(id)

    return res.status(200).json({
      ok: true
    })
  } catch (error) {
    next(error)
  }
}

const router = express.Router()

router.post('/', validateCreateSkillBody, SkillsController.create)
router.get('/', validateListSkillsBody, list)
router.get('/:id', validateIdParameter, SkillsController.get)
router.delete('/:id', validateIdParameter, deleteSkill)
router.put('/:id', validateIdParameter, validateUpdateSkill, updateSkill)

module.exports = router
