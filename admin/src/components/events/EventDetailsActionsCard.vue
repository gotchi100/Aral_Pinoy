<template>
  <div>
    <b-card style="border-radius: 20px;">
      <h1
        class="text-start"
        style="font-family:'Bebas Neue', cursive;"
      >
        Actions
      </h1>

      <b-row>
        <b-col cols="12">
          <b-list-group style="text-align: left">
            <b-list-group-item class="mb-4 flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <div>
                  <h5 class="mb-1">
                    Invite volunteers
                  </h5>

                  <p class="mb-1">
                    Volunteers are invited to the event for them to participate.
                  </p>
                </div>

                <button
                  class="btn btn-danger"
                  type="button"
                  @click="showVolunteerInvitationModal"
                >
                  Invite
                </button>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-card>

    <b-modal
      v-model="volunteerInvitation.modal"
      size="xl"
      title="Invite Volunteers"
      hide-footer
    >
      <b-container v-if="event !== null">
        <b-alert
          :show="!!volunteerInvitation.message"
          variant="primary"
        >
          {{ volunteerInvitation.message }}
        </b-alert>

        <b-row class="mb-3">
          <b-col cols="12">
            <b-card
              class="mb-3"
              header="Recommendation"
            >
              <b-list-group>
                <b-list-group-item
                  v-for="volunteer in volunteerInvitation.recommendedVolunteers"
                  :key="volunteer._id"
                  class="d-flex justify-content-between align-items-center"
                >
                  <div>
                    {{ volunteer.lastName }}, {{ volunteer.firstName }} <span style="color: grey; font-size: 12px">{{ volunteer.email }}</span>
                  </div>

                  <b-button
                    variant="success"
                    @click="selectUserForInvitation(volunteer)"
                  >
                    <b-icon icon="plus" />
                  </b-button>
                </b-list-group-item>
              </b-list-group>
            </b-card>

            <b-card header="Invitation List">
              <b-list-group class="mb-3">
                <b-list-group-item
                  v-for="(user, index) in volunteerInvitation.userInvitations"
                  :key="user._id"
                  class="d-flex justify-content-between align-items-center"
                >
                  <div>
                    {{ user.lastName }}, {{ user.firstName }} <span style="color: grey; font-size: 12px">{{ user.email }}</span>
                  </div>

                  <b-button
                    variant="danger"
                    @click="removeUserFromInvitation(index)"
                  >
                    <b-icon icon="trash" />
                  </b-button>
                </b-list-group-item>
              </b-list-group>

              <b-dropdown
                text="Add a Volunteer"
                style="width: 100%"
                menu-class="w-100"
                variant="primary"
                no-flip
              >
                <b-dropdown-form>
                  <b-form-group
                    label="Search Volunteer"
                    label-for="user-invitation-search-input"
                    @submit.stop.prevent
                  >
                    <b-form-input
                      id="user-invitation-search-input"
                      debounce="250"
                      @update="searchUsersForInvitation"
                    />
                  </b-form-group>
                </b-dropdown-form>

                <b-dropdown-divider />

                <b-dropdown-item
                  v-for="user in userOptions"
                  :key="user._id"
                  @click="selectUserForInvitation(user)"
                >
                  {{ user.lastName }}, {{ user.firstName }} <span style="color: grey; font-size: 12px">{{ user.email }}</span>
                </b-dropdown-item>
              </b-dropdown>
            </b-card>
          </b-col>
        </b-row>

        <b-row
          align-h="end"
          align-v="center"
        >
          <b-col cols="2">
            <button
              class="btn btn-success"
              :disabled="volunteerInvitation.userInvitations.length === 0"
              @click="inviteVolunteers"
            >
              <b-spinner
                v-if="volunteerInvitation.isInviting"
                style="width: 1rem; height: 1rem;"
              />

              <template v-else>
                Submit
              </template>
            </button>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { apiClient } from '../../axios'
import EventRepository from '../../repositories/events'
import UserRepository from '../../repositories/users'

const eventRepository = new EventRepository(apiClient)
const userRepository = new UserRepository(apiClient)

export default {
  name: 'EventDetailsActionsCard',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      volunteerInvitation: {
        modal: false,
        message: '',
        isInviting: false,
        recommendedVolunteers: [],
        userInvitations: []
      },
      userOptions: []
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  async created () {
    const authHeader = `Bearer ${this.token}`

    eventRepository.setAuthorizationHeader(authHeader)
    userRepository.setAuthorizationHeader(authHeader)

    await this.getRecommendedVolunteers()
  },
  methods: {
    async getRecommendedVolunteers () {
      const eventId = this.event._id

      const volunteers = await eventRepository.getRecommendedVolunteers(eventId)

      this.volunteerInvitation.recommendedVolunteers = volunteers
    },
    showVolunteerInvitationModal () {
      this.volunteerInvitation.modal = true
    },
    async searchUsersForInvitation (value) {
      const { results } = await userRepository.list({
        name: value,
        roles: ['volunteer']
      }, {
        limit: 10,
        offset: 0
      })

      this.userOptions = results
    },
    selectUserForInvitation (volunteer) {
      const existingVolunteerIndex = this.volunteerInvitation.userInvitations.findIndex((item) => item._id === volunteer._id)

      if (existingVolunteerIndex === -1) {
        this.volunteerInvitation.userInvitations.push(volunteer)
      }
    },
    removeUserFromInvitation (index) {
      this.volunteerInvitation.userInvitations.splice(index, 1)
    },
    async inviteVolunteers () {
      this.volunteerInvitation.isInviting = true
      this.volunteerInvitation.message = ''

      const eventId = this.event._id
      const userIds = this.volunteerInvitation.userInvitations.map((user) => user._id)

      try {
        await eventRepository.inviteVolunteers(eventId, userIds)

        this.volunteerInvitation.message = 'Volunteers have been invited!'
      } catch (error) {
        // TODO: Add error handling
      } finally {
        this.volunteerInvitation.isInviting = false
      }
    }
  }
}
</script>
