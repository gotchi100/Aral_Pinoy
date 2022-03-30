<template>
  <div>
    <b-container class="py-5">
      <b-row>
        <b-col cols="12">
          <b-card style="border-radius: 20px;">
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Skills
                  </h1>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <b-container>
                    <b-row align-h="end">
                      <b-col cols="4">
                        <b-form-group
                          style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                          label="Per page"
                          label-for="per-page-select"
                          content-cols="12"
                        >
                          <b-form-select
                            id="per-page-select"
                            v-model="perPage"
                            class="w-25"
                            :options="pageOptions"
                          />
                        </b-form-group>
                      </b-col>

                      <b-col cols="4" />

                      <b-col cols="4">
                        <b-form-group
                          style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                          label="Search"
                          label-size="sm"
                          label-cols
                          label-for="filter-skill"
                        >
                          <b-form-input
                            id="filter-skill"
                            v-model="skillFilter"
                            type="search"
                            size="sm"
                            debounce="500"
                          />
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-col>
              </b-row>

              <b-row class="pt-4">
                <b-col cols="12">
                  <b-table
                    :items="getSkills"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :filter="skillFilter"
                    stacked="md"
                    style="background:white"
                    show-empty
                    small
                    primary-key="_id"
                  >
                    <template #cell(actions)="{ item }">
                      <b-icon
                        variant="primary"
                        icon="pencil-square"
                        font-scale=".85"
                        style="cursor: pointer"
                        @click="showEditSkill(item)"
                      />
                      &nbsp;&nbsp;&nbsp;
                      <b-icon
                        variant="danger"
                        icon="trash-fill"
                        font-scale=".85"
                        style="cursor: pointer"
                        @click="showConfirmDeleteSkill(item)"
                      />
                    </template>
                  </b-table>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="9" />
                <b-col>
                  <b-button
                    pill
                    variant="danger"
                    style="margin-top: 12px; margin-bottom: 12px; display: inline-block; font-size: 16px; width: 150px;"
                    @click="showModal = !showModal"
                  >
                    Add a Skill
                  </b-button>
                </b-col>
              </b-row>

              <b-row class="pt-4">
                <b-col cols="12">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="total"
                    :per-page="perPage"
                    align="center"
                  />
                </b-col>
                <b-col />
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-modal
      v-model="showModal"
      size="xl"
      hide-footer
    >
      <b-overlay :show="isLoading">
        <validation-observer v-slot="{ invalid }">
          <b-container fluid>
            <h1
              style="font-family:'Bebas Neue', cursive;"
              no-body
              class="text-center"
            >
              Add a Skill
            </h1>

            <b-alert
              :show="!!errorMessage"
              variant="danger"
            >
              {{ errorMessage }}
            </b-alert>

            <b-row class="my-1">
              <label
                class="skill"
                for="input-skill-name"
              >
                Skill Label
              </label>

              <b-col>
                <validation-provider
                  v-slot="validationContext"
                  :rules="{
                    required: true,
                    max: 50
                  }"
                >
                  <b-form-input
                    id="input-skill-name"
                    v-model="name"
                    :state="getValidationState(validationContext)"
                    aria-describedby="input-skill-name-feedback"
                  />

                  <b-form-invalid-feedback id="input-skill-name-feedback">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </validation-provider>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <label for="input-skill-description">
                Skill Description
              </label>

              <b-col>
                <validation-provider
                  v-slot="validationContext"
                  :rules="{ max: 200 }"
                >
                  <b-form-input
                    id="input-skill-description"
                    v-model="description"
                    :state="getValidationState(validationContext)"
                    aria-describedby="input-skill-description-feedback"
                  />

                  <b-form-invalid-feedback id="input-skill-description-feedback">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </validation-provider>
              </b-col>
            </b-row>

            <b-button
              pill
              variant="danger"
              style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;"
              :disabled="invalid || isLoading"
              @click="addSkill"
            >
              Add Skill
            </b-button>
          </b-container>
        </validation-observer>
      </b-overlay>
    </b-modal>

    <b-modal
      v-model="editSkillForm.modal"
      hide-footer
    >
      <b-overlay :show="isLoading">
        <validation-observer v-slot="{ invalid }">
          <b-container fluid>
            <h1
              style="font-family:'Bebas Neue', cursive;"
              no-body
              class="text-center"
            >
              Edit Skill
            </h1>

            <b-alert
              :show="!!editSkillForm.errorMessage"
              variant="danger"
            >
              {{ editSkillForm.errorMessage }}
            </b-alert>

            <b-row class="my-1">
              <label
                class="skill"
                for="input-skill-name"
              >
                Skill Label
              </label>

              <b-col>
                <validation-provider
                  v-slot="validationContext"
                  :rules="{
                    required: true,
                    max: 50
                  }"
                >
                  <b-form-input
                    id="edit-input-skill-name"
                    v-model="editSkillForm.form.name"
                    :state="getValidationState(validationContext)"
                    aria-describedby="edit-input-skill-name-feedback"
                  />

                  <b-form-invalid-feedback id="edit-input-skill-name-feedback">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </validation-provider>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <label for="input-skill-description">
                Skill Description
              </label>

              <b-col>
                <validation-provider
                  v-slot="validationContext"
                  :rules="{ max: 200 }"
                >
                  <b-form-input
                    id="edit-input-skill-description"
                    v-model="editSkillForm.form.description"
                    :state="getValidationState(validationContext)"
                    aria-describedby="edit-input-skill-description-feedback"
                  />

                  <b-form-invalid-feedback id="edit-input-skill-description-feedback">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </validation-provider>
              </b-col>
            </b-row>

            <b-row
              class="mt-4"
              align-h="center"
            >
              <b-col cols="6">
                <b-button
                  class="w-100"
                  variant="success"
                  :disabled="invalid || isLoading"
                  @click="editSkill"
                >
                  Submit
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </validation-observer>
      </b-overlay>
    </b-modal>

    <b-modal
      v-model="deleteSkillForm.modal"
      hide-header
      :busy="isLoading"
      @ok="deleteSkill"
      @cancel="deleteSkillForm.modal = false"
    >
      <b-overlay :show="isLoading">
        <b-container fluid>
          <h4 style="font-family:'Bebas Neue', cursive; text-align:center;">
            Are you sure you want to delete the following skill?
          </h4>

          <br>

          <h5 style="font-family:'Bebas Neue', cursive; text-align:center;">
            {{ deleteSkillForm.skillToDelete.name }}
          </h5>
        </b-container>
      </b-overlay>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, max } from 'vee-validate/dist/rules'
import SkillRepository from '../../repositories/skills'
import { apiClient } from '../../axios'

const skillRepository = new SkillRepository(apiClient)

extend('required', {
  ...required,
  message: 'This field is required'
})
extend('max', {
  ...max,
  message: 'This field must be less than or equal to {length} characters'
})

export default {
  name: 'SkillList',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      skills: [],
      total: 0,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 20],
      fields: [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'description', label: 'Description' },
        { key: 'actions', label: 'Actions' }
      ],
      showModal: false,
      name: '',
      description: '',
      isLoading: false,
      errorMessage: '',
      skillFilter: '',
      editSkillForm: {
        errorMessage: '',
        modal: false,
        form: {
          _id: '',
          name: '',
          description: ''
        }
      },
      deleteSkillForm: {
        modal: false,
        skillToDelete: {}
      }
    }
  },
  computed: {
    ...mapGetters(['token']),
    pageOffset () {
      return (this.currentPage - 1) * this.perPage
    }
  },
  created () {
    skillRepository.setAuthorizationHeader(`Bearer ${this.token}`)
  },
  methods: {
    getValidationState ({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    async getSkills (ctx) {
      const {
        filter,
        sortBy,
        sortDesc
      } = ctx

      const limit = this.perPage
      const offset = this.pageOffset

      const sort = {}

      if (sortBy !== undefined && sortBy !== '') {
        sort.field = sortBy
        sort.order = sortDesc ? 'desc' : 'asc'
      }

      const { results, total } = await skillRepository.list({
        name: filter
      }, {
        limit,
        offset,
        sort
      })

      this.total = total

      return results
    },
    async addSkill () {
      this.errorMessage = ''

      this.isLoading = true

      try {
        await skillRepository.create({
          name: this.name,
          description: this.description
        })

        this.$router.go()
      } catch (error) {
        this.isLoading = false

        if (error.response?.data?.code === 'SkillAlreadyExists') {
          this.errorMessage = 'This skill already exists!'
        }
      }
    },
    async editSkill () {
      this.editSkillForm.errorMessage = ''
      this.isLoading = true

      const {
        _id,
        name,
        description
      } = this.editSkillForm.form

      try {
        await skillRepository.update(_id, {
          name,
          description
        })

        this.$router.go()
      } catch (error) {
        this.isLoading = false

        if (error.response?.data) {
          const { code, message } = error.response.data

          if (code === 'Conflict' && message.includes('Duplicate Skill:')) {
            this.editSkillForm.errorMessage = 'This skill already exists!'
          }
        }
      }
    },
    async deleteSkill () {
      this.isLoading = true

      const skillId = this.deleteSkillForm.skillToDelete._id

      try {
        await skillRepository.delete(skillId)

        this.$router.go()
      } catch (error) {
        this.isLoading = false
      }
    },
    showEditSkill (skill) {
      this.editSkillForm.modal = true

      this.editSkillForm.form = {
        _id: skill._id,
        name: skill.name,
        description: skill.description
      }
    },
    showConfirmDeleteSkill (skill) {
      this.deleteSkillForm.modal = true

      this.deleteSkillForm.skillToDelete = {
        _id: skill._id,
        name: skill.name
      }
    }
  }
}
</script>
