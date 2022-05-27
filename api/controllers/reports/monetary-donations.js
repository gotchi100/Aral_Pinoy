'use strict'

const { startOfDay, endOfDay } = require('date-fns')

const MonetaryDonationModel = require('../../models/monetary-donations')

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
    
    const monetaryDonations = await MonetaryDonationModel.find({
      createdAt: {
        $gte: startOfDay(start),
        $lte: endOfDay(end)
      }
    }, undefined)

    if (monetaryDonations.length === 0) {
      return {
        monetaryDonationsByPerson: {
          labels: [],
          data: []
        },
        monetaryDonationsByCompany : {
          labels: [],
          data: []
        }
      }
    }

    const donorAmountByPersonMap = new Map()
    const donorAmountByCompanyMap = new Map()

    for (const monetaryDonation of monetaryDonations) {
      const donorPerson = ReportMonetaryDonationController.resolveDonorByPerson(monetaryDonation.metadata)
      const amountDonatedByPerson = donorAmountByPersonMap.get(donorPerson)

      if (amountDonatedByPerson === undefined) {
        donorAmountByPersonMap.set(donorPerson, monetaryDonation.amount)
      } else {
        donorAmountByPersonMap.set(donorPerson, amountDonatedByPerson + monetaryDonation.amount)
      }

      const donorCompany = ReportMonetaryDonationController.resolveDonorByCompany(monetaryDonation.metadata)
      const amountDonatedByCompany = donorAmountByPersonMap.get(donorPerson)

      if (amountDonatedByCompany === undefined) {
        donorAmountByCompanyMap.set(donorCompany, monetaryDonation.amount)
      } else {
        donorAmountByCompanyMap.set(donorCompany, amountDonatedByCompany + monetaryDonation.amount)
      }
    }

    const monetaryDonationsByPersonLabels = []
    const monetaryDonationsByPersonData = []
    const monetaryDonationsByCompanyLabels = []
    const monetaryDonationsByCompanyData = []

    for (const [donor, amount] of donorAmountByPersonMap.entries()) {
      monetaryDonationsByPersonLabels.push(donor)
      monetaryDonationsByPersonData.push(amount)
    }

    for (const [donor, amount] of donorAmountByCompanyMap.entries()) {
      monetaryDonationsByCompanyLabels.push(donor)
      monetaryDonationsByCompanyData.push(amount)
    }

    return {
      monetaryDonationsByPerson: {
        labels: monetaryDonationsByPersonLabels,
        data: monetaryDonationsByPersonData
      },
      monetaryDonationsByCompany : {
        labels: monetaryDonationsByCompanyLabels,
        data: monetaryDonationsByCompanyData
      }
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
      return ANONYMOUS_DONOR
    }
      
    const contactDetails = metadata.contactDetails

    if (contactDetails !== undefined && contactDetails.companyName !== undefined) {
      return contactDetails.companyName
    }

    return ANONYMOUS_DONOR
  }
}

module.exports = ReportMonetaryDonationController