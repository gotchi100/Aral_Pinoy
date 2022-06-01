'use strict'

const express = require('express')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const MainController = require('../controllers/main')
const config = require('../config')
const { provinces, cities } = require('../constants/philippines')

let isGoogleSignInConfigProvided = false

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
  lastName: Joi.string().trim().max(100).required(),
  gender: Joi.string().valid('Male', 'Female'),
  birthDate: Joi.date().iso(),
  location: Joi.object({
    country: Joi.string().valid('PHILIPPINES'),
    province: Joi.string().valid(...provinces),
    city: Joi.string().valid(...cities),
  }),
  skills: Joi.array().items(Joi.objectId()).unique()
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

function checkGoogleSignInConfig(req, res, next) {
  if (isGoogleSignInConfigProvided) {
    return next()
  }

  if (!config.google.oauth.volunteer.clientId) {
    return next(new Error('Environment variable `GOOGLE_OAUTH_CLIENT_ID` must be provided'))
  }

  if (!config.google.oauth.volunteer.clientSecret) {
    return next(new Error('Environment variable `GOOGLE_OAUTH_CLIENT_SECRET` must be provided'))
  }
  
  if (!config.google.oauth.volunteer.redirectUri) {
    return next(new Error('Environment variable `GOOGLE_OAUTH_REDIRECT_URI` must be provided'))
  }

  if (!config.volunteer.google.oauth.redirectUri) {
    return next(new Error('Environment variable `VOLUNTEER_GOOGLE_OAUTH_REDIRECT_URI` must be provided'))
  }

  isGoogleSignInConfigProvided = true

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
router.get('/google-sign-in', checkGoogleSignInConfig, MainController.googleSignIn)
router.post('/register', validateRegisterBody, MainController.register)

module.exports = router
