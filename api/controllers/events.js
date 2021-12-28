'use strict'

const { Storage } = require('@google-cloud/storage')
const { Types } = require('mongoose')

const config = require('../config')

const EventModel = require('../models/events')
const EventJobModel = require('../models/event-jobs')
const SkillModel = require('../models/skills')
const SdgModel = require('../models/sdgs')
const InkindDonationModel = require('../models/inkind-donations')
const IkdOutboundTransactionModel = require('../models/inkind-donations/outbound-transactions')
const UserModel = require('../models/users')

const GoogleCalendarController = require('./google/calendar')

const { OUTBOUND_RECEIVER_TYPES } = require('../constants/inkind-donations')

const { 
  NotFoundError,
  ConflictError
} = require('../errors')

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
      contacts,
      logoFile,
      sdgIds,
      ikdItems,
      jobs: eventJobs,
      questions: eventQuestions
    } = event

    const sanitizedName = sanitize(name)

    const eventId = new Types.ObjectId()
    let logoUrl
    let sdgs
    let ikds
    let jobs
    let questions
    let numVolunteers = 0

    if (logoFile !== undefined) {
      const { originalname, buffer} = logoFile

      const filename = `${eventId.toString()}/logo-${Date.now().toString(36)}-${originalname}`

      await EventsController.uploadFile(filename, buffer)

      logoUrl = `https://storage.googleapis.com/aral-pinoy-events/${filename}`
    }

    if (Array.isArray(ikdItems) && ikdItems.length > 0) {
      ikds = []

      for (const item of ikdItems) {
        const ikd = await InkindDonationModel.findById(
          item.ikdId, 
          ['sku', 'name', 'category.name', '__v'], 
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

        const itemUpdateResults = await InkindDonationModel.updateOne({
          _id: new Types.ObjectId(item.ikdId), 
          __v : ikd.__v
        }, {
          $inc: {
            quantity: -(item.quantity),
            __v : 1
          }
        })
    
        if (itemUpdateResults.matchedCount === 0) {
          throw new ConflictError('In-kind donation was recently updated, please try again')
        }

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

    if (Array.isArray(eventJobs) && eventJobs.length > 0) {
      jobs = []

      for (const job of eventJobs) {
        const jobSkills = []
        const skillIds = []

        for (const skillId of job.skillIds) {
          const skill = await SkillModel.findById(skillId, ['name', 'norm', 'description'], {
            lean: true
          })

          if (skill === null) {
            throw new NotFoundError(`Skill does not exist: ${skillId}`)
          }

          jobSkills.push({
            name: skill.name,
            norm: skill.norm,
            description: skill.description,
          })
          skillIds.push(skill._id)
        }
        
        const sanitizedJobName = sanitize(job.name)
        const jobNorm = sanitizedJobName.toLowerCase()

        await EventJobModel.updateOne({
          norm: jobNorm
        }, {
          $setOnInsert: {
            name: sanitizedJobName,
            norm: jobNorm,
            description: job.description,
            skills: skillIds
          }
        }, {
          upsert: true
        })

        numVolunteers += job.requirements.max

        jobs.push({
          name: sanitizedJobName,
          description: job.description,
          requirements: job.requirements,
          skills: jobSkills
        })
      }
    }

    if (Array.isArray(eventQuestions) && eventQuestions.length > 0) {
      questions = []
      
      for (const question of eventQuestions) {
        questions.push({
          label: question.label,
          type: question.type
        })
      }
    }

    /** @type {Document} */
    const results = await EventModel.create({
      _id: eventId,
      name: sanitizedName,
      description,
      date,
      location,
      goals: {
        numVolunteers,
        monetaryDonation: goals.monetaryDonation
      },
      contacts,
      logoUrl,
      sdgs,
      ikds,
      jobs,
      questions
    })

    const eventDocument = results.toObject({
      minimize: true,
      versionKey: false,
      useProjection: true
    })

    await EventsController.createGoogleEvent(eventDocument).catch((error) => console.dir(error, { depth: null }))

    return eventDocument
  }

  static async createGoogleEvent(event) {
    const {
      _id,
      name,
      description,
      location,
      date
    } = event

    const adminsAndOfficers = await UserModel.find({
      roles: {
        $in: ['admin','officer']
      }
    }, ['email'], {
      lean: true
    })

    const attendees = adminsAndOfficers.map((user) => ({
      email: user.email
    }))

    await GoogleCalendarController.createEvent({
      summary: name,
      address: location.name,
      description,
      attendees,
      startDate: date.start,
      endDate: date.end,
      metadata: {
        eventId: _id.toString()
      }
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

  static async get(id) {
    const event = await EventModel.findById(id, undefined, {
      lean: true
    })

    if (event === null) {
      throw new NotFoundError(`Event does not exist: ${id}`)
    }

    return event
  }
}

module.exports = EventsController