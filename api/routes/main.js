'use strict'

const express = require('express')
const Joi = require('joi')

const MainController = require('../controllers/main')

const loginValidator = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
})
const registerValidator = Joi.object({
  email: Joi.string().email().trim().lowercase().max(256).required(),
  password: Joi.string().max(64).required(),
  contactNumber: Joi.string().trim().max(20),
  firstName: Joi.string().trim().max(100).required(),
  middleName: Joi.string().trim().max(100),
  lastName: Joi.string().trim().max(100).required()
})

function validateLoginBody(req, res, next) {
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

function validateRegisterBody(req, res, next) {
  const { value: validatedBody, error } = registerValidator.validate(req.body)

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

router.post('/login', validateLoginBody, MainController.login)
router.post('/register', validateRegisterBody, MainController.register)

module.exports = router
