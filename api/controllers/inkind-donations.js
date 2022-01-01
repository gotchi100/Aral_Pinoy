'use strict'

const InkindDonationModel = require('../models/inkind-donations')
const InkindDonationCategoryModel = require('../models/inkind-donations/categories')
const InkindDonationDonorModel = require('../models/inkind-donations/donors')
const InkindDonationGroupModel = require('../models/inkind-donations/groups')

const { CATEGORY_CUSTOM_FIELD_DATA_TYPES } = require('../constants/inkind-donations')

const { 
  ConflictError,
  BadRequestError,
  NotFoundError
} = require('../errors')

const whitespaceRegex = /\s+/g

function sanitize(name) {
  return name.replace(whitespaceRegex,' ')
}

class InkindDonationsController {
  static async create(inkindDonation) {
    const {
      sku,
      name,
      description,
      quantity,
      unit,
      donor,
      categoryId,
      categoryCustomFields = [],
      group
    } = inkindDonation

    let category

    if (categoryId !== undefined) {
      const categoryResults = await InkindDonationCategoryModel.findById(categoryId, ['name', 'customFields'], { lean: true })

      if (categoryResults === null) {
        throw new NotFoundError(`Category does not exist: ${categoryId}`)
      }

      category = {
        name: categoryResults.name,
        customFields: {}
      }

      for (const { key, value } of categoryCustomFields) {
        const field = categoryResults.customFields[key]

        if (field !== undefined) {
          if (CATEGORY_CUSTOM_FIELD_DATA_TYPES[field.dataType] === true) {
            const dateValue = new Date(value)

            if (isNaN(dateValue)) {
              throw new BadRequestError(`Category data type is invalid for "${field.label}": ${value}`)
            }

            category.customFields[key] = value
          }
        }
      }
    }

    if (donor !== undefined) {
      const donorName = sanitize(donor)
      const donorNorm = donorName.toLowerCase()

      await InkindDonationDonorModel.updateOne({
        norm: donorNorm
      }, {
        $setOnInsert: {
          name: donorName,
          norm: donorNorm
        }
      } , {
        upsert: true
      })
    }

    if (group !== undefined) {
      const groupName = sanitize(group)
      const groupNorm = groupName.toLowerCase()

      await InkindDonationGroupModel.updateOne({
        norm: groupNorm
      }, {
        $setOnInsert: {
          name: groupName,
          norm: groupNorm
        }
      } , {
        upsert: true
      })
    }

    try {
      const results = await InkindDonationModel.create({
        sku,
        skuText: sku,
        name,
        description,
        quantity,
        donor,
        unit,
        category,
        group
      })
      
      return results.toObject({ 
        minimize: true,
        versionKey: false,
        useProjection: true
      })
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.sku === 1) {
        throw new ConflictError(`Duplicate SKU item: ${sku}`)
      }

      throw error
    }
  }

  static async list(query) {
    const {
      limit,
      offset,
      grouped,
      'filters.query': filterQuery
    } = query

    let results, total

    if (grouped) {
      const aggregationResults = await Promise.all([
        InkindDonationModel.aggregate([
          {
            $group: {
              _id: '$group',
              quantity: {
                $sum: '$quantity'
              }
            }
          },
          { 
            $addFields: {
              fieldType: { 
                $type: '$_id'
              } 
            } 
          },
          {
            $sort: {
              fieldType: -1,
              _id: 1,
            }
          },
          {
            $project: {
              fieldType: 0
            }
          },
          {
            $project: {
              _id: {
                $ifNull: ['$_id', 'Ungrouped Items'],
              },
              quantity: 1
            }
          },
          {
            $skip: offset
          },
          {
            $limit: limit
          }
        ]),
        InkindDonationModel.aggregate([ 
          {
            $group: {
              _id: '$group',
              quantity: {
                $count: {}
              }
            }
          },
          {
            $count: 'count'
          }
        ])
      ])

      results = aggregationResults[0]
      total = aggregationResults[1][0].count
    } else {
      const matchQuery = {}

      if (filterQuery !== undefined && filterQuery !== '') {
        matchQuery.$text = {
          $search: decodeURIComponent(filterQuery)
        }
      }

      [results, total] = await Promise.all([
        InkindDonationModel.find(matchQuery, undefined, { 
          lean: true,
          limit,
          skip: offset
        }),
        InkindDonationModel.countDocuments(matchQuery)
      ])
    }

    return {
      results,
      total
    }
  }

  static async get(id) {
    const inkindDonation = await InkindDonationModel.findById(id, undefined, { lean: true })

    if (inkindDonation === null) {
      throw new NotFoundError(`In-kind donation does not exist: ${id}`)
    }

    return inkindDonation
  }
}

module.exports = InkindDonationsController