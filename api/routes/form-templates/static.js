'use strict'

const fs = require('fs')
const path = require('path')

const express = require('express')

const postEventFormFilePath = path.resolve(__dirname, '../../form-templates/static', './post_event_form.pdf')

async function showPostEventForm(req, res) {
  const stat = fs.statSync(postEventFormFilePath)

  res.setHeader('Content-Length', stat.size)
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', 'attachment; filename=post_event_form.pdf')

  const file = fs.createReadStream(postEventFormFilePath)

  file.pipe(res)
}

const router = express.Router()

router.get('/post_event_form', showPostEventForm)

module.exports = router
