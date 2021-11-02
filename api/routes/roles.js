'use strict'

const express = require('express')
const Joi = require('joi')

const RoleModel = require('../models/roles')

const router = express.Router()
const createRoleValidator = Joi.object({
  name: Joi.string().trim().lowercase().required(),
  label: Joi.string().trim().max(50).required(),
})

router.post(
  '/', 
  function (req, res, next) {
    const { value: validatedBody, error } = createRoleValidator.validate(req.body)

    if (error !== undefined) {      
      return res.status(400).json({
        code: 'BadRequest',
        status: 400,
        message: error.message
      })
    }

    req.body = validatedBody

    next()
  },
  async function(req, res, next) {
    const {
      name,
      label
    } = req.body

    const role = new RoleModel()

    role.name = name
    role.label = label

    try {
      await role.save()

      return res.status(201).json(role)
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.name === 1) {
        return res.status(400).json({
          code: 'RoleAlreadyExists',
          status: 400,
          message: `Duplicate role: ${error.keyValue.name}`
        })
      }

      next(error)
    }
  }
)

module.exports = router
