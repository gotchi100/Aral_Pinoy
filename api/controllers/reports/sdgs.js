'use strict'

const { startOfDay, endOfDay } = require('date-fns')

const EventModel = require('../../models/events')
const EventEvaluationModel = require('../../models/events/evaluations')

const MATRIX_QUESTION_REVERSE_MAP = {
  0: 'No',
  1: 'Yes'
}

class ReportSdgsController {
  /**
   * 
   * @param {Object} dateRange Date range object
   * @param {Date} dateRange.start Start date
   * @param {Date} dateRange.end End date
   * @returns 
   */
  static async get(dateRange) {
    const {
      start,
      end
    } = dateRange

    const eventFindQuery = {
      $and: [{
        status: 'ENDED',
        sdgs: {
          $exists: true
        }
      }]
    }

    if (start !== undefined) {
      eventFindQuery.$and.push({
        'date.start': {
          $gte: startOfDay(start),
        }
      })
    }

    if (end !== undefined) {
      eventFindQuery.$and.push({
        'date.start': {
          $lte: endOfDay(end),
        }
      })
    }

    const events = await EventModel.find(eventFindQuery, ['_id'], {
      lean: true
    })

    if (events.length === 0) {
      return {
        noPovertySdgEvaluation: {
          labels: [],
          reverseLabelMap: {},
          datasets: []
        },
        qualityEducationSdgEvaluation : {
          labels: [],
          reverseLabelMap: {},
          datasets: []
        },
        climateActionSdgEvaluation : {
          labels: [],
          reverseLabelMap: {},
          datasets: []
        }
      }
    }

    const eventIds = []

    for (const event of events) {
      eventIds.push(event._id)
    }

    const evaluations = await EventEvaluationModel.find({
      event: {
        $in: eventIds
      },
      sdgAnswers: {
        $exists: true
      }
    }, ['sdgAnswers', 'event'], {
      lean: true,
      populate: {
        path: 'event',
        select: ['sdgs']
      }
    })

    if (evaluations.length === 0) {
      return {
        noPovertySdgEvaluation: {
          labels: [],
          reverseLabelMap: {},
          datasets: []
        },
        qualityEducationSdgEvaluation : {
          labels: [],
          reverseLabelMap: {},
          datasets: []
        },
        climateActionSdgEvaluation : {
          labels: [],
          reverseLabelMap: {},
          datasets: []
        }
      }
    }

    const sdgQuestionCounterMap = new Map()
    const sdgQuestionReverseLabelMap = new Map()

    for (const evaluation of evaluations) {
      const sdgs = evaluation.event.sdgs

      for (let sdgIndex = 0; sdgIndex < sdgs.length; sdgIndex++) {
        const sdg = sdgs[sdgIndex]

        let questionAnswerCounterMap = sdgQuestionCounterMap.get(sdg.name)

        if (questionAnswerCounterMap === undefined) {
          questionAnswerCounterMap = new Map()

          sdgQuestionCounterMap.set(sdg.name, questionAnswerCounterMap)
        }

        for (let questionIndex = 0; questionIndex < sdg.questions.length; questionIndex++) {
          const sdgQuestion = sdg.questions[questionIndex]

          let reverseLabelMap = sdgQuestionReverseLabelMap.get(sdg.name)

          if (reverseLabelMap === undefined) {
            reverseLabelMap = new Map()

            sdgQuestionReverseLabelMap.set(sdg.name, reverseLabelMap)
          }

          reverseLabelMap.set(questionIndex, sdgQuestion.label)

          const answer = MATRIX_QUESTION_REVERSE_MAP[evaluation.sdgAnswers[sdgIndex][questionIndex]]

          let answerCounterMap = questionAnswerCounterMap.get(questionIndex)

          if (answerCounterMap === undefined) {
            answerCounterMap = new Map([
              ['Yes', 0],
              ['No', 0]
            ])

            questionAnswerCounterMap.set(questionIndex, answerCounterMap)
          }

          const answerCounter = answerCounterMap.get(answer)
          answerCounterMap.set(answer, answerCounter + 1)
        }
      }
    }

    const noPovertySdgEvaluation = {
      labels: [],
      reverseLabelMap: {},
      datasets: [{
        label: 'Yes',
        data: []
      }, {
        label: 'No',
        data: []
      }]
    }
    const noPovertyQuestionCounterMap = sdgQuestionCounterMap.get('#1 No Poverty')

    if (noPovertyQuestionCounterMap !== undefined) {
      const noPovertyReverseLabelMap = sdgQuestionReverseLabelMap.get('#1 No Poverty')

      for (const [questionIndex, answerCounterMap] of sdgQuestionCounterMap.get('#1 No Poverty').entries()) {
        const label = `Q${questionIndex + 1}`

        noPovertySdgEvaluation.labels.push(label)
        noPovertySdgEvaluation.reverseLabelMap[label] = noPovertyReverseLabelMap.get(questionIndex)
        noPovertySdgEvaluation.datasets[0].data.push(answerCounterMap.get('Yes'))
        noPovertySdgEvaluation.datasets[1].data.push(answerCounterMap.get('No'))
      }
    }

    const qualityEducationSdgEvaluation = {
      labels: [],
      reverseLabelMap: {},
      datasets: [{
        label: 'Yes',
        data: []
      }, {
        label: 'No',
        data: []
      }]
    }
    const qualityEducationQuestionCounterMap = sdgQuestionCounterMap.get('#4 Quality Education')

    if (qualityEducationQuestionCounterMap !== undefined) {
      const qualityEducationReverseLabelMap = sdgQuestionReverseLabelMap.get('#4 Quality Education')

      for (const [questionIndex, answerCounterMap] of sdgQuestionCounterMap.get('#4 Quality Education').entries()) {
        const label = `Q${questionIndex + 1}`

        qualityEducationSdgEvaluation.labels.push(label)
        qualityEducationSdgEvaluation.reverseLabelMap[label] = qualityEducationReverseLabelMap.get(questionIndex)
        qualityEducationSdgEvaluation.datasets[0].data.push(answerCounterMap.get('Yes'))
        qualityEducationSdgEvaluation.datasets[1].data.push(answerCounterMap.get('No'))
      }
    }

    const climateActionSdgEvaluation = {
      labels: [],
      reverseLabelMap: {},
      datasets: [{
        label: 'Yes',
        data: []
      }, {
        label: 'No',
        data: []
      }]
    }
    const climateActionQuestionCounterMap = sdgQuestionCounterMap.get('#13 Climate Action')

    if (climateActionQuestionCounterMap !== undefined) {
      const climateActionReverseLabelMap = sdgQuestionReverseLabelMap.get('#13 Climate Action')

      for (const [questionIndex, answerCounterMap] of sdgQuestionCounterMap.get('#13 Climate Action').entries()) {
        const label = `Q${questionIndex + 1}`

        climateActionSdgEvaluation.labels.push(label)
        climateActionSdgEvaluation.reverseLabelMap[label] = climateActionReverseLabelMap.get(questionIndex)
        climateActionSdgEvaluation.datasets[0].data.push(answerCounterMap.get('Yes'))
        climateActionSdgEvaluation.datasets[1].data.push(answerCounterMap.get('No'))
      }
    }

    return {
      noPovertySdgEvaluation,
      qualityEducationSdgEvaluation,
      climateActionSdgEvaluation
    }
  }
}

module.exports = ReportSdgsController