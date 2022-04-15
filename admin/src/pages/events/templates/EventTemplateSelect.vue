<template>
  <div>
    <b-container class="py-5">
      <b-row>
        <b-col cols="12">
          <b-card
            class="card"
            style="border-radius: 20px;"
          >
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Select Event Template
                  </h1>
                </b-col>

                <b-col cols="12">
                  <b-button
                    to="/event-templates/add"
                    variant="success"
                    class="mx-3"
                  >
                    Create New Event Template
                  </b-button>
                </b-col>

                <b-col
                  cols="12"
                  class="my-3"
                >
                  <b-skeleton-wrapper :loading="isFetchingTemplates">
                    <template #loading>
                      <b-card>
                        <b-skeleton width="85%" />
                        <b-skeleton width="55%" />
                        <b-skeleton width="70%" />
                      </b-card>

                      <b-card>
                        <b-skeleton width="85%" />
                        <b-skeleton width="55%" />
                        <b-skeleton width="70%" />
                      </b-card>

                      <b-card>
                        <b-skeleton width="85%" />
                        <b-skeleton width="55%" />
                        <b-skeleton width="70%" />
                      </b-card>
                    </template>

                    <b-list-group>
                      <b-list-group-item
                        v-for="template in templates.results"
                        :key="template._id"
                        class="flex-column align-items-start"
                        to="#"
                        style="text-align: left"
                        @click="selectTemplate(template._id)"
                      >
                        <div class="d-flex w-100 justify-content-between">
                          <div>
                            <div>
                              <h5 class="mb-1">
                                {{ template.name }}
                              </h5>
                            </div>

                            <p class="mb-1">
                              {{ template.description }}
                            </p>
                          </div>

                          <button
                            class="btn btn-link"
                            type="button"
                            style="color: #dc3545"
                            @click.stop="showDeleteTemplate(template._id)"
                          >
                            <b-icon icon="trash" />
                          </button>
                        </div>
                      </b-list-group-item>
                    </b-list-group>
                  </b-skeleton-wrapper>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-modal
      v-model="showDeleteTemplateModal"
      size="xl"
      @ok="deleteTemplate"
    >
      <b-container fluid>
        <h1 style="font-family:'Bebas Neue', cursive; text-align:center;">
          Are you sure you want to delete this template?
        </h1>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import EventTemplateRepository from '../../../repositories/events/templates'
import { apiClient } from '../../../axios'

const eventTemplateRepository = new EventTemplateRepository(apiClient)

export default ({
  name: 'EventTemplateSelect',
  data () {
    return {
      isFetchingTemplates: false,
      templates: {
        results: [],
        total: 0
      },
      templateIdToDelete: null,
      showDeleteTemplateModal: false
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {
    showDeleteTemplateModal () {
      if (this.showDeleteTemplateModal === false) {
        this.templateIdToDelete = null
      }
    }
  },
  async created () {
    eventTemplateRepository.setAuthorizationHeader(`Bearer ${this.token}`)

    await this.fetchTemplates()
  },
  methods: {
    async fetchTemplates () {
      this.isFetchingTemplates = true

      try {
        const { results, total } = await eventTemplateRepository.list({
          sort: {
            field: 'name',
            order: 'asc'
          }
        })

        this.templates.results = results
        this.templates.total = total
      } finally {
        this.isFetchingTemplates = false
      }
    },
    selectTemplate (templateId) {
      this.$router.push({
        path: '/events/add',
        query: {
          templateId
        }
      })
    },
    showDeleteTemplate (templateIdToDelete) {
      this.templateIdToDelete = templateIdToDelete
      this.showDeleteTemplateModal = true
    },
    async deleteTemplate () {
      if (this.templateIdToDelete === null) {
        return
      }

      this.isFetchingTemplates = true

      await eventTemplateRepository.deleteTemplate(this.templateIdToDelete)

      this.$router.go()
    }
  }
})
</script>
