const express = require('express');
const router = express.Router();
const UserModel = require('../models/users');

/* Create a user. */
router.post('/', async function(req, res, next) {
  const {
    firstName,
    lastName
  } = req.body;

  const user = new UserModel();

  user.firstName = firstName;
  user.lastName = lastName;

  await user.save();

  res.send(user);
});

module.exports = router;
