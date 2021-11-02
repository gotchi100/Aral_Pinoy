'uses strict'

const express = require('express')
const jwt = require('jsonwebtoken')

const UserModel = require('../models/users')

const router = express.Router()

router.post('/login', async function (req, res, next) {
  const {
    email,
    password
  } = req.body

  try {
    const user = await UserModel.findOne({
      email,
      roles: {
        $in: ['Admin','Officer']
      }
    })
  
    if (user === null) {
      throw new Error('Invalid email address or password')
    }
  
    if (user.password !== password) {
      throw new Error('Invalid email address or password')
    }

    const token = jwt.sign({
      sub : user._id,
    }, 'secret', {
      algorithm : 'HS256',
      expiresIn : '4h'
    })
  
    res.send({
      user,
      token
    })
  } catch (error) {
    res.status(400)
    
    res.json({
      error: {
        message: error.message
      }
    })

    next()
  }
})

module.exports = router
