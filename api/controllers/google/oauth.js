'use strict'

const GoogleOAuth = require('../../google/oauth')

class GoogleOAuthController {
  static async signin (code) {
    // TODO: Protect against CSRF
    // See more at https://developers.google.com/identity/protocols/oauth2/web-server#creatingclient 

    const token = await GoogleOAuth.getAccessToken(code)
    GoogleOAuth.setAuthCredentials(token)
  }
}

module.exports = GoogleOAuthController