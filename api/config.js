'use strict'

const {
  MONGODB_URI,
  JWT_SECRET,
  JWT_EXPIRATION_TIME = '4h',
  VOLUNTEER_GOOGLE_OAUTH_REDIRECT_URI,
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_REDIRECT_URI
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
    secret: JWT_SECRET,
    expiresIn: JWT_EXPIRATION_TIME
  },
  volunteer: {
    google: {
      oauth: {
        redirectUri: VOLUNTEER_GOOGLE_OAUTH_REDIRECT_URI
      }
    }
  },
  google: {
    oauth: {
      clientId: GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
      redirectUri: GOOGLE_OAUTH_REDIRECT_URI
    }
  }
}
