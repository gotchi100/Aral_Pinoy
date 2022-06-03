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
              User Profile
            </h3>

            <b-container fluid>
              <b-alert
                :show="!!errorMessage"
                variant="danger"
              >
                {{ errorMessage }}
              </b-alert>

              <b-row>
                <b-col cols="12">
                  <validation-observer v-slot="{ invalid, changed, reset }">
                    <validation-provider
                      v-slot="validationContext"
                      :rules="{
                        required: true,
                        email: true,
                      }"
                    >
                      <label
                        for="update-profile-email"
                        style="font-family:'Bebas Neue', cursive;"
                      >
                        Email Address
                      </label>

                      <div class="input-group mb-3">
                        <b-form-input
                          id="update-profile-email"
                          v-model="profile.email"
                          type="text"
                          class="form-control"
                          :state="getValidationState(validationContext)"
                          aria-describedby="update-profile-email-feedback"
                          :disabled="loading.email"
                        />

                        <button
                          class="btn btn-outline-success"
                          type="button"
                          :disabled="invalid || !changed || loading.email"
                          @click="updateProfile({ email: profile.email }, 'email', reset)"
                        >
                          <b-spinner
                            v-if="loading.email"
                            style="width: 1rem; height: 1rem;"
                          />
                          <template v-else>
                            <b-icon icon="file-earmark-check-fill" />
                          </template>
                        </button>

                        <b-form-invalid-feedback id="update-profile-email-feedback">
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </div>
                    </validation-provider>
                  </validation-observer>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <validation-observer v-slot="{ invalid, changed, reset }">
                    <validation-provider
                      v-slot="validationContext"
                      :rules="{
                        required: true,
                        max: 100,
                        regex: regexRules.filipinoCharacters
                      }"
                    >
                      <label
                        for="update-profile-firstName"
                        style="font-family:'Bebas Neue', cursive;"
                      >
                        First Name
                      </label>

                      <div class="input-group mb-3">
                        <b-form-input
                          id="update-profile-firstName"
                          v-model="profile.firstName"
                          type="text"
                          class="form-control"
                          :state="getValidationState(validationContext)"
                          aria-describedby="update-profile-firstName-feedback"
                          :disabled="loading.firstName"
                        />

                        <button
                          class="btn btn-outline-success"
                          type="button"
                          :disabled="invalid || !changed || loading.firstName"
                          @click="updateProfile({ firstName: profile.firstName }, 'firstName', reset)"
                        >
                          <b-spinner
                            v-if="loading.firstName"
                            style="width: 1rem; height: 1rem;"
                          />
                          <template v-else>
                            <b-icon icon="file-earmark-check-fill" />
                          </template>
                        </button>

                        <b-form-invalid-feedback id="update-profile-firstName-feedback">
                          {{
                            validationContext.failedRules.regex !== undefined
                              ? 'This field does not have a valid format'
                              : validationContext.errors[0]
                          }}
                        </b-form-invalid-feedback>
                      </div>
                    </validation-provider>
                  </validation-observer>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <validation-observer v-slot="{ invalid, changed, reset }">
                    <validation-provider
                      v-slot="validationContext"
                      :rules="{
                        required: true,
                        max: 100,
                        regex: regexRules.filipinoCharacters
                      }"
                    >
                      <label
                        for="update-profile-lastName"
                        style="font-family:'Bebas Neue', cursive;"
                      >
                        Last Name
                      </label>

                      <div class="input-group mb-3">
                        <b-form-input
                          id="update-profile-lastName"
                          v-model="profile.lastName"
                          type="text"
                          class="form-control"
                          :state="getValidationState(validationContext)"
                          aria-describedby="update-profile-lastName-feedback"
                          :disabled="loading.lastName"
                        />

                        <button
                          class="btn btn-outline-success"
                          type="button"
                          :disabled="invalid || !changed || loading.lastName"
                          @click="updateProfile({ lastName: profile.lastName }, 'lastName', reset)"
                        >
                          <b-spinner
                            v-if="loading.lastName"
                            style="width: 1rem; height: 1rem;"
                          />
                          <template v-else>
                            <b-icon icon="file-earmark-check-fill" />
                          </template>
                        </button>

                        <b-form-invalid-feedback id="update-profile-lastName-feedback">
                          {{
                            validationContext.failedRules.regex !== undefined
                              ? 'This field does not have a valid format'
                              : validationContext.errors[0]
                          }}
                        </b-form-invalid-feedback>
                      </div>
                    </validation-provider>
                  </validation-observer>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <validation-observer v-slot="{ changed, reset }">
                    <validation-provider
                      v-slot="validationContext"
                    >
                      <label
                        for="update-profile-gender"
                        style="font-family:'Bebas Neue', cursive;"
                      >
                        Gender
                      </label>

                      <div class="input-group mb-3">
                        <b-form-select
                          id="update-profile-gender"
                          v-model="profile.gender"
                          class="form-control"
                          :state="getValidationState(validationContext)"
                          aria-describedby="update-profile-gender-feedback"
                          :disabled="loading.gender"
                          :options="genderOptions"
                        />

                        <button
                          class="btn btn-outline-success"
                          type="button"
                          :disabled="!changed || loading.gender"
                          @click="updateProfile({ gender: profile.gender }, 'gender', reset)"
                        >
                          <b-spinner
                            v-if="loading.gender"
                            style="width: 1rem; height: 1rem;"
                          />
                          <template v-else>
                            <b-icon icon="file-earmark-check-fill" />
                          </template>
                        </button>

                        <b-form-invalid-feedback id="update-profile-gender-feedback">
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </div>
                    </validation-provider>
                  </validation-observer>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <validation-observer v-slot="{ changed, reset }">
                    <validation-provider
                      v-slot="validationContext"
                    >
                      <label
                        for="update-profile-birthDate"
                        style="font-family:'Bebas Neue', cursive;"
                      >
                        Date of Birth
                      </label>

                      <div class="input-group mb-3">
                        <b-form-datepicker
                          id="update-profile-birthDate"
                          v-model="profile.birthDate"
                          class="form-control"
                          :state="getValidationState(validationContext)"
                          :max="new Date(Date.now() - 567648000000)"
                          :disabled="loading.birthDate"
                          :date-format-options="{ month: 'long', day: 'numeric', year: 'numeric' }"
                          value-as-date
                        />

                        <button
                          class="btn btn-outline-success"
                          type="button"
                          :disabled="!changed || loading.birthDate"
                          @click="updateProfile({ birthDate: profile.birthDate }, 'birthDate', reset)"
                        >
                          <b-spinner
                            v-if="loading.birthDate"
                            style="width: 1rem; height: 1rem;"
                          />
                          <template v-else>
                            <b-icon icon="file-earmark-check-fill" />
                          </template>
                        </button>
                      </div>
                    </validation-provider>
                  </validation-observer>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <validation-observer v-slot="{ invalid, changed, reset }">
                    <validation-provider
                      v-slot="validationContext"
                      :rules="{
                        regex: regexRules.phContactNumber
                      }"
                    >
                      <label
                        for="update-profile-contactNumber"
                        style="font-family:'Bebas Neue', cursive;"
                      >
                        Contact Number
                      </label>

                      <div class="input-group mb-3">
                        <b-form-input
                          id="update-profile-contactNumber"
                          v-model="profile.contactNumber"
                          type="text"
                          class="form-control"
                          :state="getValidationState(validationContext)"
                          aria-describedby="update-profile-contactNumber-feedback"
                          :disabled="loading.contactNumber"
                        />

                        <button
                          class="btn btn-outline-success"
                          type="button"
                          :disabled="invalid || !changed || loading.contactNumber"
                          @click="updateProfile({ contactNumber: profile.contactNumber }, 'contactNumber', reset)"
                        >
                          <b-spinner
                            v-if="loading.contactNumber"
                            style="width: 1rem; height: 1rem;"
                          />
                          <template v-else>
                            <b-icon icon="file-earmark-check-fill" />
                          </template>
                        </button>

                        <b-form-invalid-feedback id="update-profile-contactNumber-feedback">
                          This field must be a valid Philippine mobile number
                        </b-form-invalid-feedback>
                      </div>
                    </validation-provider>
                  </validation-observer>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <label
                    for="update-profile-location-country"
                    style="font-family:'Bebas Neue', cursive;"
                  >
                    Country
                  </label>

                  <div class="input-group mb-3">
                    <b-form-input
                      id="update-profile-location-country"
                      v-model="profile.location.country"
                      type="text"
                      class="form-control"
                      disabled
                    />
                  </div>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <validation-observer v-slot="{ changed, reset }">
                    <label
                      style="font-family:'Bebas Neue', cursive;"
                    >
                      Province & City
                    </label>

                    <div class="input-group mb-3">
                      <div class="form-control">
                        <select
                          id="update-profile-location-province"
                          v-model="profile.location.province"
                          class="form-select"
                          :disabled="loading.location"
                        >
                          <option
                            v-for="province in philippineProvinces"
                            :key="province"
                            :value="province"
                          >
                            {{ province }}
                          </option>
                        </select>
                      </div>

                      <validation-provider
                        v-slot="validationContext"
                        class="form-control"
                        :rules="{
                          required: true
                        }"
                      >
                        <select
                          id="update-profile-location-city"
                          v-model="profile.location.city"
                          class="form-select"
                          :state="getValidationState(validationContext)"
                          :disabled="!profile.location.province || loading.location"
                        >
                          <option
                            v-for="city in cityOptions"
                            :key="city"
                            :value="city"
                          >
                            {{ city }}
                          </option>
                        </select>
                      </validation-provider>

                      <button
                        class="btn btn-outline-success"
                        type="button"
                        :disabled="!profile.location.city || !changed || loading.location"
                        @click="updateProfile({ location: { province: profile.location.province, city: profile.location.city } }, 'location', reset)"
                      >
                        <b-spinner
                          v-if="loading.location"
                          style="width: 1rem; height: 1rem;"
                        />
                        <template v-else>
                          <b-icon icon="file-earmark-check-fill" />
                        </template>
                      </button>
                    </div>
                  </validation-observer>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <label
                    for="update-profile-skills"
                    style="font-family:'Bebas Neue', cursive;"
                  >
                    Skills
                  </label>

                  <div class="input-group mb-3">
                    <b-form-tags>
                      <template>
                        <ul
                          v-if="profile.skills.length > 0"
                          class="list-inline d-inline-block mb-2"
                        >
                          <li
                            v-for="(skill, index) in profile.skills"
                            :key="index"
                            class="list-inline-item"
                          >
                            <b-form-tag
                              class="bg-success"
                              @remove="removeSkill(index)"
                            >
                              {{ skill.name }}
                            </b-form-tag>
                          </li>
                        </ul>
                      </template>

                      <b-dropdown
                        text="Add Skill"
                        style="width: 100%"
                        menu-class="w-100"
                        :disabled="loading.skills"
                        variant="primary"
                      >
                        <template
                          v-if="loading.skills"
                          #button-content
                        >
                          <b-spinner
                            style="width: 1rem; height: 1rem;"
                          />
                        </template>

                        <template v-else>
                          <b-dropdown-form>
                            <b-form-group
                              label="Search Skill"
                              label-for="skill-search"
                              @submit.stop.prevent
                            >
                              <b-form-input
                                id="skill-search"
                                debounce="500"
                                @update="searchSkills"
                              />
                            </b-form-group>
                          </b-dropdown-form>
                          <b-dropdown-divider />

                          <b-dropdown-item
                            v-for="skill in skillOptions"
                            :key="skill._id"
                            @click="selectSkill(skill)"
                          >
                            {{ skill.name }} <span style="color: grey; font-size: 12px">{{ skill.description }}</span>
                          </b-dropdown-item>
                        </template>
                      </b-dropdown>
                    </b-form-tags>
                  </div>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>

      <b-row class="pb-4">
        <b-col cols="12">
          <b-card style="border-radius: 20px;">
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Events Attended
                  </h1>
                </b-col>
              </b-row>

              <b-row class="pb-4">
                <b-col cols="4">
                  <b-form-group
                    style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                    label="Per page"
                    label-for="per-page-select"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                  >
                    <b-form-select
                      v-model="eventVolunteers.pagination.perPage"
                      :options="pageOptions"
                      style="width: 25%"
                    />
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <b-table
                    :items="getEventVolunteers"
                    :fields="eventVolunteers.fields"
                    :current-page="eventVolunteers.pagination.currentPage"
                    :per-page="eventVolunteers.pagination.perPage"
                    show-empty
                    small
                    stacked="md"
                    style="background:white"
                  >
                    <template #cell(event)="{ item }">
                      <b-link :to="`/events/${item.event._id}`">
                        {{ item.event.name }}
                      </b-link>
                    </template>

                    <template #cell(startDate)="{ item }">
                      <span>
                        {{
                          new Date(item.event.date.start).toLocaleString('en-us', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                          })
                        }}
                      </span>
                    </template>

                    <template #cell(status)="{ item }">
                      <span>
                        {{ item.event.status }}
                      </span>
                    </template>

                    <template #cell(action)="{ item }">
                      <b-link
                        v-if="item.event.status === 'ENDED' && item.eventEvaluation === undefined && item.absent !== true"
                        :to="`/events/${item.event._id}/evaluation`"
                      >
                        Evaluation
                      </b-link>

                      <b-link
                        v-else-if="item.event.status !== 'ENDED' && item.event.status !== 'CANCELED'"
                        :to="`/events/${item.event._id}`"
                      >
                        Unjoin
                      </b-link>
                    </template>
                  </b-table>
                </b-col>
              </b-row>

              <b-row class="justify-content-md-center">
                <b-col
                  cols="6"
                  class="my-1"
                >
                  <b-pagination
                    v-model="eventVolunteers.pagination.currentPage"
                    :total-rows="eventVolunteers.total"
                    :per-page="eventVolunteers.pagination.perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                  />
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>

      <b-row class="pb-4">
        <b-col cols="12">
          <b-card
            style="border-radius: 20px;"
          >
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Event Donation History
                  </h1>
                </b-col>
              </b-row>

              <b-row class="pb-4">
                <b-col cols="4">
                  <b-form-group
                    style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                    label="Per page"
                    label-for="per-page-select"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                  >
                    <b-form-select
                      v-model="eventDonations.pagination.perPage"
                      :options="pageOptions"
                      style="width: 25%"
                    />
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <b-table
                    :items="getEventDonations"
                    :fields="eventDonations.fields"
                    :current-page="eventDonations.pagination.currentPage"
                    :per-page="eventDonations.pagination.perPage"
                    show-empty
                    small
                    stacked="md"
                    style="background:white"
                  >
                    <template #cell(createdAt)="{ value }">
                      <span v-if="value !== undefined && value !== ''">
                        {{
                          new Date(value).toLocaleString('en-us', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                          })
                        }}
                      </span>
                    </template>

                    <template #cell(amount)="{ value }">
                      <span>
                        {{
                          new Intl.NumberFormat('en-us', {
                            style: 'currency',
                            currency: 'PHP'
                          }).format(value)
                        }}
                      </span>
                    </template>

                    <template #cell(event)="{ item }">
                      <b-link :to="`/events/${item.event._id}`">
                        {{ item.event.name }}
                      </b-link>
                    </template>

                    <template #cell(status)="{ value }">
                      <span>
                        {{ value.toUpperCase() }}
                      </span>
                    </template>
                  </b-table>
                </b-col>
              </b-row>

              <b-row class="justify-content-md-center">
                <b-col
                  cols="6"
                  class="my-1"
                >
                  <b-pagination
                    v-model="eventDonations.pagination.currentPage"
                    :total-rows="eventDonations.total"
                    :per-page="eventDonations.pagination.perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                  />
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>

      <b-row class="pb-4">
        <b-col cols="12">
          <b-card
            style="border-radius: 20px;"
          >
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Aral Pinoy Donation History
                  </h1>
                </b-col>
              </b-row>

              <b-row class="pb-4">
                <b-col cols="4">
                  <b-form-group
                    style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                    label="Per page"
                    label-for="per-page-select"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                  >
                    <b-form-select
                      v-model="monetaryDonations.pagination.perPage"
                      :options="pageOptions"
                      style="width: 25%"
                    />
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <b-table
                    :items="getMonetaryDonations"
                    :fields="monetaryDonations.fields"
                    :current-page="monetaryDonations.pagination.currentPage"
                    :per-page="monetaryDonations.pagination.perPage"
                    show-empty
                    small
                    stacked="md"
                    style="background:white"
                  >
                    <template #cell(createdAt)="{ value }">
                      <span v-if="value !== undefined && value !== ''">
                        {{
                          new Date(value).toLocaleString('en-us', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                          })
                        }}
                      </span>
                    </template>

                    <template #cell(contact)="{ item }">
                      <span style="font-size: 14px">
                        {{
                          getContactFromMonetaryDonationMetadata(item.metadata)
                        }}
                      </span>
                    </template>

                    <template #cell(amount)="{ value }">
                      <span>
                        {{
                          new Intl.NumberFormat('en-us', {
                            style: 'currency',
                            currency: 'PHP'
                          }).format(value)
                        }}
                      </span>
                    </template>

                    <template #cell(status)="{ value }">
                      <span>
                        {{ value.toUpperCase() }}
                      </span>
                    </template>
                  </b-table>
                </b-col>
              </b-row>

              <b-row class="justify-content-md-center">
                <b-col
                  cols="6"
                  class="my-1"
                >
                  <b-pagination
                    v-model="monetaryDonations.pagination.currentPage"
                    :total-rows="monetaryDonations.total"
                    :per-page="monetaryDonations.pagination.perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                  />
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>

      <b-row class="pb-4">
        <b-col cols="12">
          <b-card
            bg-variant="light"
            style="border-radius: 20px;"
          >
            <h3 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">
              Settings
            </h3>

            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <b-list-group style="text-align: left">
                    <b-list-group-item class="mb-4 flex-column align-items-start">
                      <div class="d-flex w-100 justify-content-between">
                        <div>
                          <h5 class="mb-1">
                            Change your password
                          </h5>

                          <p class="mb-1">
                            Request for a password reset to change your password.
                          </p>
                        </div>

                        <button
                          :class="
                            !!resetPasswordMsg ? 'btn btn-outline-danger' : 'btn btn-danger'
                          "
                          type="button"
                          :disabled="isResettingPassword || !!resetPasswordMsg"
                          @click="sendPasswordReset"
                        >
                          <b-spinner
                            v-if="isResettingPassword"
                            style="width: 1rem; height: 1rem;"
                          />

                          <span v-else-if="!!resetPasswordMsg">
                            {{ resetPasswordMsg }}
                          </span>

                          <span v-else>
                            Reset Password
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

    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { isPlainObject } from 'lodash'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, max, regex, email } from 'vee-validate/dist/rules'

import { apiClient } from '../axios'
import Footer from '../components/Footer.vue'
import UserRepository from '../repositories/users'
import SkillRepository from '../repositories/skills'
import EventDonationRepository from '../repositories/events/donations'
import EventVolunteerRepository from '../repositories/events/volunteers'
import MonetaryDonationRepository from '../repositories/monetary-donations'
import validationMixins from '../mixins/validation'

import { provinceCityMap } from '../constants/philippines'

const logo = require('../assets/aralpinoywords.png')

extend('required', {
  ...required,
  message: 'This field is required'
})
extend('max', {
  ...max,
  message: 'This field must be less than or equal to {length} characters'
})
extend('email', {
  ...email,
  message: 'This field must be a valid email'
})

extend('regex', regex)

const userRepository = new UserRepository(apiClient)
const skillRepository = new SkillRepository(apiClient)
const eventDonationRepository = new EventDonationRepository(apiClient)
const eventVolunteerRepository = new EventVolunteerRepository(apiClient)
const monetaryDonationRepository = new MonetaryDonationRepository(apiClient)

function toSkillId (skill) {
  return skill._id
}

export default {
  name: 'UserProfile',
  components: {
    Footer,
    ValidationObserver,
    ValidationProvider
  },
  mixins: [validationMixins],
  data () {
    return {
      logo,
      errorMessage: '',
      profile: {
        firstName: '',
        lastName: '',
        contactNumber: '',
        email: '',
        gender: '',
        birthDate: '',
        location: {
          country: '',
          province: '',
          city: ''
        },
        skills: [],
        skillIds: []
      },
      loading: {
        firstName: false,
        lastName: false,
        contactNumber: false,
        email: false,
        gender: false,
        birthDate: false,
        location: false,
        skills: false
      },
      pageOptions: [5, 10, 15],
      eventVolunteers: {
        results: [],
        total: 0,
        pagination: {
          perPage: 5,
          currentPage: 1
        },
        fields: [
          { key: 'event', label: 'Event' },
          { key: 'startDate', label: 'Date & Time' },
          { key: 'event.location.name', label: 'Venue' },
          { key: 'status', label: 'Status' },
          { key: 'action', label: 'Action' }
        ]
      },
      eventDonations: {
        results: [],
        total: 0,
        pagination: {
          perPage: 5,
          currentPage: 1
        },
        fields: [
          { key: '_id', label: 'Reference Number' },
          { key: 'createdAt', label: 'Transaction Date & Time' },
          { key: 'amount', label: 'Amount' },
          { key: 'event', label: 'Event' },
          { key: 'status', label: 'Status' }
        ]
      },
      monetaryDonations: {
        results: [],
        total: 0,
        pagination: {
          perPage: 5,
          currentPage: 1
        },
        fields: [
          { key: '_id', label: 'Reference Number' },
          { key: 'createdAt', label: 'Transaction Date & Time' },
          { key: 'contact', label: 'Contact Details' },
          { key: 'amount', label: 'Amount' },
          { key: 'status', label: 'Status' }
        ]
      },
      resetPasswordMsg: '',
      isResettingPassword: false,
      genderOptions: ['Male', 'Female'],
      skillOptions: [],
      cityOptions: [],
      regexRules: {
        filipinoCharacters: /^[a-zA-Z\u00f1\u00d1 -]+$/,
        phContactNumber: /^(09|\+639)\d{9}$/
      }
    }
  },
  computed: {
    ...mapGetters(['user', 'token']),
    eventDonationsPageOffset () {
      return (this.eventDonations.pagination.currentPage - 1) * this.eventDonations.pagination.perPage
    },
    eventVolunteersPageOffset () {
      return (this.eventVolunteers.pagination.currentPage - 1) * this.eventVolunteers.pagination.perPage
    },
    philippineProvinces () {
      return Object.keys(provinceCityMap).sort()
    }
  },
  watch: {
    'profile.location.province' (value) {
      const citiesMap = provinceCityMap[value]

      if (citiesMap !== undefined) {
        this.cityOptions = Object.keys(citiesMap).sort()
      } else {
        this.cityOptions = []
      }

      if (citiesMap[this.profile.location.city] !== true) {
        this.profile.location.city = ''
      }
    }
  },
  created () {
    const authHeader = `Bearer ${this.token}`

    userRepository.setAuthorizationHeader(authHeader)
    skillRepository.setAuthorizationHeader(authHeader)
    eventDonationRepository.setAuthorizationHeader(authHeader)
    eventVolunteerRepository.setAuthorizationHeader(authHeader)
    monetaryDonationRepository.setAuthorizationHeader(authHeader)

    const user = this.user

    this.profile.firstName = user.firstName
    this.profile.lastName = user.lastName
    this.profile.contactNumber = user.contactNumber
    this.profile.email = user.email
    this.profile.gender = user.gender
    this.profile.skills = user.skills || []
    this.profile.skillIds = [].concat(this.profile.skills).map(toSkillId)

    const birthDate = new Date(user.birthDate)

    if (!isNaN(birthDate)) {
      this.profile.birthDate = birthDate
    }

    if (user.location !== undefined) {
      this.profile.location.country = user.location.country
      this.profile.location.province = user.location.province
      this.profile.location.city = user.location.city
    }
  },
  methods: {
    ...mapActions(['updateUser']),
    async getEventVolunteers (ctx) {
      const userId = this.user._id

      const perPage = this.eventVolunteers.pagination.perPage
      const pageOffset = this.eventVolunteersPageOffset

      const { results, total } = await eventVolunteerRepository.list({
        userId
      }, {
        limit: perPage,
        offset: pageOffset,
        expand: true
      })

      this.eventVolunteers.total = total

      return results
    },
    async getEventDonations (ctx) {
      const userId = this.user._id

      const perPage = this.eventDonations.pagination.perPage
      const pageOffset = this.eventDonationsPageOffset

      const { results, total } = await eventDonationRepository.list({
        userId
      }, {
        limit: perPage,
        offset: pageOffset,
        expand: true,
        sort: {
          field: 'updatedAt',
          order: 'desc'
        }
      })

      this.eventDonations.total = total

      return results
    },
    async getMonetaryDonations (ctx) {
      const userId = this.user._id

      const perPage = this.monetaryDonations.pagination.perPage
      const pageOffset = this.monetaryDonationsPageOffset

      const { results, total } = await monetaryDonationRepository.list({
        userId
      }, {
        limit: perPage,
        offset: pageOffset,
        expand: true,
        sort: {
          field: 'updatedAt',
          order: 'desc'
        }
      })

      this.monetaryDonations.total = total

      return results
    },
    getContactFromMonetaryDonationMetadata (metadata) {
      if (metadata === undefined) {
        return ''
      }

      if (metadata.contactDetails === undefined) {
        return ''
      }

      const contactDetails = metadata.contactDetails

      const nameBuilder = []

      if (contactDetails.firstName !== undefined) {
        nameBuilder.push(contactDetails.firstName)
      }

      if (contactDetails.middleName !== undefined) {
        nameBuilder.push(contactDetails.middleName)
      }

      if (contactDetails.lastName !== undefined) {
        nameBuilder.push(contactDetails.lastName)
      }

      const name = nameBuilder.join(' ')

      if (contactDetails.email !== undefined) {
        return `${name} <${contactDetails.email}>`
      } else if (contactDetails.phone !== undefined) {
        return `${name} <${contactDetails.phone}>`
      }

      return name
    },
    async updateProfile (update = {}, loadField, reset) {
      this.errorMessage = ''

      this.updateLoading(loadField, true)

      const payload = {}

      for (const [key, value] of Object.entries(update)) {
        if (typeof value === 'string' && value.trim().length === 0) {
          payload[key] = null

          continue
        }

        if (isPlainObject(value)) {
          payload[key] = {}

          for (const [innerKey, innerValue] of Object.entries(update[key])) {
            if (innerValue === '') {
              payload[key][innerKey] = null
            } else {
              payload[key][innerKey] = innerValue
            }
          }

          continue
        }

        payload[key] = value
      }

      try {
        await userRepository.update(this.user._id, payload)
        const currentUser = await userRepository.get(this.user._id)

        await this.updateUser(currentUser)

        if (reset !== undefined) {
          reset()
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.updateLoading(loadField, false)
      }
    },
    updateLoading (loadField, flag) {
      if (!Array.isArray(loadField)) {
        this.loading[loadField] = flag

        return
      }

      for (const field of loadField) {
        this.loading[field] = flag
      }
    },
    async searchSkills (value) {
      const { results } = await skillRepository.list({
        name: value
      }, {
        limit: 10,
        offset: 0,
        sort: {
          field: 'name',
          order: 'asc'
        }
      })

      this.skillOptions = results
    },
    selectSkill (skill) {
      if (this.profile.skillIds.includes(skill._id)) {
        return
      }

      this.profile.skillIds.push(skill._id)
      this.profile.skills.push({
        _id: skill._id,
        name: skill.name
      })

      this.updateProfile({
        skillIds: this.profile.skillIds
      }, 'skills')
    },
    removeSkill (index) {
      this.profile.skillIds.splice(index, 1)
      this.profile.skills.splice(index, 1)

      this.updateProfile({
        skillIds: this.profile.skillIds
      }, 'skills')
    },
    async sendPasswordReset () {
      const email = this.user.email

      this.isResettingPassword = true

      try {
        await apiClient.post('/forgot-password', {
          email,
          origin: 'volunteer'
        })

        this.resetPasswordMsg = 'Password reset has been requested! Please check your inbox or spam folder'
      } catch {
        this.resetPasswordMsg = 'Unable to request for a password reset.'
      } finally {
        this.isResettingPassword = false
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
</style>
