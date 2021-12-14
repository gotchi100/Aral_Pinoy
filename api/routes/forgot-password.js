'use strict'

const express = require('express')
const Joi = require('joi')

const ForgotPasswordController = require('../controllers/forgot-password')

const forgotPasswordValidator = Joi.object({
  email: Joi.string().email().trim().lowercase().max(256).required(),
  origin: Joi.string().valid('volunteer', 'admin').default('volunteer'),
})

const resetPasswordValidator = Joi.object({
  password: Joi.string().max(64).required(),
})

function validateCreateBody(req, res, next) {
  const { value: validatedBody, error } = forgotPasswordValidator.validate(req.body)

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

async function create(req, res, next) {
  const { email, origin } = req.body

  try {
    await ForgotPasswordController.create(email, origin)

    return res.status(200).json({
      ok: true
    })
  } catch (error) {
    next(error)
  }
}

function validateResetPasswordBody(req, res, next) {
  const { id } = req.params

  if (!Joi.string().validate(id)) {
    return res.status(400).json({
      code: 'BadRequest',
      status: 400,
      message: 'ID is invalid'
    })
  }

  const { error } = resetPasswordValidator.validate(req.body)

  if (error !== undefined) {      
    return res.status(400).json({
      code: 'BadRequest',
      status: 400,
      message: error.message
    })
  }

  next()
}

async function resetPassword(req, res, next) {
  const { id } = req.params
  const { password }  = req.body

  try {
    await ForgotPasswordController.resetPassword(id, password)

    return res.status(200).json({
      ok: true
    })
  } catch (error) {
    next(error)
  }
}

const router = express.Router()

router.post('/', validateCreateBody, create)
router.put('/:id', validateResetPasswordBody, resetPassword)

module.exports = router
