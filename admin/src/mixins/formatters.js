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

export default {
  methods: {
    toUpperCase (value) {
      if (typeof value !== 'string') {
        return
      }

      return value.toUpperCase()
    },
    isZeroOrPositive (value) {
      if (value === '-') {
        return 0
      }

      if (isZeroOrPositive({ value }) !== true) {
        return 0
      }

      return Number(value)
    }
  }
}
