'use strict'

const IkdCategoryModel = require('../../models/inkind-donations/categories')

const { ConflictError, NotFoundError } = require('../../errors')

const SORT_ORDER_MAPPING = {
  asc : 1,
  desc: -1
}

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
      filters = {},
      sort = {}
    } = query

    const {
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

    if (sortField !== undefined && sortOrder !== undefined) {
      queryOptions.sort = {
        [sortField]: SORT_ORDER_MAPPING[sortOrder]
      }
    }

    const [categories, total] = await Promise.all([
      IkdCategoryModel.find(filterQuery, undefined, queryOptions),
      IkdCategoryModel.countDocuments(filterQuery)
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

  static async delete(id) {
    const { deletedCount } = await IkdCategoryModel.deleteOne({
      _id: id
    })

    if (deletedCount === 0) {
      throw new NotFoundError(`In-kind donation category not found: ${id}`)
    }
  }
}

module.exports = InkindDonationCategoriesController