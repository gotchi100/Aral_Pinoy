<template>
  <div>
    <div class="py-5">
      <img :src="logo" style="width: 320px; height: 150px">
    </div>

    <b-container class="pb-5">
      <b-row class="justify-content-md-center">
        <b-col cols="12">
          <b-card bg-variant="light" style="border-radius: 20px;">
            <b-container v-if="isLoadingEvent" style="height: 100vh">
              <b-row class="vh-100" align-h="center">
                <b-col cols="12" align-self="center">
                  <b-spinner style="width: 10rem; height: 10rem;" />
                </b-col>
              </b-row>
            </b-container>

            <b-container v-else fluid>
              <b-row>
                <b-col cols="12">
                  <b-card style="border-radius: 20px;">
                    <b-row>
                      <b-col cols="12">
                        <h1 class="text-start" style="font-family:'Bebas Neue', cursive;">
                          {{ event.name }}
                        </h1>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col cols="12">
                        <b-container fluid>
                          <b-row>
                            <b-col cols="12" md="6">
                              <p class="h4 mb-0">
                                <b-icon icon="geo-alt" />&nbsp;{{ event.location.name }}
                              </p>
                            </b-col>

                            <b-col cols="12" md="6">
                              <p class="h4 mb-0">
                                <b-icon icon="calendar" />&nbsp;
                                {{
                                  new Date(event.date.start).toLocaleString('en-us', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: '2-digit',
                                    hour: 'numeric',
                                    minute: '2-digit'
                                  })
                                }}
                                -
                                {{
                                  new Date(event.date.end).toLocaleString('en-us', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: '2-digit',
                                    hour: 'numeric',
                                    minute: '2-digit'
                                  })
                                }}
                              </p>
                            </b-col>
                          </b-row>

                          <b-row v-if="Array.isArray(event.contacts)" align-h="start">
                            <b-col cols="12">
                              <p class="h4">
                                <b-icon icon="person-lines-fill" />&nbsp;Contacts
                              </p>
                            </b-col>

                            <b-col v-for="(contact, index) in event.contacts" :key="index" cols="12" sm="3">
                              <p class="h6 text-start">
                                <b-icon
                                  :icon="contact.contactMethods[0].type === 'EMAIL' ? 'envelope' : 'telephone'"
                                />&nbsp;&nbsp;{{ contact.contactMethods[0].value }}
                                <span class="text-black-50">&lt;{{ contact.name }}&gt;</span>
                              </p>
                            </b-col>
                          </b-row>
                        </b-container>
                      </b-col>
                    </b-row>

                    <b-row class="py-4">
                      <b-col cols="12">
                        <b-container fluid>
                          <b-row class="pt-3 pb-4">
                            <b-col cols="12">
                              <b-img v-if="event.logoUrl !== undefined" :src="event.logoUrl" fluid alt="event logo" />

                              <b-card v-else>
                                <b-row>
                                  <b-col cols="12">
                                    <h3 style="font-family:'Bebas Neue', cursive;">
                                      No image uploaded
                                    </h3>
                                  </b-col>
                                </b-row>
                              </b-card>
                            </b-col>
                          </b-row>

                          <b-row>
                            <div>
                              <b-progress height="2rem" style="border-radius:30px;" :max="event.goals.monetaryDonation">
                                <b-progress-bar :value="5000" label="We need Php 5,000.00 more" style="background-color: #4267B2"></b-progress-bar>
                              </b-progress>
                            </div>
                          </b-row>
                          <br>
                          <b-row>
                            <div>
                              <b-progress height="2rem" style="border-radius:30px;" :max="event.goals.numVolunteers">
                                <b-progress-bar :value="1000" label="We need 10 more volunteers" style="background-color: #8F00FF"></b-progress-bar>
                              </b-progress>
                            </div>
                          </b-row>
                        </b-container>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>

              <b-row v-if="event.description !== undefined" class="py-4">
                <b-col cols="12">
                  <b-card style="border-radius: 20px;">
                    <h1 class="text-start" style="font-family:'Bebas Neue', cursive;">
                      Event Description
                    </h1>

                    <p class="text-start">
                      {{ event.description }}
                    </p>
                  </b-card>
                </b-col>
              </b-row>

              <b-row v-if="Array.isArray(event.sdgs)" class="py-4">
                <b-col cols="12">
                  <b-card style="border-radius: 20px;">
                    <h1 class="text-start" style="font-family:'Bebas Neue', cursive;">
                      Sustainable Development Goals
                    </h1>

                    <b-row>
                      <b-col v-for="(sdg, index) in event.sdgs" :key="index" cols="12" md="3">
                        <b-avatar :src="sdg.imageUrl" :alt="sdg.name" size="150px" square />
                        <br />
                        <strong>{{ sdg.name }}</strong>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>

              <b-row v-if="Array.isArray(event.ikds)" class="py-4">
                <b-col cols="12">
                  <b-card style="border-radius: 20px;">
                    <h1 class="text-start" style="font-family:'Bebas Neue', cursive;">
                      Items to be used for the Event
                    </h1>

                    <b-row>
                      <b-col cols="12">
                        <b-table
                          :items="event.ikds"
                          :fields="eventIkdFields"
                          show-empty
                          responsive
                          striped
                          primary-key="item.sku"
                        ></b-table>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-modal v-model="showModal" size="xl">
      <b-container>
        <b-row>
          <b-col cols="12">
            <b-card>
              <b-row>
                <b-col>
                  <b-button>Download List</b-button>
                </b-col>
                <b-col>
                  <b-input-group size="sm">
                    <p style="font-size: 20px; font-family:'Bebas Neue', cursive;">Search &nbsp; &nbsp; </p>
                    <b-form-input
                      id="filter-input"
                      v-model="filter"
                      type="search"
                      placeholder="Type to Search" style="height:30px; width:300px; border-radius: 10px;"
                    ></b-form-input>
                  </b-input-group>
                </b-col>
              </b-row>
              <b-table
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :filter-included-fields="filterOn"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                stacked="md"
                show-empty
                small
                @filtered="onFiltered"
              ></b-table>
            <b-col class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
            </b-col>
            </b-card>
          </b-col>

          <b-col cols="12">
            <b-card style="margin-top:20px;">
              <b-container>
                <b-row>
                  <b-col cols="12">
                    <h2>Role</h2>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col cols="12">
                    <h5>Trash Collector</h5>
                    <b-progress height="2rem" style="border-radius:30px;" :max="20">
                      <b-progress-bar :value="14" label="6 volunteers more are needed for this role"></b-progress-bar>
                    </b-progress>
                  </b-col>

                  <b-col cols="12">
                    <h5>Trash Bag Distributor</h5>
                    <b-progress height="2rem" style="border-radius:30px;" :max="20">
                      <b-progress-bar :value="12" label="8 volunteers more are needed for this role"></b-progress-bar>
                    </b-progress>
                  </b-col>
                </b-row>
              </b-container>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>

    <transition name="fade">
      <div id="pagetop" class="fixed right-0 bottom-0" v-show="scY > 300" @click="toTop">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4a5568"
          stroke-width="1"
          stroke-linecap="square"
          stroke-linejoin="arcs"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const logo = require('../../assets/aralpinoywords.png')
const { apiClient } = require('../../axios')

export default {
  name: 'EventDetails',
  data () {
    return {
      logo,
      event: null,
      eventIkdFields: [
        { key: 'item.name', label: 'Item' },
        { key: 'quantity', label: 'Quantity' }
      ],
      isLoadingEvent: false,
      sliding: null,
      value: 75,
      canBeShown: false,
      scTimer: 0,
      scY: 0,
      showModal: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      items: [
        { name: 'John Anghel', contactNumber: '+639123456789', role: 'Trash Collector' },
        { name: 'Test Dawkins', contactNumber: '+639123356789', role: 'Trash Bag Distributor' },
        { name: 'Marco Sullivan', contactNumber: '+639323456789', role: 'Trash Collector' },
        { name: 'Zayn Bontoc', contactNumber: '+639123856789', role: 'Trash Bag Distributor' },
        { name: 'Arlyn Jimenez', contactNumber: '+639023456789', role: 'Trash Collector' },
        { name: 'Fredrick Gomez', contactNumber: '+639127456789', role: 'Trash Collector' }
      ],
      fields: [
        { key: 'name', label: 'Name', sortable: true, class: 'text-center' },
        { key: 'contactNumber', label: 'Contact Number', sortable: true, class: 'text-center' },
        { key: 'role', label: 'Role', sortable: true, class: 'text-center' }
      ]
    }
  },
  created () {
    this.getEvent()
  },
  computed: {
    ...mapGetters(['token']),
    sortOption () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    this.totalRows = this.items.length
  },
  methods: {
    async getEvent () {
      this.isLoadingEvent = true
      const eventId = this.$route.params.id

      try {
        const { data } = await apiClient.get(`/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        this.event = data
      } finally {
        this.isLoadingEvent = false
      }
    },
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    handleScroll: function () {
      if (this.scTimer) return
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY
        clearTimeout(this.scTimer)
        this.scTimer = 0
      }, 100)
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    info (item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

.h4 {
  font-family: 'Bebas Neue', cursive;
  text-align: left;
  line-height: 1.8;
}
.fixed {
  display: inline;
  position: fixed;
  right: 15px;
  bottom: 15px;
  z-index: 99999;
}
</style>
