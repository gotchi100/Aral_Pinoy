
'use strict'

const axios = require('axios').default
const base64 = require('base64-url')

const config = require('../config')

const encodedSecretKey = base64.encode(config.paymaya.api.secretKey)

const apiClient = axios.create({
  baseURL: config.paymaya.api.baseUrl,
  headers: {
    authorization: `Basic ${encodedSecretKey}`
  }
})

class PaymayaClient {
  async getPaymentByReferenceNumber(referenceNumber) {
    const { data } = await apiClient.get(`/payments/v1/payment-rrns/${referenceNumber}`)

    return data[0]
  }

  async voidPayment(id, reason) {
    const { data } = await apiClient.post(`payments/v1/payments/${id}/voids`, {
      reason
    })

    return data
  }

  async refundPayment(id, payload) {
    const { data } = await apiClient.post(`payments/v1/payments/${id}/refunds`, payload)

    return data
  }
}

module.exports = new PaymayaClient()
