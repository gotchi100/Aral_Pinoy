<template>
  <b-container fluid>
    <b-row>
      <b-col
        class="px-0"
        cols="12"
      >
        <b-card bg-variant="light">
          <FullCalendar :options="calendarOptions" />
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import bootstrapPlugin from '@fullcalendar/bootstrap'

import { apiClient } from '../axios'
import EventVolunteerRepository from '../repositories/events/volunteers'

const eventVolunteerRepository = new EventVolunteerRepository(apiClient)

export default {
  name: 'EventCalendar',
  components: {
    FullCalendar
  },
  data () {
    return {
      calendarOptions: {
        headerToolbar: { center: 'listMonth,dayGridMonth,dayGridWeek' },
        plugins: [
          dayGridPlugin,
          listPlugin,
          bootstrapPlugin
        ],
        initialView: 'dayGridMonth',
        events: []
      }
    }
  },
  computed: {
    ...mapGetters(['user', 'token']),
    userId () {
      if (this.user === null) {
        return
      }

      return this.user._id
    }
  },
  created () {
    eventVolunteerRepository.setAuthorizationHeader(`Bearer ${this.token}`)

    this.getEventVolunteers()
  },
  methods: {
    async getEventVolunteers () {
      this.calendarOptions.events = []

      const userId = this.user._id

      const { results, total } = await eventVolunteerRepository.list({
        userId,
        eventStatuses: ['UPCOMING', 'ENDED']
      }, {
        expand: true
      })

      if (total === 0) {
        return
      }

      for (const item of results) {
        const { event } = item

        this.calendarOptions.events.push({
          id: event._id,
          title: event.name,
          start: new Date(event.date.start),
          end: new Date(event.date.end),
          url: `/#/events/${event._id}`
        })
      }
    }
  }
}
</script>

<style scoped>
html, body {
  height: 100%
}
</style>
