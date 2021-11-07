'use strict'

const UserModel = require('../models/users')

class UsersController {
  static async create(req, res, next) {
    const {
      email,
      password,
      contactNumber,
      firstName,
      middleName,
      lastName
    } = req.body

    const user = new UserModel()

    user.email = email
    user.password = password
    user.contactNumber = contactNumber
    user.firstName = firstName
    user.middleName = middleName
    user.lastName = lastName
    user.roles = ['officer']

    try {
      await user.save()

      return res.status(201).json({
        email,
        contactNumber,
        firstName,
        middleName,
        lastName
      })
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.email === 1) {
        return res.status(400).json({
          code: 'EmailAlreadyExists',
          status: 400,
          message: `Duplicate email: ${error.keyValue.email}`
        })
      }

      next(error)
    }
  }

  static async list(req, res, next) {
    const {
      limit,
      offset,
      'filters.roles': roles
    } = req.query

    const query = {}

    if (Array.isArray(roles)) {
      query.roles = {
        $in : roles
      }
    }

    const [users, total] = await Promise.all([
      UserModel.find(query, undefined, { 
        lean: true,
        limit,
        skip: offset
      }),
      UserModel.countDocuments(query)
    ])

    res.json({
      results: users,
      total
    })

    next()
  }

  static async get(req, res, next) {
    const { id } = req.params

    const user = await UserModel.findById(id, undefined, { lean: true })

    if (user === null) {
      return res.status(404).json({
        code: 'NotFound',
        status: 404,
        message: 'User not found'
      })
    }

    res.json(user)

    next()
  }
}

module.exports = UsersController