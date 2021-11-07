'use strict'

const {
  MONGODB_URI,
  JWT_SECRET,
} = process.env
  
if (MONGODB_URI === '') {
  throw new Error('Environment variable `MONGODB_URI` must be provided')
}
  
if (JWT_SECRET === '') {
  throw new Error('Environment variable `JWT_SECRET` must be provided')
}

module.exports = {
  mongodb: {
    uri: MONGODB_URI
  },
  jwt: {
    secret: JWT_SECRET
  }
}
