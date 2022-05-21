<template>
  <b-container class="mt-3">
    <b-row align-h="center">
      <b-col cols="8">
        <b-card style="text-align: left">
          <b-row>
            <b-col cols="9">
              <h3>
                Notifications
              </h3>
            </b-col>

            <b-col cols="3">
              <b-button
                variant="link"
                @click="markAllAsRead()"
              >
                Mark all as read
              </b-button>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12">
              <b-tabs
                pills
                card
              >
                <b-tab
                  title="All"
                  active
                >
                  <b-skeleton-wrapper :loading="notifications.loading">
                    <template #loading>
                      <b-card class="mb-3">
                        <b-skeleton width="85%" />
                        <b-skeleton width="55%" />
                        <b-skeleton width="70%" />
                      </b-card>
                    </template>

                    <b-list-group>
                      <template
                        v-for="notification of notifications.results"
                      >
                        <expiring-inventory-item-notification
                          v-if="notification.type === 'EXPIRING_INVENTORY_ITEM'"
                          :key="notification._id"
                          :notification="notification"
                          @onRead="redirectAndMarkAsRead"
                          @onVisible="markAsSeen(notification._id)"
                        />
                        <event-volunteers-needed-notification
                          v-if="notification.type === 'EVENT_VOLUNTEERS_NEEDED'"
                          :key="notification._id"
                          :notification="notification"
                          @onRead="redirectAndMarkAsRead"
                          @onVisible="markAsSeen(notification._id)"
                        />
                      </template>

                      <b-list-group-item
                        v-if="!notifications.isFullyLoaded"
                        class="flex-column align-items-center"
                        button
                        @click="getNotifications(notifications.offset + listLimit)"
                      >
                        <span class="text-primary">
                          See more notifications
                        </span>
                      </b-list-group-item>
                    </b-list-group>
                  </b-skeleton-wrapper>
                </b-tab>

                <b-tab title="Unread">
                  <template #title>
                    Unread
                    <span
                      v-if="unreadNotifications.results.length !== 0"
                      class="position-absolute translate-middle badge rounded-pill bg-danger"
                    >
                      {{ unseenNotificationCount }}
                    </span>
                  </template>

                  <b-skeleton-wrapper :loading="unreadNotifications.loading">
                    <template #loading>
                      <b-card class="mb-3">
                        <b-skeleton width="85%" />
                        <b-skeleton width="55%" />
                        <b-skeleton width="70%" />
                      </b-card>
                    </template>

                    <b-list-group>
                      <template
                        v-for="notification of unreadNotifications.results"
                      >
                        <expiring-inventory-item-notification
                          v-if="notification.type === 'EXPIRING_INVENTORY_ITEM'"
                          :key="notification._id"
                          :notification="notification"
                          @onRead="redirectAndMarkAsRead"
                        />
                        <event-volunteers-needed-notification
                          v-if="notification.type === 'EVENT_VOLUNTEERS_NEEDED'"
                          :key="notification._id"
                          :notification="notification"
                          @onRead="redirectAndMarkAsRead"
                        />
                      </template>

                      <b-list-group-item
                        v-if="!unreadNotifications.isFullyLoaded"
                        class="flex-column align-items-center"
                        button
                        @click="getUnreadNotifications(unreadNotifications.offset + listLimit)"
                      >
                        <span class="text-primary">
                          See more notifications
                        </span>
                      </b-list-group-item>
                    </b-list-group>
                  </b-skeleton-wrapper>
                </b-tab>
              </b-tabs>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ExpiringInventoryItemNotification from '../components/notifications/ExpiringInventoryItemNotification'
import EventVolunteersNeededNotification from '../components/notifications/EventVolunteersNeededNotification'

import NotificationRepository from '../repositories/notifications'
import { apiClient } from '../axios'

const notificationRepository = new NotificationRepository(apiClient)

const seenIds = new Set()

export default {
  name: 'Notifications',
  components: {
    ExpiringInventoryItemNotification,
    EventVolunteersNeededNotification
  },
  data () {
    return {
      listLimit: 10,
      notifications: {
        results: [],
        loading: false,
        isFullyLoaded: false,
        offset: 0
      },
      unreadNotifications: {
        results: [],
        total: 0,
        loading: false,
        isFullyLoaded: false,
        offset: 0
      }
    }
  },
  computed: {
    ...mapGetters(['user', 'token']),
    hasUnread () {
      return this.unreadNotifications.results.length === 0
    },
    unseenNotificationCount () {
      if (this.unreadNotifications.total > 99) {
        return '99+'
      }

      return this.unreadNotifications.total
    }
  },
  async created () {
    notificationRepository.setAuthorizationHeader(`Bearer ${this.token}`)

    await Promise.all([
      this.getNotifications(0),
      this.getUnreadNotifications(0)
    ])
  },
  methods: {
    ...mapActions(['decreaseUnseenNotificationsCount', 'setUnseenNotificationsCount']),
    async getNotifications (offset) {
      this.notifications.loading = true
      this.notifications.offset = offset

      try {
        const { results, total } = await notificationRepository.list({
          userId: this.user._id
        }, {
          limit: this.listLimit,
          offset: offset
        })

        this.notifications.results = this.notifications.results.concat(results)
        this.notifications.isFullyLoaded = this.notifications.results.length === total
      } finally {
        this.notifications.loading = false
      }
    },
    async getUnreadNotifications (offset) {
      this.unreadNotifications.loading = true
      this.unreadNotifications.offset = offset

      try {
        const { results, total } = await notificationRepository.list({
          userId: this.user._id,
          read: false
        }, {
          limit: this.listLimit,
          offset: offset
        })

        this.unreadNotifications.results = this.unreadNotifications.results.concat(results)
        this.unreadNotifications.total = total
        this.unreadNotifications.isFullyLoaded = this.unreadNotifications.results.length === total
      } finally {
        this.unreadNotifications.loading = false
      }
    },
    async redirectAndMarkAsRead ({ id, path }) {
      await notificationRepository.markAsRead([id])

      this.unreadNotifications.results = this.unreadNotifications.results.filter((notification) => notification._id !== id)

      if (path !== undefined) {
        this.$router.push({ path })
      }
    },
    async markAsSeen (id) {
      if (seenIds.has(id)) {
        return
      }

      seenIds.add(id)

      await notificationRepository.markAsSeen(id)
      this.decreaseUnseenNotificationsCount()
    },
    async markAllAsRead () {
      const ids = this.unreadNotifications.results.map((notification) => notification._id)

      await notificationRepository.markAsRead(ids)

      this.unreadNotifications.results = []
      this.unreadNotifications.total = 0
      this.unreadNotifications.isFullyLoaded = true

      this.setUnseenNotificationsCount(0)
    }
  }
}
</script>
