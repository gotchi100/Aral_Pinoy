<template>
  <div>
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
            Expired items in your inventory have been deleted
          </h5>
          <small>{{ notificationDate }}</small>
        </div>

        <small class="mb-1">
          <strong>{{ getItemNames() }}</strong> {{ itemCount > 1 ? 'have' : 'has' }}
          reached their expiration &#40;<strong>{{ new Date(details.deletionThreshold).toLocaleString('en-us', { month: 'short', year: 'numeric' }) }}</strong>&#41;
          and {{ itemCount > 1 ? 'have' : 'has' }} been deleted.
        </small>
      </div>
    </b-list-group-item>

    <expired-inventory-items-modal
      :show="modal"
      :inventory-items="details.expiredItems"
      @close="modal = false"
    />
  </div>
</template>

<script>
import { formatDistanceToNow } from 'date-fns'

import ExpiredInventoryItemsModal from './ExpiredInventoryItemsModal'

export default {
  name: 'ExpiredInventoryItemsNotification',
  components: {
    ExpiredInventoryItemsModal
  },
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      modal: false
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
    },
    itemCount () {
      return this.details.expiredItems.length
    }
  },
  methods: {
    read () {
      const id = this.notification._id

      this.$emit('onRead', {
        id
      })

      this.modal = true
    },
    visibleHandler (isVisible) {
      if (this.notification.seen) {
        return
      }

      if (isVisible) {
        this.$emit('onVisible')
      }
    },
    getItemNames () {
      const expiredItems = this.details.expiredItems

      if (expiredItems.length === 1) {
        const item = expiredItems[0]

        return `${item.name}`
      }

      if (expiredItems.length === 2) {
        const [firstItem, secondItem] = expiredItems

        return `${firstItem.name} and ${secondItem.name}`
      }

      if (expiredItems.length === 3) {
        const [firstItem, secondItem, thirdItem] = expiredItems

        return `${firstItem.name}, ${secondItem.name}, and ${thirdItem.name}`
      }

      return `${expiredItems[0].name}, ${expiredItems[1].name}, and ${expiredItems.length - 2} others`
    }
  }
}
</script>
