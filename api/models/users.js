'use strict'

const mongoose = require('mongoose')
const argon2 = require('argon2')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    select: false
  },
  contactNumber: String,
  firstName: {
    type: String,
    required: true
  },
  middleName: String,
  lastName: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    required: true
  }
})

async function hashPasswordBeforeSave (next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  const hashedPassword = await argon2.hash('password')

  user.password = hashedPassword

  next()
}

userSchema.pre('save', hashPasswordBeforeSave)

module.exports = mongoose.model('User', userSchema)
