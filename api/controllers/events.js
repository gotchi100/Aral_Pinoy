'use strict'

const { Storage } = require('@google-cloud/storage')
const { Types } = require('mongoose')

const config = require('../config')

const EventModel = require('../models/events')
const SdgModel = require('../models/sdgs')
const InkindDonationModel = require('../models/inkind-donations')
const IkdOutboundTransactionModel = require('../models/inkind-donations/outbound-transactions')

const { OUTBOUND_RECEIVER_TYPES } = require('../constants/inkind-donations')

const { NotFoundError } = require('../errors')

/** @typedef {import('mongoose').Document} Document */

const storage = new Storage({
  keyFilename: config.google.cloud.serviceAccount,
  projectId: 'aral-pinoy'
})

const eventsBucket = storage.bucket('aral-pinoy-events')

const whitespaceRegex = /\s+/g

function sanitize(name) {
  return name.replace(whitespaceRegex,' ')
}

class EventsController {
  static uploadFile(filename, buffer) {
    const bucketFile = eventsBucket.file(filename)

    return bucketFile.save(buffer, {
      public: true
    })
  }

  static async create(event) {
    const {
      name,
      description,
      date,
      goals,
      location,
      contactPersons,
      logoFile,
      sdgIds,
      ikdItems
    } = event

    const sanitizedName = sanitize(name)

    const eventId = new Types.ObjectId()
    let logoUrl
    let sdgs
    let ikds

    if (Array.isArray(sdgIds) && sdgIds.length > 0) {
      sdgs = []

      for (const sdgId of sdgIds) {
        const sdg = await SdgModel.findById(sdgId)

        if (sdg === null) {
          throw new NotFoundError(`SDG does not exist: ${sdgId}`)
        }

        sdgs.push({
          name: sdg.name,
          description: sdg.description,
          imageUrl: sdg.imageUrl,
          questions: sdg.questions
        })
      }
    }

    if (Array.isArray(ikdItems) && ikdItems.length > 0) {
      ikds = []

      for (const item of ikdItems) {
        const ikd = await InkindDonationModel.findById(
          item.ikdId, 
          ['sku', 'name', 'category.name'], 
          {
            lean: true
          }
        )

        if (ikd === null) {
          throw new NotFoundError(`In-kind Donation does not exist: ${item.ikdId}`)
        }

        const itemToAdd = {
          sku: ikd.sku,
          name: ikd.name,
        }

        if (ikd.category !== undefined) {
          itemToAdd.category = {
            name: ikd.category.name
          }
        }

        ikds.push({
          item: itemToAdd,
          quantity: item.quantity
        })

        await IkdOutboundTransactionModel.create({
          quantity: item.quantity,
          date: date.start,
          item: itemToAdd,
          receiver: {
            type: OUTBOUND_RECEIVER_TYPES.EVENT,
            event: eventId
          }
        })
      }
    }

    if (logoFile !== undefined) {
      const { originalname, buffer} = logoFile

      const filename = `${eventId.toString()}/logo-${Date.now().toString(36)}-${originalname}`

      await EventsController.uploadFile(filename, buffer)

      logoUrl = `https://storage.googleapis.com/aral-pinoy-events/${filename}`
    }

    /** @type {Document} */
    const results = await EventModel.create({
      _id: eventId,
      name: sanitizedName,
      description,
      date,
      location,
      goals: {
        numVolunteers: 0,
        monetaryDonation: goals.monetaryDonation
      },
      contactPersons,
      logoUrl,
      sdgs,
      ikds
    })

    return results.toObject({
      minimize: true,
      versionKey: false,
      useProjection: true
    })
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
      const [events, total] = await Promise.all([
        EventModel.find(query, undefined, { 
          lean: true,
          limit,
          skip: offset,
        }),
        EventModel.countDocuments(query)
      ])
  
      return res.json({
        results: events,
        total
      })
    } catch (error) {
      next(error)
    }
  }

  static async get(req, res) {
    const { id } = req.params

    const event = await EventModel.findById(id, undefined, {
      lean: true
    })

    if (event === null) {
      return res.status(404).json({
        code: 'NotFound',
        status: 404,
        message: 'Event not found'
      })
    }

    return res.json(event)
  }
}

module.exports = EventsController