'use strict'

const { Types } = require('mongoose')
const Joi = require('joi')

const EventEvaluationModel = require('../../models/events/evaluations')
const EventVolunteerModel = require('../../models/events/volunteers')
const EventModel = require('../../models/events')
const UserModel = require('../../models/users')

const { STATUSES } = require('../../constants/events')

const { 
  NotFoundError,
  ConflictError
} = require('../../errors')

const polarQuestionValidation = Joi.number().integer().min(0).max(1)
const matrixQuestionValidation = Joi.string().valid('Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied')

class EventEvaluationController {
  static async create(eventId, userId, evaluation) {
    const {
      rating,
      comment,
      sdgAnswers,
      questionnaireAnswers,
    } = evaluation

    const eventVolunteer = await EventVolunteerModel.findOne({
      user: userId,
      event: eventId
    }, ['_id', '__v', 'hasEventEvaluation'], {
      lean: true
    })

    if (eventVolunteer === null) {
      throw new ConflictError('Invalid evaluation: User did not volunteer to this event')
    }

    if (eventVolunteer.hasEventEvaluation === true) {
      throw new ConflictError('Evaluation from user already exists!')
    }

    const event = await EventModel.findById(eventId, ['_id', 'status', 'sdgs', 'questions'], {
      lean: true
    })

    if (event === null) {
      throw new NotFoundError(`Event does not exist: ${eventId}`)
    }

    if (event.status !== STATUSES.ENDED) {
      throw new NotFoundError(`Unable to add evaluation: Event is [${event.status}]`)
    }

    const user = await UserModel.findOne({
      _id: userId,
      roles: {
        $in: ['volunteer']
      }
    }, ['_id'], {
      lean: true
    })

    if (user === null) {
      throw new NotFoundError(`User does not exist: ${userId}`)
    }

    EventEvaluationController.validateEvaluationAnswers(event, {
      sdgAnswers,
      questionnaireAnswers
    })

    try {
      const eventEvaluation = new EventEvaluationModel({
        user,
        event,
        rating,
        comment,
        sdgAnswers,
        questionnaireAnswers,
      })

      const eventVolunteerUpdateResults = await EventVolunteerModel.updateOne({
        _id: eventVolunteer._id,
        __v: eventVolunteer.__v
      }, {
        $set: {
          eventEvaluation: eventEvaluation._id
        },
        $inc: {
          __v: 1
        }
      })
  
      if (eventVolunteerUpdateResults.matchedCount === 0) {
        throw new ConflictError('Event volunteer was recently updated. Please try again')
      }

      await eventEvaluation.save()
  
      return eventEvaluation.toObject({ 
        minimize: true,
        versionKey: false,
        useProjection: true
      })
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictError('Evaluation from user already exists!')
      }
      
      throw error
    }
  }

  static validateEvaluationAnswers(event, evaluation) {
    const {
      sdgAnswers,
      questionnaireAnswers,
    } = evaluation

    if (event.sdgs !== undefined) {
      if (!Array.isArray(sdgAnswers)) {
        throw new ConflictError('Answers for evaluation sdg is required')
      }

      const sdgLength = sdgAnswers.length

      if (sdgLength !== event.sdgs.length) {
        throw new ConflictError('Answers for evaluation sdg is incomplete')
      }

      for (let i = 0; i < sdgLength; i++) {
        const sdg = event.sdgs[i]
        const sdgAnswer = sdgAnswers[i]

        if (sdgAnswer.length !== sdg.questions.length) {
          throw new ConflictError('Answers for evaluation sdg is incomplete')
        }
        
        for (let j = 0; j < sdgAnswer.length; j++) {
          const sdgQuestion = sdg.questions[j]
          const answer = sdgAnswer[j]

          if (sdgQuestion.type === 'polar') {
            const { error } = polarQuestionValidation.validate(answer)

            if (error !== undefined) {
              throw new ConflictError(`Invalid answer to SDG question: [${sdgQuestion.label}]:[${error.message}]`)
            }
          } else {
            throw new ConflictError(`Unknown question type for evaluation sdg: [${sdgQuestion.type}]`)
          }
        }
      }
    } else if (sdgAnswers !== undefined) {
      throw new ConflictError('Answers were provided to evaluation sdg questionnaire')
    }

    if (event.questions !== undefined) {
      if (!Array.isArray(questionnaireAnswers)) {
        throw new ConflictError('Answers for evaluation questionnaire is required')
      }

      const questionnaireLength = questionnaireAnswers.length

      if (questionnaireLength !== event.questions.length) {
        throw new ConflictError('Answers for evaluation questionnaire is incomplete')
      }

      for (let i = 0; i < questionnaireLength; i++) {
        const eventQuestion = event.questions[i]
        const answer = questionnaireAnswers[i]

        if (eventQuestion.type === 'matrix') {
          const { error } = matrixQuestionValidation.validate(answer)

          if (error !== undefined) {
            throw new ConflictError(`Invalid answer to question: [${eventQuestion.label}]:[${error.message}]`)
          }
        } else {
          throw new ConflictError(`Unknown question type for evaluation questionnaire: [${eventQuestion.type}]`)
        }
      }
    } else if (questionnaireAnswers !== undefined) {
      throw new ConflictError('Answers were provided to evaluation questionnaire')
    }
  }

  static async list(options = {}) {
    const {
      limit,
      offset,
      filters: {
        userId,
        eventId
      }
    } = options

    const matchQuery = {}
    const queryOptions = { 
      lean: true,
      limit,
      skip: offset
    }

    if (userId !== undefined) {
      matchQuery.user = new Types.ObjectId(userId)
    }

    if (eventId !== undefined) {
      matchQuery.event = new Types.ObjectId(eventId)
    }

    const [evaluations, total] = await Promise.all([
      EventEvaluationModel.find(matchQuery, undefined, queryOptions),
      EventEvaluationModel.countDocuments(matchQuery)
    ])

    return {
      results: evaluations,
      total
    }
  }

  static async get(id) {
    const evaluation = await EventEvaluationModel.findById(id, undefined, {
      lean: true,
      populate: ['user']
    })

    if (evaluation === null) {
      throw new NotFoundError(`Event evaluation does not exist: ${id}`)
    }

    return evaluation
  }
}

module.exports = EventEvaluationController