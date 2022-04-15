'use strict'

const EventTemplateModel = require('../../models/events/templates')

const { 
  NotFoundError,
} = require('../../errors')

const whitespaceRegex = /\s+/g

const SORT_ORDER_MAPPING = {
  asc : 1,
  desc: -1
}

function sanitize(name) {
  return name.replace(whitespaceRegex, ' ')
}

class EventTemplateController {
  static async create(template) {
    const {
      name,
      description,
      goals,
      location,
      sdgIds,
      jobs: eventJobs,
      questions
    } = template

    let jobs

    if (Array.isArray(eventJobs) && eventJobs.length > 0) {
      jobs = []

      for (const job of eventJobs) {
        jobs.push({
          name: sanitize(job.name),
          description: job.description,
          requirements: job.requirements,
          skills: job.skillIds
        })
      }
    }

    /** @type {Document} */
    const result = await EventTemplateModel.create({
      name: sanitize(name),
      description,
      location,
      goals: {
        monetaryDonation: goals.monetaryDonation
      },
      sdgIds,
      jobs,
      questions
    })

    return result.toObject({
      minimize: true,
      versionKey: false,
      useProjection: true
    })
  }

  static async list(options = {}) {
    const {
      sort
    } = options

    const queryOptions = {
      populate: ['jobs.skills']
    }

    if (sort !== undefined) {
      const { field, order } = sort

      queryOptions.sort = {
        [field]: SORT_ORDER_MAPPING[order]
      }
    }

    const [templates, total] = await Promise.all([
      EventTemplateModel.find(undefined, undefined, queryOptions),
      EventTemplateModel.countDocuments()
    ])

    return {
      results: templates,
      total
    }
  }

  static async get(id) {
    const template = await EventTemplateModel.findById(id, undefined, {
      lean: true,
      populate: ['jobs.skills']
    })

    if (template === null) {
      throw new NotFoundError('Event template does not exist')
    }

    return template
  }

  static async deleteTemplate(id) {
    const { deletedCount } = await EventTemplateModel.deleteOne({
      _id: id
    })

    if (deletedCount === 0) {
      throw new NotFoundError('Event template does not exist')
    }
  }
}

module.exports = EventTemplateController