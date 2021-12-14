'use strict'

const mongoose = require('mongoose')
const argon2 = require('argon2')

const SkillModel = require('./skills')

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
  roles: {
    type: [String],
    required: true
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
  gender: String,
  birthDate: Date,
  address: {
    home: String
  },
  skills: {
    type: [mongoose.Types.ObjectId],
    ref: SkillModel
  }
})

async function hashPasswordBeforeSave () {
  const user = this

  if (!user.isModified('password')) {
    return
  }

  const hashedPassword = await argon2.hash(user.password)

  user.password = hashedPassword
}

async function hashPasswordBeforeUpdate () {
  if (this._update.$set === undefined) {
    return
  }

  const password = this._update.$set.password

  if (password === undefined) {
    return
  }

  const hashedPassword = await argon2.hash(password)

  this._update.$set.password = hashedPassword
}

userSchema.pre('save', hashPasswordBeforeSave)
userSchema.pre('updateOne', hashPasswordBeforeUpdate)

module.exports = mongoose.model('User', userSchema)
