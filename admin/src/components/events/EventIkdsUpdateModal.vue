<template>
  <b-modal
    v-model="modal"
    size="xl"
    title="Edit Event Items"
    hide-footer
    @hide="$emit('close')"
  >
    <b-container>
      <b-row>
        <b-col cols="12">
          <b-container fluid>
            <b-alert
              :show="!!errorMessage"
              variant="danger"
            >
              {{ errorMessage }}
            </b-alert>

            <b-row class="py-3">
              <b-col cols="12">
                <b-row>
                  <b-col cols="12">
                    <b-table
                      :items="eventIkds"
                      :fields="eventIkdFields"
                      show-empty
                      responsive
                      striped
                      primary-key="name"
                    >
                      <template #cell(action)="{ index }">
                        <b-button
                          variant="danger"
                          @click="removeEventIkd(index)"
                        >
                          <b-icon icon="trash" />
                        </b-button>
                      </template>
                    </b-table>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col cols="12">
                    <b-button
                      class="w-100 mb-3"
                      :disabled="showIkdForm"
                      @click="showIkdForm = true"
                    >
                      Add Item
                    </b-button>

                    <b-collapse v-model="showIkdForm">
                      <b-card>
                        <b-container>
                          <b-row
                            align-h="center"
                            align-v="center"
                          >
                            <b-col
                              class="pt-2"
                              cols="12"
                            >
                              <b-dropdown
                                :text="ikdForm.item.sku !== '' ? `${ikdForm.item.name}` : 'Search Item'"
                                style="width: 100%"
                                menu-class="w-100"
                                variant="primary"
                              >
                                <b-dropdown-form>
                                  <b-form-group
                                    label="Search Item"
                                    label-for="item-search"
                                    @submit.stop.prevent
                                  >
                                    <b-form-input
                                      id="item-search"
                                      debounce="500"
                                      @update="searchIkds"
                                    />
                                  </b-form-group>
                                </b-dropdown-form>

                                <b-dropdown-divider />

                                <b-dropdown-item
                                  v-for="item in ikdOptions"
                                  :key="item._id"
                                  @click="selectIkd(item)"
                                >
                                  {{ item.quantity }} - {{ item.name }} <span style="color: grey; font-size: 12px">{{ item.sku }}</span>
                                </b-dropdown-item>
                              </b-dropdown>
                            </b-col>

                            <b-col
                              class="pt-2"
                              cols="12"
                            >
                              <b-form-group
                                label="Quantity Needed"
                                style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;"
                              >
                                <b-form-input
                                  v-model="ikdForm.quantity"
                                  type="number"
                                  step="1"
                                  lazy-formatter
                                  :formatter="toPositiveNumber"
                                  required
                                />
                              </b-form-group>
                            </b-col>

                            <b-col
                              cols="12"
                              md="6"
                            >
                              <b-button
                                class="w-100 mt-3"
                                @click="showIkdForm = false"
                              >
                                Cancel
                              </b-button>
                            </b-col>

                            <b-col
                              cols="12"
                              md="6"
                            >
                              <b-button
                                class="w-100 mt-3"
                                variant="success"
                                :disabled="ikdForm.item.sku === ''"
                                @click="addEventIkd"
                              >
                                Submit
                              </b-button>
                            </b-col>
                          </b-row>
                        </b-container>
                      </b-card>
                    </b-collapse>
                  </b-col>
                </b-row>

                <b-row
                  class="pt-3"
                  align-h="end"
                >
                  <b-col cols="1">
                    <b-button
                      variant="outline-secondary"
                      @click="resetIkds"
                    >
                      Reset
                    </b-button>
                  </b-col>

                  <b-col cols="1">
                    <b-button
                      variant="outline-success"
                      @click="updateEventIkds"
                    >
                      <b-spinner
                        v-if="isLoading"
                        style="width: 1rem; height: 1rem;"
                      />
                      <template v-else>
                        <b-icon icon="file-earmark-check-fill" />
                      </template>
                    </b-button>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'

import formattersMixins from '../../mixins/formatters'

import EventRepository from '../../repositories/events'
import InkindDonationRepository from '../../repositories/inkind-donations'
import { apiClient } from '../../axios'

const eventRepository = new EventRepository(apiClient)
const inkindDonationRepository = new InkindDonationRepository(apiClient)

const ERROR_MAP = {
  400: true,
  404: {
    event: 'Event does not exist!'
  },
  409: {
    non_upcoming_event: 'Canceled or ended events cannot be updated',
    version_conflict: 'Event was recently updated. Please try again'
  }
}

export default {
  name: 'EventIkdsUpdateModal',
  mixins: [formattersMixins],
  props: {
    show: {
      type: Boolean,
      required: true
    },
    eventId: {
      type: String,
      required: true
    },
    currentEventIkds: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      modal: false,
      showIkdForm: false,
      eventIkds: [],
      ikdForm: {
        item: {
          sku: '',
          name: ''
        },
        quantity: 1
      },
      isLoading: false,
      errorMessage: '',
      eventIkdFields: [
        { key: 'item.name', label: 'Item' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'action', label: 'Action' }
      ],
      ikdOptions: []
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {
    show (val) {
      this.modal = val
    },
    currentEventIkds (val) {
      if (val !== undefined) {
        this.eventIkds = cloneDeep(val)
      }
    }
  },
  created () {
    const authHeader = `Bearer ${this.token}`

    eventRepository.setAuthorizationHeader(authHeader)
    inkindDonationRepository.setAuthorizationHeader(authHeader)

    this.eventIkds = cloneDeep(this.currentEventIkds)
  },
  methods: {
    async updateEventIkds () {
      this.isLoading = true
      this.errorMessage = ''

      const ikds = []
      const ikdItems = []

      for (const { item, quantity } of this.eventIkds) {
        ikds.push({
          item,
          quantity
        })
        ikdItems.push({
          sku: item.sku,
          quantity
        })
      }

      try {
        await eventRepository.update(this.eventId, {
          ikdItems
        })

        this.$emit('update', {
          ikds
        })

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
        this.isLoading = false
      }
    },
    resetIkds () {
      this.errorMessage = ''

      this.eventIkds = cloneDeep(this.currentEventIkds)
    },
    async searchIkds (value) {
      this.ikdForm.item = {
        name: '',
        sku: ''
      }
      this.ikdForm.quantity = 1

      const { results } = await inkindDonationRepository.list({
        query: value
      }, {
        limit: 10
      })

      this.ikdOptions = results.filter((item) => item.quantity > 0)
    },
    selectIkd (ikd) {
      this.ikdForm.item = {
        name: ikd.name,
        sku: ikd.sku
      }
    },
    addEventIkd () {
      const {
        item,
        quantity
      } = this.ikdForm

      const existingIkdIndex = this.eventIkds.findIndex((ikd) => ikd.item.sku === item.sku)

      if (existingIkdIndex !== -1) {
        return
      }

      this.eventIkds.push({
        item,
        quantity
      })

      this.showIkdForm = false

      this.ikdForm = {
        item: {
          sku: '',
          name: ''
        },
        quantity: 1
      }
    },
    removeEventIkd (index) {
      const ikd = this.eventIkds[index]

      if (ikd === undefined) {
        return
      }

      this.eventIkds.splice(index, 1)
    }
  }
}
</script>
