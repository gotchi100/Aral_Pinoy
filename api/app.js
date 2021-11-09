'use strict'

const express = require('express')
const debug = require('debug')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const jwtMiddleware = require('express-jwt')

const config = require('./config')

const mainRouter = require('./routes/main')
const adminRouter = require('./routes/admin')
const usersRouter = require('./routes/users')
const skillsRouter = require('./routes/skills')

const logger = debug('api:server')

async function connectDatabase () {
  await mongoose.connect(config.mongodb.uri)

  logger('Connected to database')
}

connectDatabase()

const publicRoutes = [
  '/login', 
  '/google-sign-in',
  '/register', 
  '/admin/login'
]

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  jwtMiddleware({ 
    secret: config.jwt.secret, 
    algorithms: ['HS256']
  }).unless({
    path: publicRoutes
  })
)

app.use('/', mainRouter)
app.use('/admin', adminRouter)
app.use('/users', usersRouter)
app.use('/skills', skillsRouter)
app.use(function (req, res, next) {
  res.status(404).json({
    code: 'NotFound',
    status: 404,
    message: `The requested URL [${req.method} ${req.originalUrl}] was not found on this server.`
  })

  next()
})

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      code: 'Unauthorized',
      status: 401,
      message: err.message
    })
  }

  logger(err)

  res.status(500).json({
    code: 'Internal Server Error',
    status: 500,
    message: 'The server encountered an internal error and was unable to complete your request.'
  })

  next()
})

module.exports = app
