'use strict'

const { Types } = require('mongoose')

const UserModel = require('../models/users')
const SkillModel = require('../models/skills')

const SORT_ORDER_MAPPING = {
  asc : 1,
  desc: -1
}

const { NotFoundError } = require('../errors')

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

  static async list(options = {}) {
    const {
      limit,
      offset,
      filters = {},
      sort = {}
    } = options

    const {
      roles: filterRoles,
      name: filterName
    } = filters

    const {
      field: sortField,
      order: sortOrder
    } = sort

    const filterQuery = {}
    const queryOptions = { 
      lean: true,
      limit,
      skip: offset
    }

    if (filterName !== undefined && filterName !== '') {
      filterQuery.$text = {
        $search: decodeURIComponent(filterName)
      }
    }

    if (filterRoles !== undefined && filterRoles.length > 0) {
      filterQuery.roles = {
        $in : filterRoles
      }
    }

    if (sortField !== undefined && sortOrder !== undefined) {
      queryOptions.sort = {
        [sortField]: SORT_ORDER_MAPPING[sortOrder]
      }
    }

    const [users, total] = await Promise.all([
      UserModel.find(filterQuery, undefined, queryOptions),
      UserModel.countDocuments(filterQuery)
    ])

    return {
      results: users,
      total
    }
  }

  static async get(req, res) {
    const { id } = req.params

    const user = await UserModel.findById(id, undefined, { 
      lean: true,
    })

    if (user === null) {
      return res.status(404).json({
        code: 'NotFound',
        status: 404,
        message: 'User not found'
      })
    }

    return res.json(user)
  }

  static async update(id, update) {
    const {
      email, // TODO: Remove email from user update
      firstName,
      middleName,
      lastName,
      gender,
      birthDate,
      address,
      contactNumber,
      skillIds
    } = update

    const $set = {}
    const $unset = {}

    if (email !== undefined) {
      $set.email = email
    }

    if (firstName !== undefined) {
      $set.firstName = firstName
    }

    if (middleName === null) {
      $unset.middleName = ''
    } else {
      $set.middleName = middleName
    }

    if (lastName !== undefined) {
      $set.lastName = lastName
    }

    if (gender !== undefined) {
      $set.gender = gender
    }

    if (birthDate !== undefined) {
      $set.birthDate = new Date(birthDate)
    }

    if (address !== undefined) {
      if (address.home === null) {
        $unset['address.home'] = ''
      } else {
        $set['address.home'] = address.home
      }
    }

    if (contactNumber === null) {
      $unset.contactNumber = ''
    } else {
      $set.contactNumber = contactNumber
    }

    if (skillIds !== undefined) {
      $set.skills = skillIds.map((skillId) => Types.ObjectId(skillId))
    }

    const { matchedCount } = await UserModel.updateOne({
      _id: id
    }, {
      $set,
      $unset
    })

    if (matchedCount === 0) {
      throw new NotFoundError('user')
    }
  }
}

module.exports = UsersController