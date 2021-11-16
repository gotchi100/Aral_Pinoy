'use strict'

const SkillModel = require('../models/skills')

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

  static async list(req, res, next) {
    const {
      limit,
      offset,
      'filters.name': filterName
    } = req.query

    const query = {}

    if (filterName !== undefined && filterName !== '') {
      query.$text = {
        $search: decodeURIComponent(filterName)
      }
    }

    try {
      const [skills, total] = await Promise.all([
        SkillModel.find(query, undefined, { 
          lean: true,
          limit,
          skip: offset
        }),
        SkillModel.countDocuments(query)
      ])
  
      return res.json({
        results: skills,
        total
      })
    } catch (error) {
      next(error)
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
}

module.exports = SkillsController