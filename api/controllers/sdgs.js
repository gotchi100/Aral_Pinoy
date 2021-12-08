'use strict'

const SdgModel = require('../models/sdgs')

const { 
  NotFoundError
} = require('../errors')

class SdgController {
  static async list(query) {
    const {
      limit,
      offset,
    } = query

    const [sdgs, total] = await Promise.all([
      SdgModel.find(undefined, undefined, { 
        lean: true,
        limit,
        skip: offset
      }),
      SdgModel.countDocuments()
    ])

    return {
      results: sdgs,
      total
    }
  }

  static async get(id) {
    const sdg = await SdgModel.findById(id, undefined, { lean: true })

    if (sdg === null) {
      throw new NotFoundError(`SDG does not exist: ${id}`)
    }

    return sdg
  }
}

module.exports = SdgController