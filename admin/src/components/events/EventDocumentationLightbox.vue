<template>
  <b-modal
    v-model="modal"
    size="xl"
    hide-footer
    lazy
    body-class="position-static"
    @hide="$emit('close')"
  >
    <b-overlay
      :show="isDeleting"
    >
      <b-container v-if="documentation !== null">
        <b-alert
          :show="!!deletionErrorMessage"
          variant="primary"
        >
          {{ deletionErrorMessage }}
        </b-alert>

        <b-row>
          <b-col
            class="d-flex w-100 justify-content-center"
            cols="12"
          >
            <b-img
              v-if="documentation.type === 'IMAGE'"
              :src="documentation.url"
              fluid
              alt="Image"
            />
          </b-col>

          <b-col
            class="d-flex w-100 justify-content-center pt-3"
            cols="12"
          >
            <b-button
              variant="danger"
              :disabled="isDeleting"
              @click="confirmModal = true"
            >
              Delete
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-overlay>

    <b-modal
      v-model="confirmModal"
      @ok="deleteDocumentation"
      @cancel="confirmModal = false"
    >
      <b-container fluid>
        <h1 style="font-family:'Bebas Neue', cursive; text-align:center;">
          Are you sure you want to delete this?
        </h1>
      </b-container>
    </b-modal>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'

import EventDocumentationRepository from '../../repositories/events/documentations'
import { apiClient } from '../../axios'

const eventDocumentationRepository = new EventDocumentationRepository(apiClient)

const ERROR_MAP = {
  404: {
    event: 'Event does not exist!',
    event_documentation: 'Event documentation does not exist!'
  }
}

export default {
  name: 'EventDocumentationLightbox',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    documentation: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      modal: false,
      confirmModal: false,
      isDeleting: false
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {
    show (val) {
      this.modal = val
    }
  },
  created () {
    eventDocumentationRepository.setAuthorizationHeader(`Bearer ${this.token}`)
  },
  methods: {
    async deleteDocumentation () {
      this.confirmModal = false
      this.isDeleting = true

      const documentationId = this.documentation._id

      try {
        await eventDocumentationRepository.deleteDocumentation(documentationId)

        this.$emit('deleted', documentationId)
        this.$emit('close')
      } catch (error) {
        const data = error.response?.data

        if (data) {
          const { status, message } = data

          const statusMessageMap = ERROR_MAP[status]

          if (statusMessageMap === undefined) {
            this.errorMessage = 'An internal server error has occurred'

            return
          }

          const errorMessage = statusMessageMap[message]

          if (errorMessage === undefined) {
            this.errorMessage = 'An internal server error has occurred'

            return
          }

          this.errorMessage = errorMessage
        }
      } finally {
        this.isDeleting = false
      }
    }
  }
}
</script>

<style scoped>
.position-static {
  position: static;
}
</style>
