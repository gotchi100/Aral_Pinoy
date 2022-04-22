<template>
  <b-list-group-item
    v-b-visible="visibleHandler"
    :variant="notification.seen ? 'secondary': ''"
    class="d-flex align-items-center"
    button
    @click="read()"
  >
    <b-avatar
      :src="event.logoUrl"
      icon="person"
      class="mr-5"
    />

    <div
      class="flex-column w-100 align-items-start"
      style="margin-left: 15px"
    >
      <div class="d-flex justify-content-between">
        <h5 class="mb-1">
          An event you volunteered has a new role!
        </h5>
        <small>{{ notificationDate }}</small>
      </div>

      <small class="mb-1">
        The <strong>{{ details.role }}</strong> role has been added to the
        <strong>{{ event.name }}</strong> event.
      </small>
    </div>
  </b-list-group-item>
</template>

<script>
import { formatDistanceToNow } from 'date-fns'

export default {
  name: 'NewEventRoleNotification',
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    details () {
      return this.notification.typeDetails
    },
    event () {
      const { event } = this.details

      return event
    },
    notificationDate () {
      const date = new Date(this.notification.createdAt)

      return formatDistanceToNow(date, {
        includeSeconds: true,
        addSuffix: true
      })
    }
  },
  methods: {
    read () {
      const id = this.notification._id
      const path = `/events/${this.event._id}`

      this.$emit('onRead', {
        id,
        path
      })
    },
    visibleHandler (isVisible) {
      if (isVisible) {
        this.$emit('onVisible')
      }
    }
  }
}
</script>
