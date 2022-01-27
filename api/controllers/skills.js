'use strict'

const SkillModel = require('../models/skills')

const { NotFoundError, ConflictError } = require('../errors')

const SORT_ORDER_MAPPING = {
  asc : 1,
  desc: -1
}

const whitespaceRegex = /\s+/g

function sanitize(name) {
  return name.replace(whitespaceRegex,' ')
}

class SkillsController {
  static async create(req, res, next) {
    const {
      name,
      description
    } = req.body

    const sanitizedName = sanitize(name)

    try {
      const results = await SkillModel.create({
        name: sanitizedName,
        norm: sanitizedName.toLowerCase(),
        description
      })
  
      const skill = results.toObject({ 
        minimize: true,
        versionKey: false,
        useProjection: true
      })
  
      return res.status(201).json(skill)
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.norm === 1) {
        return res.status(400).json({
          code: 'SkillAlreadyExists',
          status: 400,
          message: `Duplicate skill: ${name}`
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
      sort
    } = options

    const {
      name: filterName
    } = filters

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

    if (sort.field !== undefined && sort.order !== undefined) {
      queryOptions.sort = {
        [sort.field]: SORT_ORDER_MAPPING[sort.order]
      }
    }

    const [skills, total] = await Promise.all([
      SkillModel.find(filterQuery, undefined, queryOptions),
      SkillModel.countDocuments(filterQuery)
    ])

    return {
      results: skills,
      total
    }
  }

  static async get(req, res) {
    const { id } = req.params

    const skill = await SkillModel.findById(id, undefined, { lean: true })

    if (skill === null) {
      return res.status(404).json({
        code: 'NotFound',
        status: 404,
        message: 'Skill not found'
      })
    }

    return res.json(skill)
  }

  static async update(id, skillUpdate) {
    const {
      name,
      description
    } = skillUpdate

    const skill = await SkillModel.findById(id, ['__v', 'name', 'description'])

    if (skill === null) {
      throw new NotFoundError(`Skill not found: ${id}`)
    }

    let hasUpdates = false
    const $set = {}

    if (skill.name !== name) {
      const sanitizedName = sanitize(name)

      $set.name = sanitizedName
      $set.norm = sanitizedName.toLowerCase()

      hasUpdates = true
    }

    if (skill.description !== description) {
      $set.description = description

      hasUpdates = true
    }

    if (!hasUpdates) {
      return
    }

    try {
      const { matchedCount } = await SkillModel.updateOne({
        _id: id,
        __v: skill.__v
      }, {
        $set,
        $inc: {
          __v: 1
        }
      })
  
      if (matchedCount === 0) {
        throw new ConflictError('Skill was recently updated. Please try again')
      }
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.norm === 1) {
        throw new ConflictError(`Duplicate Skill: ${name}`)
      }

      throw error
    }
  }

  static async delete(id) {
    const { deletedCount } = await SkillModel.deleteOne({
      _id: id
    })

    if (deletedCount === 0) {
      throw new NotFoundError(`Skill not found: ${id}`)
    }
  }
}

module.exports = SkillsController