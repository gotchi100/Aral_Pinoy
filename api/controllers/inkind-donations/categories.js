'use strict'

const IkdCategoryModel = require('../../models/inkind-donations/categories')

const { ConflictError, NotFoundError } = require('../../errors')

const whitespaceRegex = /\s+/g

function sanitize(name) {
  return name.replace(whitespaceRegex,' ')
}

class InkindDonationCategoriesController {
  static async create(category) {
    const {
      name,
      description,
      customFields
    } = category

    const sanitizedName = sanitize(name)

    try {
      const results = await IkdCategoryModel.create({
        name: sanitizedName,
        norm: sanitizedName.toLowerCase(),
        description,
        customFields
      })
  
      return results.toObject({ 
        minimize: true,
        versionKey: false,
        useProjection: true
      })
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.norm === 1) {
        throw new ConflictError(`Duplicate category: ${name}`)
      }
      
      throw error
    }
  }

  static async list(query) {
    const {
      limit,
      offset,
      'filters.name': filterName
    } = query

    const dbQuery = {}

    if (filterName !== undefined && filterName !== '') {
      dbQuery.$text = {
        $search: decodeURIComponent(filterName)
      }
    }

    const [categories, total] = await Promise.all([
      IkdCategoryModel.find(dbQuery, undefined, { 
        lean: true,
        limit,
        skip: offset
      }),
      IkdCategoryModel.countDocuments(dbQuery)
    ])

    return {
      results: categories,
      total
    }
  }

  static async get(id) {
    const category = await IkdCategoryModel.findById(id, undefined, { lean: true })

    if (category === null) {
      throw new NotFoundError(`'In-kind donation category does not exist: ${id}`)
    }

    return category
  }
}

module.exports = InkindDonationCategoriesController