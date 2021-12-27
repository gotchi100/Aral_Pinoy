'use strict'

const fs = require('fs')
const path = require('path')

const { auth: googleAuth } = require('@googleapis/calendar')

const config = require('../config')

const TOKEN_PATH = path.resolve(__dirname, '../google-oauth2-token.json')

class GoogleOAuth {
  constructor() {
    this.auth = new googleAuth.OAuth2(
      config.google.oauth.api.clientId, 
      config.google.oauth.api.clientSecret, 
      config.google.oauth.api.redirectUri, 
    )
  }

  resolveAccessToken() {
    try {
      const tokenFile = fs.readFileSync(TOKEN_PATH)

      return JSON.parse(tokenFile)
    } catch {
      console.log('Google OAuth2 token does not exist')
    }
  }

  generateAuthUrl() {
    const SCOPES = ['https://www.googleapis.com/auth/calendar']

    const authUrl = this.auth.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    })

    console.log('Authorize this app by visiting this url:', authUrl)
  }

  async getAccessToken(code) {
    const { tokens } = await this.auth.getToken(code)

    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens))

    return tokens
  }

  setAuthCredentials(token) {
    this.auth.setCredentials(token)
  }
}

const instance = new GoogleOAuth()

function authorizeGoogleOAuth() {
  const token = instance.resolveAccessToken()

  if (token === undefined) {
    instance.generateAuthUrl()
  } else {
    instance.setAuthCredentials(token)
  }
}

authorizeGoogleOAuth()

module.exports = instance
