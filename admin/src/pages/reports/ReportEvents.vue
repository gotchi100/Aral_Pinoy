<template>
  <div>
    <b-container class="py-5">
      <b-row class="pb-3">
        <b-col cols="12">
          <b-card
            bg-variant="light"
            style="border-radius: 20px;"
          >
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <h2 style="font-family:'Bebas Neue', cursive;">
                    Events Report
                  </h2>
                </b-col>
              </b-row>

              <b-row class="py-2">
                <b-col
                  cols="12"
                  md="6"
                >
                  <label
                    for="start-datepicker"
                    style="font-family: 'Bebas Neue', cursive;"
                  >
                    From
                  </label>

                  <b-form-datepicker
                    id="start-datepicker"
                    v-model="startDate"
                    :max="endDate"
                    class="mb-2"
                  />
                </b-col>

                <b-col
                  cols="12"
                  md="6"
                >
                  <label
                    for="end-datepicker"
                    style="font-family: 'Bebas Neue', cursive;"
                  >
                    To
                  </label>

                  <b-form-datepicker
                    id="end-datepicker"
                    v-model="endDate"
                    :max="new Date()"
                    class="mb-2"
                  />
                </b-col>
              </b-row>

              <b-row class="py-2">
                <b-col cols="12">
                  <b-button
                    pill
                    variant="danger"
                  >
                    Generate Report
                  </b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>

      <b-row class="pb-3">
        <b-col cols="12">
          <b-card
            bg-variant="light"
            style="border-radius: 20px;"
          >
            <b-container
              fluid
            >
              <b-row
                class="py-2"
              >
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Post-Event Summaries
                  </h1>
                </b-col>
              </b-row>

              <b-row class="pb-3">
                <b-col cols="12">
                  <b-list-group>
                    <b-list-group-item
                      v-for="event in report.events"
                      :key="event._id"
                      button
                      @click="$router.push({ path: `/events/${event._id}/summary` })"
                    >
                      {{ event.name }} <br>
                      <span style="color: grey; font-size: 12px">
                        {{ toDate(event.date.start).toLocaleString('en-us', { dateStyle: 'medium', timeStyle: 'short' }) }}
                        -
                        {{ toDate(event.date.end).toLocaleString('en-us', { dateStyle: 'medium', timeStyle: 'short' }) }}
                      </span>
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
const today = new Date()

export default {
  name: 'ReportEvents',
  data () {
    return {
      startDate: today,
      endDate: today,
      report: {
        events: [{
          _id: 'eventId',
          name: 'Event Name',
          date: {
            start: '2022-05-25T18:53:22.738Z',
            end: '2022-06-25T18:53:22.738Z'
          }
        }, {
          _id: 'eventId2',
          name: 'Event Name',
          date: {
            start: '2022-05-25T18:53:22.738Z',
            end: '2022-06-25T18:53:22.738Z'
          }
        }, {
          _id: 'eventId3',
          name: 'Event Name',
          date: {
            start: '2022-05-25T18:53:22.738Z',
            end: '2022-06-25T18:53:22.738Z'
          }
        }]
      }
    }
  },
  watch: {
    endDate (value) {
      const startDate = new Date(this.startDate)
      const endDate = new Date(value)

      if (startDate > endDate) {
        this.startDate = endDate
      }
    }
  },
  methods: {
    toDate (string) {
      const date = new Date(string)

      if (isNaN(date)) {
        return
      }

      return date
    }
  }
}
</script>
