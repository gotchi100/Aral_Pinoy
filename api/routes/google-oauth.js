'use strict'

const express = require('express')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const GoogleOauthController = require('../controllers/google/oauth')
const config = require('../config')

let isGoogleSignInConfigProvided = false

function checkGoogleSignInConfig(req, res, next) {
  if (isGoogleSignInConfigProvided) {
    return next()
  }

  if (!config.google.oauth.api.clientId) {
    return next(new Error('Environment variable `GOOGLE_OAUTH_API_CLIENT_ID` must be provided'))
  }

  if (!config.google.oauth.api.clientSecret) {
    return next(new Error('Environment variable `GOOGLE_OAUTH_API_CLIENT_SECRET` must be provided'))
  }
  
  if (!config.google.oauth.api.redirectUri) {
    return next(new Error('Environment variable `GOOGLE_OAUTH_API_REDIRECT_URI` must be provided'))
  }

  isGoogleSignInConfigProvided = true

  next()
}

async function signIn(req, res, next) {
  const { error, code } = req.query

  if (error) {
    return next(error)
  }

  try {
    await GoogleOauthController.signin(code)

    return res.status(200).json({
      ok: true
    })
  } catch (appError) {
    next(appError)
  }
}

const router = express.Router()

router.get('/sign-in', checkGoogleSignInConfig, signIn)

module.exports = router
