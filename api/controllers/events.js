'use strict'

const { Storage } = require('@google-cloud/storage')
const { Types } = require('mongoose')

const EventModel = require('../models/events')
const config = require('../config')

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

  static async create(req, res, next) {
    const {
      name,
      description,
      date,
      goals,
      location,
      contactPersons
    } = req.body

    const sanitizedName = sanitize(name)

    try {
      const _id = new Types.ObjectId()
      let logoUrl

      if (req.file !== undefined) {
        const { originalname, buffer} = req.file

        const filename = `${_id.toString()}/logo-${Date.now().toString(36)}-${originalname}`

        await EventsController.uploadFile(filename, buffer)

        logoUrl = `https://storage.googleapis.com/aral-pinoy-events/${filename}`
      }

      /** @type {Document} */
      const results = await EventModel.create({
        _id,
        name: sanitizedName,
        description,
        date,
        location,
        goals: {
          numVolunteers: 0,
          monetaryDonation: goals.monetaryDonation
        },
        contactPersons,
        logoUrl
      })
  
      const event = results.toObject({
        minimize: true,
        versionKey: false,
        useProjection: true
      })
  
      return res.status(201).json(event)
    } catch (error) {
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