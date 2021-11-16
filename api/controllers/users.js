'use strict'

const UserModel = require('../models/users')
const SkillModel = require('../models/skills')

class UsersController {
  static async create(req, res, next) {
    const {
      email,
      password,
      contactNumber,
      firstName,
      middleName,
      lastName,
      gender,
      birthDate,
      address,
      skills: skillIds
    } = req.body

    try {
      const skills = await SkillModel.find({
        _id: {
          $in: skillIds
        }
      }, ['_id', 'name', 'description'], {
        lean: true
      })

      const results = new UserModel({
        email,
        password,
        contactNumber,
        firstName,
        middleName,
        lastName,
        gender,
        birthDate: new Date(birthDate),
        address,
        roles: ['officer'],
        skills
      })

      const user = results.toObject({ 
        minimize: true,
        versionKey: false,
        useProjection: true
      })

      user.skills = skills

      return res.status(201).json(user)
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

  static async list(req, res) {
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

    return res.json({
      results: users,
      total
    })
  }

  static async get(req, res) {
    const { id } = req.params

    const user = await UserModel.findById(id, undefined, { lean: true })

    if (user === null) {
      return res.status(404).json({
        code: 'NotFound',
        status: 404,
        message: 'User not found'
      })
    }

    return res.json(user)
  }
}

module.exports = UsersController