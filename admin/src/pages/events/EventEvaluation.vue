<template>
  <div>
    <div class="py-5">
      <img
        :src="logo"
        style="width: 320px; height: 150px"
      >
    </div>

    <b-container>
      <b-row>
        <b-col cols="12">
          <b-overlay
            :show="isLoadingEventEvaluation && isLoadingEvent"
            rounded="sm"
          >
            <b-card
              class="mb-5"
              bg-variant="light"
              style="border-radius: 20px;"
            >
              <template v-if="event !== null">
                <div class="pb-3">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    {{ event.name }}
                  </h1>

                  <h4 style="font-family:'Bebas Neue', cursive;">
                    {{ event.location.name }}
                  </h4>

                  <h4 style="font-family:'Bebas Neue', cursive;">
                    {{
                      new Date(event.date.start).toLocaleString('en-us', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })
                    }} -
                    {{
                      new Date(event.date.end).toLocaleString('en-us', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })
                    }}
                  </h4>
                </div>

                <div class="pb-3">
                  <h5 style="font-family:'Bebas Neue', cursive;">
                    Evaluation by: {{ userFullName }}
                  </h5>
                </div>

                <b-container fluid>
                  <b-row v-if="hasEventQuestions && questionnaireAnswers.length > 0">
                    <b-col cols="12">
                      <b-card class="mb-4">
                        <b-container fluid>
                          <b-row>
                            <b-col cols="12">
                              <h2 style="font-family:'Bebas Neue', cursive; text-align: center;">
                                Event Questionnaire
                              </h2>
                            </b-col>
                          </b-row>

                          <b-row
                            v-for="(question, questionIndex) in event.questions"
                            :key="questionIndex"
                            style="text-align: left;"
                          >
                            <b-form-group
                              v-if="question.type === 'matrix'"
                              :label="`${questionIndex + 1}. ${question.label}`"
                            >
                              <b-col
                                class="mb-3"
                                cols="12"
                              >
                                <b-form-input
                                  v-model="questionnaireAnswers[questionIndex]"
                                  readonly
                                />
                              </b-col>
                            </b-form-group>
                          </b-row>
                        </b-container>
                      </b-card>
                    </b-col>
                  </b-row>

                  <b-row v-if="hasEventSdgs && sdgAnswers.length > 0">
                    <b-col cols="12">
                      <b-card class="mb-4">
                        <b-container fluid>
                          <b-row>
                            <b-col cols="12">
                              <h2 style="font-family:'Bebas Neue', cursive; text-align: center;">
                                SDG Evaluation Form
                              </h2>
                            </b-col>
                          </b-row>

                          <b-row>
                            <b-col
                              v-for="(sdg, sdgIndex) in event.sdgs"
                              :key="sdgIndex"
                              cols="12"
                            >
                              <b-card class="mb-3">
                                <b-container fluid>
                                  <b-row>
                                    <b-col cols="12">
                                      <h4 style="font-family:'Bebas Neue', cursive; text-align: left">
                                        {{ sdg.name }}
                                      </h4>
                                    </b-col>

                                    <b-col
                                      class="mb-3"
                                      cols="12"
                                      style="text-align: left"
                                    >
                                      <span>
                                        {{ sdg.description }}
                                      </span>
                                    </b-col>

                                    <b-col
                                      cols="12"
                                      style="text-align: left"
                                    >
                                      <b-row
                                        v-for="(question, questionIndex) in sdg.questions"
                                        :key="`${sdgIndex}-${questionIndex}`"
                                      >
                                        <b-form-group
                                          v-if="question.type === 'polar'"
                                          :label="`${questionIndex + 1}. ${question.label}`"
                                        >
                                          <b-col
                                            class="mb-3"
                                            cols="12"
                                          >
                                            <b-col
                                              class="mb-3"
                                              cols="12"
                                            >
                                              <b-form-input
                                                :value="convertPolarAnswer(sdgAnswers[sdgIndex][questionIndex])"
                                                readonly
                                              />
                                            </b-col>
                                          </b-col>
                                        </b-form-group>
                                      </b-row>
                                    </b-col>
                                  </b-row>
                                </b-container>
                              </b-card>
                            </b-col>
                          </b-row>
                        </b-container>
                      </b-card>
                    </b-col>
                  </b-row>

                  <b-card class="mb-4">
                    <b-container fluid>
                      <h4 style="font-family:'Bebas Neue', cursive; text-align: left;">
                        Recommendations and Comments
                      </h4>

                      <b-form-textarea
                        v-model="eventEvaluation.comment"
                        readonly
                        rows="10"
                        max-rows="6"
                      />
                    </b-container>
                  </b-card>
                </b-container>
              </template>
            </b-card>
          </b-overlay>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { apiClient } from '../../axios'
import EventRepository from '../../repositories/events'
import EventEvaluationRepository from '../../repositories/events/evaluations'

const logo = require('../../assets/aralpinoywords.png')

const eventRepository = new EventRepository(apiClient)
const eventEvaluationRepository = new EventEvaluationRepository(apiClient)

export default {
  data () {
    return {
      logo,
      isLoadingEventEvaluation: false,
      isLoadingEvent: false,
      event: null,
      eventEvaluation: null,
      sdgAnswers: [],
      questionnaireAnswers: []
    }
  },
  computed: {
    ...mapGetters(['user', 'token']),
    eventEvaluationId () {
      return this.$route.params.id
    },
    eventId () {
      if (this.eventEvaluation === null) {
        return
      }

      return this.eventEvaluation.event
    },
    hasEventSdgs () {
      if (this.event === null) {
        return false
      }

      return Array.isArray(this.event.sdgs) && this.event.sdgs.length > 0
    },
    hasEventQuestions () {
      if (this.event === null) {
        return false
      }

      return Array.isArray(this.event.questions) && this.event.questions.length > 0
    },
    userFullName () {
      if (this.eventEvaluation === null) {
        return ''
      }

      const user = this.eventEvaluation.user

      return `${user.firstName} ${user.lastName}`
    }
  },
  async created () {
    const authHeader = `Bearer ${this.token}`

    eventRepository.setAuthorizationHeader(authHeader)
    eventEvaluationRepository.setAuthorizationHeader(authHeader)

    await this.getEventEvaluation()
    await this.getEvent()
    this.formatForm()
  },
  methods: {
    async getEventEvaluation () {
      this.isLoadingEventEvaluation = true

      const eventEvaluationId = this.eventEvaluationId

      try {
        const eventEvaluation = await eventEvaluationRepository.get(eventEvaluationId)

        this.eventEvaluation = eventEvaluation
      } finally {
        this.isLoadingEventEvaluation = false
      }
    },
    async getEvent () {
      this.isLoadingEvent = true

      const eventId = this.eventId

      try {
        const event = await eventRepository.get(eventId)

        this.event = event
      } finally {
        this.isLoadingEvent = false
      }
    },
    formatForm () {
      const eventEvaluation = this.eventEvaluation

      if (this.hasEventSdgs) {
        for (const sdgAnswer of eventEvaluation.sdgAnswers) {
          const innerSdgAnswers = []

          for (const innerSdgAnswer of sdgAnswer) {
            innerSdgAnswers.push(innerSdgAnswer)
          }

          this.sdgAnswers.push(innerSdgAnswers)
        }
      }

      if (this.hasEventQuestions) {
        for (const questionnaireAnswer of eventEvaluation.questionnaireAnswers) {
          this.questionnaireAnswers.push(questionnaireAnswer)
        }
      }
    },
    convertPolarAnswer (answer) {
      return answer === 1 ? 'Yes' : 'No'
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
</style>
