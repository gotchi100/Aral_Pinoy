<template>
  <div>
    <b-container>
      <b-row class="py-4">
        <b-col cols="12">
          <b-card
            bg-variant="light"
            style="border-radius: 20px;"
          >
            <h3 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">
              Triggers
            </h3>

            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <b-list-group style="text-align: left">
                    <b-list-group-item class="mb-4 flex-column align-items-start">
                      <div class="d-flex w-100 justify-content-between">
                        <div>
                          <h5 class="mb-1">
                            Check for Insufficient Event Volunteers
                          </h5>

                          <p class="mb-1">
                            The system will check for events will less than 20% volunteers
                          </p>
                        </div>

                        <button
                          :class="
                            !!triggers.insufficientEventVolunteersCheck.message ? 'btn btn-outline-danger' : 'btn btn-danger'
                          "
                          type="button"
                          :disabled="triggers.insufficientEventVolunteersCheck.loading || !!triggers.insufficientEventVolunteersCheck.message"
                          @click="triggerInsufficientEventVolunteersCheck"
                        >
                          <b-spinner
                            v-if="triggers.insufficientEventVolunteersCheck.loading"
                            style="width: 1rem; height: 1rem;"
                          />

                          <span v-else-if="!!triggers.insufficientEventVolunteersCheck.message">
                            {{ triggers.insufficientEventVolunteersCheck.message }}
                          </span>

                          <span v-else>
                            Check now
                          </span>
                        </button>
                      </div>
                    </b-list-group-item>
                  </b-list-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <b-list-group style="text-align: left">
                    <b-list-group-item class="mb-4 flex-column align-items-start">
                      <div class="d-flex w-100 justify-content-between">
                        <div>
                          <h5 class="mb-1">
                            Check for Expiring Inventory Items
                          </h5>

                          <p class="mb-1">
                            The system will check for inventory items that will expire in 1 month
                          </p>
                        </div>

                        <button
                          :class="
                            !!triggers.expiringInventoryItems.message ? 'btn btn-outline-danger' : 'btn btn-danger'
                          "
                          type="button"
                          :disabled="triggers.expiringInventoryItems.loading || !!triggers.expiringInventoryItems.message"
                          @click="triggerExpiringInventoryItemsCheck"
                        >
                          <b-spinner
                            v-if="triggers.expiringInventoryItems.loading"
                            style="width: 1rem; height: 1rem;"
                          />

                          <span v-else-if="!!triggers.expiringInventoryItems.message">
                            {{ triggers.expiringInventoryItems.message }}
                          </span>

                          <span v-else>
                            Check now
                          </span>
                        </button>
                      </div>
                    </b-list-group-item>
                  </b-list-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <b-list-group style="text-align: left">
                    <b-list-group-item class="mb-4 flex-column align-items-start">
                      <div class="d-flex w-100 justify-content-between">
                        <div>
                          <h5 class="mb-1">
                            Delete Expired Inventory Items
                          </h5>

                          <p class="mb-1">
                            The system will delete inventory items that are expired
                          </p>
                        </div>

                        <button
                          :class="
                            !!triggers.expiredInventoryItemsDeletion.message ? 'btn btn-outline-danger' : 'btn btn-danger'
                          "
                          type="button"
                          :disabled="triggers.expiredInventoryItemsDeletion.loading || !!triggers.expiredInventoryItemsDeletion.message"
                          @click="triggerExpiredInventoryItemsDeletion"
                        >
                          <b-spinner
                            v-if="triggers.expiredInventoryItemsDeletion.loading"
                            style="width: 1rem; height: 1rem;"
                          />

                          <span v-else-if="!!triggers.expiredInventoryItemsDeletion.message">
                            {{ triggers.expiredInventoryItemsDeletion.message }}
                          </span>

                          <span v-else>
                            Check now
                          </span>
                        </button>
                      </div>
                    </b-list-group-item>
                  </b-list-group>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { apiClient } from '../../axios'
import CronRepository from '../../repositories/cron'

const logo = require('../../assets/aralpinoywords.png')

const cronRepository = new CronRepository(apiClient)

export default {
  name: 'DemoCronJob',
  data () {
    return {
      logo,
      triggers: {
        insufficientEventVolunteersCheck: {
          loading: false,
          message: ''
        },
        expiringInventoryItems: {
          loading: false,
          message: ''
        },
        expiredInventoryItemsDeletion: {
          loading: false,
          message: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  created () {
    const authHeader = `Bearer ${this.token}`

    cronRepository.setAuthorizationHeader(authHeader)
  },
  methods: {
    async triggerInsufficientEventVolunteersCheck () {
      this.triggers.insufficientEventVolunteersCheck.loading = true

      try {
        await cronRepository.triggerInsufficientEventVolunteersCheck()

        this.triggers.insufficientEventVolunteersCheck.message = 'System is now checking for insufficient event volunteers'
      } catch {
        this.triggers.insufficientEventVolunteersCheck.message = 'Unable to trigger the check.'
      } finally {
        this.triggers.insufficientEventVolunteersCheck.loading = false
      }
    },
    async triggerExpiringInventoryItemsCheck () {
      this.triggers.expiringInventoryItems.loading = true

      try {
        await cronRepository.triggerExpiringInventoryItemsCheck()

        this.triggers.expiringInventoryItems.message = 'System is now checking for expiring inventory items'
      } catch {
        this.triggers.expiringInventoryItems.message = 'Unable to trigger the check.'
      } finally {
        this.triggers.expiringInventoryItems.loading = false
      }
    },
    async triggerExpiredInventoryItemsDeletion () {
      this.triggers.expiredInventoryItemsDeletion.loading = true

      try {
        await cronRepository.triggerExpiredInventoryItemsDeletion()

        this.triggers.expiredInventoryItemsDeletion.message = 'System is now deleting expired inventory items'
      } catch {
        this.triggers.expiredInventoryItemsDeletion.message = 'Unable to trigger the check.'
      } finally {
        this.triggers.expiredInventoryItemsDeletion.loading = false
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
</style>
