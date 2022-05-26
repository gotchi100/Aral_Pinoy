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
        monetaryDonations: {
          labels: [],
          data: []
        }
      }
    }

    const donorAmountMap = new Map()

    for (const monetaryDonation of monetaryDonations) {
      let donor

      if (monetaryDonation.metadata !== undefined) {
        donor = ReportMonetaryDonationController.resolveDonor(monetaryDonation.metadata.contactDetails)
      } else {
        donor = ANONYMOUS_DONOR
      }

      const amount = donorAmountMap.get(donor)

      if (amount === undefined) {
        donorAmountMap.set(donor, monetaryDonation.amount)
      } else {
        donorAmountMap.set(donor, amount + monetaryDonation.amount)
      }
    }

    const monetaryDonationsLabels = []
    const monetaryDonationsData = []

    for (const [donor, amount] of donorAmountMap.entries()) {
      monetaryDonationsLabels.push(donor)
      monetaryDonationsData.push(amount)
    }

    return {
      monetaryDonations: {
        labels: monetaryDonationsLabels,
        data: monetaryDonationsData
      }
    }
  }

  /**
   * 
   * @param {Object} contactDetails Contact details
   * @returns {string}
   */
  static resolveDonor(contactDetails) {
    if (contactDetails === undefined) {
      return ANONYMOUS_DONOR
    }

    if (contactDetails.companyName !== undefined) {
      return contactDetails.companyName
    }

    if (contactDetails.firstName !== undefined && contactDetails.lastName !== undefined) {
      return `${contactDetails.firstName} ${contactDetails.lastName}`
    }

    return ANONYMOUS_DONOR
  }
}

module.exports = ReportMonetaryDonationController