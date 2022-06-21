'use strict'

const Agenda = require('agenda')

const config = require('../config')
const checkExpiringInventoryItems = require('./check-expiring-inventory-items')
const checkEventsWithInsufficientVolunteer = require('./check-events-with-insufficient-volunteers')
const deleteExpiredInventoryItems = require('./delete-expired-inventory-items')

const agenda = new Agenda({ 
  db: { 
    address: config.mongodb.uri 
  }
})

const TIMEZONE = {
  ASIA_MANILA: 'Asia/Manila'
}

const EVERY_MIDNIGHT_CRON = '0 0 * * *'
const EVERY_FIVE_MINUTES_CRON = '*/5 * * * *'

module.exports = async function () {
  checkExpiringInventoryItems(agenda)
  checkEventsWithInsufficientVolunteer(agenda)
  deleteExpiredInventoryItems(agenda)

  await agenda.start()

  await agenda.every(EVERY_MIDNIGHT_CRON, [
    'delete expired inventory items',
    'check events with insufficient volunteers',
  ], undefined, {
    timezone: TIMEZONE.ASIA_MANILA
  })

  await agenda.every(EVERY_FIVE_MINUTES_CRON, [
    'check expiring inventory items',
  ], undefined, {
    timezone: TIMEZONE.ASIA_MANILA
  })
}