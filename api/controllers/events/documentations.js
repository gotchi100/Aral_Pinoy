'use strict'

const { Storage } = require('@google-cloud/storage')
const { Types } = require('mongoose')

const config = require('../../config')

const EventDocumentationModel = require('../../models/events/documentations')

const {
  NotFoundError
} = require('../../errors')

/** @typedef {import('mongoose').Document} Document */

const storage = new Storage({
  keyFilename: config.google.cloud.serviceAccount,
  projectId: 'aral-pinoy'
})

const EVENTS_BUCKET_URL = config.google.cloud.storage.bucketNames.events

const eventsBucket = storage.bucket(EVENTS_BUCKET_URL)

class EventDocumentationController {
  static uploadFile(filename, buffer) {
    const bucketFile = eventsBucket.file(filename)

    return bucketFile.save(buffer, {
      public: true
    })
  }

  /**
   * 
   * @param {string} filename File name
   * @returns {Promise<void>}
   */
  static async deleteFile(filename) {
    const bucketFile = eventsBucket.file(filename)

    await bucketFile.delete({
      ignoreNotFound: true
    })
  }

  /**
   * 
   * @param {Object} params Parameters
   * @param {string} params.eventId Event Id
   * @param {string} params.type Documentation type
   * @param {File} params.file Event documentation
   * @returns 
   */
  static async create(params) {
    const {
      eventId,
      type,
      file
    } = params

    const { originalname, buffer} = file
    const filename = `${eventId}/documentation-${Date.now().toString(36)}-${encodeURI(originalname)}`
    await EventDocumentationController.uploadFile(filename, buffer)

    const documentationUrl = `https://storage.googleapis.com/${EVENTS_BUCKET_URL}/${filename}`

    /** @type {Document} */
    const results = await EventDocumentationModel.create({
      event: new Types.ObjectId(eventId),
      type,
      originalFilename: originalname,
      storagePath: filename,
      url: documentationUrl
    })

    return results.toObject({
      minimize: true,
      versionKey: false,
      useProjection: true
    })
  }

  /**
   * 
   * @param {Object} params Parameters
   * @param {string} params.eventId Event Id
   * @param {Object} params.options Options 
   * @param {number} params.options.offset List offset
   * @param {number} params.options.limit List limit
   * @returns 
   */
  static async list(params) {
    const {
      eventId,
      options: {
        limit,
        offset,
      }
    } = params

    const query = {
      event: new Types.ObjectId(eventId)
    }
    const queryOptions = {
      limit,
      skip: offset
    }

    const [documentations, total] = await Promise.all([
      EventDocumentationModel.find(query, undefined, queryOptions),
      EventDocumentationModel.countDocuments(query)
    ])

    return {
      results: documentations,
      total
    }
  }

  /**
   * 
   * @param {Object} params Parameters
   * @param {string} params.documentationId Documentation Id
   * @returns {Promise<void>}
   */
  static async deleteDocumentation(params) {
    const {
      documentationId
    } = params

    const documentation = await EventDocumentationModel.findOneAndDelete({
      _id: new Types.ObjectId(documentationId)
    }, {
      lean: true,
      projection: {
        storagePath: 1
      }
    })

    if (documentation === null) {
      throw new NotFoundError('event_documentation')
    }

    await EventDocumentationController.deleteFile(documentation.storagePath)
  }
}

module.exports = EventDocumentationController