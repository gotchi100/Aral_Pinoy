'use strict'

const { startOfDay, endOfDay, format } = require('date-fns')

const MonetaryDonationModel = require('../../models/monetary-donations')
const EventDonationModel = require('../../models/events/donations')
const EventExpenseModel = require('../../models/events/expenses')

class ReportIncomeStatementController {
  /**
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
    }, ['amount', 'createdAt'])
    const eventDonations = await EventDonationModel.find({
      createdAt: {
        $gte: startOfDay(start),
        $lte: endOfDay(end)
      }
    }, ['amount', 'createdAt'])
    const expenses = await EventExpenseModel.find({
      createdAt: {
        $gte: startOfDay(start),
        $lte: endOfDay(end)
      }
    }, ['amount', 'createdAt'])

    const incomeStatement = {
      labels: [],
      datasets: [{
        label: 'Income',
        data: []
      }, {
        label: 'Expense',
        data: []
      }]
    }

    if (monetaryDonations.length === 0 && eventDonations.length === 0 && expenses.length === 0) {
      return {
        incomeStatement
      }
    }

    const dateIncomeStatementMap = new Map()

    for (const monetaryDonation of monetaryDonations) {
      const transactionDate = format(monetaryDonation.createdAt, 'MM/dd/yy')

      let incomeStatementMap = dateIncomeStatementMap.get(transactionDate)

      if (incomeStatementMap === undefined) {
        incomeStatementMap = {
          totalIncome: 0,
          totalExpense: 0
        }

        dateIncomeStatementMap.set(transactionDate, incomeStatementMap)
      }

      incomeStatementMap.totalIncome += monetaryDonation.amount
    }

    for (const eventDonation of eventDonations) {
      const transactionDate = format(eventDonation.createdAt, 'MM/dd/yy')

      let incomeStatementMap = dateIncomeStatementMap.get(transactionDate)

      if (incomeStatementMap === undefined) {
        incomeStatementMap = {
          totalIncome: 0,
          totalExpense: 0
        }

        dateIncomeStatementMap.set(transactionDate, incomeStatementMap)
      }

      incomeStatementMap.totalIncome += eventDonation.amount
    }

    for (const expense of expenses) {
      const transactionDate = format(expense.createdAt, 'MM/dd/yy')

      let incomeStatementMap = dateIncomeStatementMap.get(transactionDate)

      if (incomeStatementMap === undefined) {
        incomeStatementMap = {
          totalIncome: 0,
          totalExpense: 0
        }

        dateIncomeStatementMap.set(transactionDate, incomeStatementMap)
      }

      incomeStatementMap.totalExpense += expense.amount
    }

    for (const [date, incomeStatementMap] of dateIncomeStatementMap.entries()) {
      incomeStatement.labels.push(date)

      const { 
        totalIncome,
        totalExpense
      } = incomeStatementMap

      incomeStatement.datasets[0].data.push(totalIncome)
      incomeStatement.datasets[1].data.push(totalExpense)
    }

    return {
      incomeStatement
    }
  }
}

module.exports = ReportIncomeStatementController