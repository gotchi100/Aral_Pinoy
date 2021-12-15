'use strict'

const path = require('path')

const {
  MONGODB_URI,
  JWT_SECRET,
  JWT_EXPIRATION_TIME = '4h',
  ADMIN_DOMAIN_NAME,
  VOLUNTEER_DOMAIN_NAME,
  VOLUNTEER_GOOGLE_OAUTH_REDIRECT_URI,
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_REDIRECT_URI,
  GOOGLE_CLOUD_SERVICE_ACCOUNT_CREDENTIALS,
  SMTP_GMAIL_AUTH_USER,
  SMTP_GMAIL_AUTH_PASS,
  SMTP_SENDGRID_AUTH_USER,
  SMTP_SENDGRID_AUTH_PASS,
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
  admin: {
    domainName: ADMIN_DOMAIN_NAME,
  },
  volunteer: {
    domainName: VOLUNTEER_DOMAIN_NAME,
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
    },
    cloud: {
      serviceAccount: path.resolve(__dirname, GOOGLE_CLOUD_SERVICE_ACCOUNT_CREDENTIALS)
    }
  },
  smtp: {
    gmail: {
      auth: {
        user: SMTP_GMAIL_AUTH_USER,
        pass: SMTP_GMAIL_AUTH_PASS
      }
    },
    sendgrid: {
      auth: {
        user: SMTP_SENDGRID_AUTH_USER,
        pass: SMTP_SENDGRID_AUTH_PASS
      }
    }
  }
}
