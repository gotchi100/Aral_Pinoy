'use strict'

const { startOfDay, endOfDay } = require('date-fns')

const MonetaryDonationModel = require('../../models/monetary-donations')
const EventDonationModel = require('../../models/events/donations')

const ANONYMOUS_DONOR = 'Anonymous'

class ReportMonetaryDonationController {
  /**
   * 
   * @param {Object} dateRange Date range object
   * @param {Date} dateRange.start Start date
   * @param {Date} dateRange.end End date
   * @returns 
   */
  static async get(dateRange) {
    const {
      start,
      end
    } = dateRange

    const totalDonationsByPerson = {
      labels: [],
      data: []
    }
    const totalDonationsByCompany = {
      labels: [],
      data: []
    }
    const monetaryDonationsByPerson = {
      labels: [],
      data: []
    }
    const monetaryDonationsByCompany = {
      labels: [],
      data: []
    }
    const eventDonationsByPerson = {
      labels: [],
      data: []
    }
    const eventDonationsByCompany = {
      labels: [],
      data: []
    }
    
    const monetaryDonations = await MonetaryDonationModel.find({
      createdAt: {
        $gte: startOfDay(start),
        $lte: endOfDay(end)
      }
    }, ['amount', 'metadata'])

    const eventDonations = await EventDonationModel.find({
      createdAt: {
        $gte: startOfDay(start),
        $lte: endOfDay(end)
      }
    }, ['amount', 'metadata'])

    const totalDonationAmountByPersonMap = new Map()
    const totalDonationAmountByCompanyMap = new Map()
    
    const {
      donorAmountByPersonMap: monetaryDonationAmountByPersonMap,
      donorAmountByCompanyMap: monetaryDonationAmountByCompanyMap
    } = ReportMonetaryDonationController.resolveMonetaryDonationsDonorAmounts(monetaryDonations)

    for (const [donor, amount] of monetaryDonationAmountByPersonMap.entries()) {
      monetaryDonationsByPerson.labels.push(donor)
      monetaryDonationsByPerson.data.push(amount)

      let totalAmount = totalDonationAmountByPersonMap.get(donor)

      if (totalAmount === undefined) {
        totalAmount = amount
      } else {
        totalAmount += amount
      }

      totalDonationAmountByPersonMap.set(donor, totalAmount)
    }

    for (const [donor, amount] of monetaryDonationAmountByCompanyMap.entries()) {
      monetaryDonationsByCompany.labels.push(donor)
      monetaryDonationsByCompany.data.push(amount)

      let totalAmount = totalDonationAmountByCompanyMap.get(donor)

      if (totalAmount === undefined) {
        totalAmount = amount
      } else {
        totalAmount += amount
      }

      totalDonationAmountByCompanyMap.set(donor, totalAmount)
    }

    const {
      donorAmountByPersonMap: eventDonationAmountByPersonMap,
      donorAmountByCompanyMap: eventDonationAmountByCompanyMap
    } = ReportMonetaryDonationController.resolveEventDonationsDonorAmounts(eventDonations)

    for (const [donor, amount] of eventDonationAmountByPersonMap.entries()) {
      eventDonationsByPerson.labels.push(donor)
      eventDonationsByPerson.data.push(amount)

      let totalAmount = totalDonationAmountByPersonMap.get(donor)

      if (totalAmount === undefined) {
        totalAmount = amount
      } else {
        totalAmount += amount
      }
      
      totalDonationAmountByPersonMap.set(donor, totalAmount)
    }

    for (const [donor, amount] of eventDonationAmountByCompanyMap.entries()) {
      eventDonationsByCompany.labels.push(donor)
      eventDonationsByCompany.data.push(amount)

      let totalAmount = totalDonationAmountByCompanyMap.get(donor)

      if (totalAmount === undefined) {
        totalAmount = amount
      } else {
        totalAmount += amount
      }

      totalDonationAmountByCompanyMap.set(donor, totalAmount)
    }

    for (const [donor, amount] of totalDonationAmountByPersonMap.entries()) {
      totalDonationsByPerson.labels.push(donor)
      totalDonationsByPerson.data.push(amount)
    }

    for (const [donor, amount] of totalDonationAmountByCompanyMap.entries()) {
      totalDonationsByCompany.labels.push(donor)
      totalDonationsByCompany.data.push(amount)
    }

    return {
      totalDonationsByPerson,
      totalDonationsByCompany,
      monetaryDonationsByPerson,
      monetaryDonationsByCompany,
      eventDonationsByPerson,
      eventDonationsByCompany
    }
  }

  static resolveMonetaryDonationsDonorAmounts(monetaryDonations = []) {
    const donorAmountByPersonMap = new Map()
    const donorAmountByCompanyMap = new Map()

    for (const monetaryDonation of monetaryDonations) {
      const donorCompany = ReportMonetaryDonationController.resolveDonorByCompany(monetaryDonation.metadata)

      if (donorCompany !== undefined) {
        const amountDonatedByCompany = donorAmountByCompanyMap.get(donorCompany)

        if (amountDonatedByCompany === undefined) {
          donorAmountByCompanyMap.set(donorCompany, monetaryDonation.amount)
        } else {
          donorAmountByCompanyMap.set(donorCompany, amountDonatedByCompany + monetaryDonation.amount)
        }
        
        continue
      }

      const donorPerson = ReportMonetaryDonationController.resolveDonorByPerson(monetaryDonation.metadata)
      const amountDonatedByPerson = donorAmountByPersonMap.get(donorPerson)

      if (amountDonatedByPerson === undefined) {
        donorAmountByPersonMap.set(donorPerson, monetaryDonation.amount)
      } else {
        donorAmountByPersonMap.set(donorPerson, amountDonatedByPerson + monetaryDonation.amount)
      }
    }

    return {
      donorAmountByPersonMap,
      donorAmountByCompanyMap
    }
  }

  static resolveEventDonationsDonorAmounts(eventDonations = []) {
    const donorAmountByPersonMap = new Map()
    const donorAmountByCompanyMap = new Map()

    for (const eventDonation of eventDonations) {
      const donorCompany = ReportMonetaryDonationController.resolveDonorByCompany(eventDonation.metadata)

      if (donorCompany !== undefined) {
        const amountDonatedByCompany = donorAmountByCompanyMap.get(donorCompany)

        if (amountDonatedByCompany === undefined) {
          donorAmountByCompanyMap.set(donorCompany, eventDonation.amount)
        } else {
          donorAmountByCompanyMap.set(donorCompany, amountDonatedByCompany + eventDonation.amount)
        }
        
        continue
      }

      const donorPerson = ReportMonetaryDonationController.resolveDonorByPerson(eventDonation.metadata)
      const amountDonatedByPerson = donorAmountByPersonMap.get(donorPerson)

      if (amountDonatedByPerson === undefined) {
        donorAmountByPersonMap.set(donorPerson, eventDonation.amount)
      } else {
        donorAmountByPersonMap.set(donorPerson, amountDonatedByPerson + eventDonation.amount)
      }
    }

    return {
      donorAmountByPersonMap,
      donorAmountByCompanyMap
    }
  }

  /**
   * 
   * @param {Object} metadata Metadata
   * @returns {string}
   */
  static resolveDonorByPerson(metadata) {
    if (metadata === undefined) {
      return ANONYMOUS_DONOR
    }

    const contactDetails = metadata.contactDetails

    if (contactDetails !== undefined && contactDetails.firstName !== undefined && contactDetails.lastName !== undefined) {
      return `${contactDetails.firstName} ${contactDetails.lastName}`
    }

    return ANONYMOUS_DONOR
  }

  /**
   * 
   * @param {Object} metadata Metadata
   * @returns {string}
   */
  static resolveDonorByCompany(metadata) {
    if (metadata === undefined) {
      return
    }
      
    const contactDetails = metadata.contactDetails

    if (contactDetails === undefined || contactDetails.companyName === undefined) {
      return
    }

    return contactDetails.companyName
  }
}

module.exports = ReportMonetaryDonationController