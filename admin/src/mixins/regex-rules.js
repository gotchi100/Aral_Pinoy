'use strict'

export default {
  data () {
    return {
      regexRules: {
        filipinoCharacters: /^[a-zA-Z\u00f1\u00d1 -]+$/,
        phContactNumber: /^(09|\+639)\d{9}$/
      }
    }
  }
}
