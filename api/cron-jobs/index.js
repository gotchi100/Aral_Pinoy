'use strict'

const Agenda = require('agenda')

const config = require('../config')
const checkExpiringInventoryItems = require('./check-expiring-inventory-items')
const checkEventsWithInsufficientVolunteer = require('./check-events-with-insufficient-volunteers')

const agenda = new Agenda({ 
  db: { 
    address: config.mongodb.uri 
  }
})

const EVERY_MIDNIGHT_CRON = '0 0 * * *'

module.exports = async function () {
  checkExpiringInventoryItems(agenda)
  checkEventsWithInsufficientVolunteer(agenda)

  await agenda.start()

  await agenda.every(EVERY_MIDNIGHT_CRON, [
    'check expiring inventory items',
    'check events with insufficient volunteers'
  ])
}