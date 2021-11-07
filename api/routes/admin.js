'use strict'

const express = require('express')
const Joi = require('joi')

const AdminController = require('../controllers/admin')

const loginValidator = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
})

function validateLoginBody (req, res, next) {
  const { value: validatedBody, error } = loginValidator.validate(req.body)

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

const router = express.Router()

router.post(
  '/login', 
  validateLoginBody,
  AdminController.login
)

module.exports = router
