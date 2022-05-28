'use strict'

import Validator from 'fastest-validator'

const v = new Validator()

const isZeroOrPositive = v.compile({
  value: {
    type: 'number',
    min: 0,
    convert: true
  }
})

const isPositive = v.compile({
  value: {
    type: 'number',
    positive: true,
    convert: true
  }
})

const isNumber = v.compile({
  value: {
    type: 'number',
    convert: true
  }
})

const isPesoCurrency = v.compile({
  value: {
    type: 'currency',
    currencySymbol: '₱'
  }
})

const pesoCurrencyRegex = /,|₱/g

export default {
  methods: {
    toUpperCase (value) {
      if (typeof value !== 'string') {
        return
      }

      return value.toUpperCase()
    },
    toZeroOrPositive (value) {
      if (value === '-') {
        return 0
      }

      if (isZeroOrPositive({ value }) !== true) {
        return 0
      }

      return Number(value)
    },
    toPositiveNumber (value) {
      if (value === '-') {
        return 1
      }

      if (isPositive({ value }) !== true) {
        return 1
      }

      return Number(value)
    },
    toNumber (value) {
      if (isNumber({ value }) !== true) {
        return 0
      }

      return Number(value)
    },
    toCurrency (value) {
      if (typeof value === 'string' && isPesoCurrency({ value }) === true) {
        return value
      }

      if (isNumber({ value }) !== true) {
        return 0
      }

      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP'
      }).format(value)
    },
    fromCurrencyToNumber (value) {
      if (isNumber({ value }) === true) {
        return value
      }

      if (typeof value !== 'string') {
        return 0
      }

      if (isPesoCurrency({ value }) !== true) {
        return 0
      }

      return Number(value.replace(pesoCurrencyRegex, ''))
    }
  }
}
