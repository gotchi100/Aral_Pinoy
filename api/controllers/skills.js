'use strict'

const SkillModel = require('../models/skills')

class SkillsController {
  static async create(req, res) {
    const {
      name,
      description
    } = req.body

    const skill = await SkillModel.create({
      name,
      description
    })

    return res.status(201).json(skill.toObject())
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