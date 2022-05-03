<template>
  <b-list-group-item
    v-b-visible="visibleHandler"
    :variant="notification.seen ? 'secondary': ''"
    class="d-flex align-items-center"
    button
    @click="read()"
  >
    <b-avatar
      icon="hourglass-bottom"
      class="mr-5"
    />

    <div
      class="flex-column w-100 align-items-start"
      style="margin-left: 15px"
    >
      <div class="d-flex justify-content-between">
        <h5 class="mb-1">
          An item in your inventory will soon expire!
        </h5>
        <small>{{ notificationDate }}</small>
      </div>

      <small class="mb-1">
        <strong>{{ details.itemName }}</strong> will be expiring on
        <strong>{{ new Date(details.expirationDate).toLocaleString('en-us', { dateStyle: 'medium' }) }}</strong>.
      </small>
    </div>
  </b-list-group-item>
</template>

<script>
import { formatDistanceToNow } from 'date-fns'

export default {
  name: 'ExpiringInventoryItemNotification',
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
      const path = '/inkind-donations'

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
