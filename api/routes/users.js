const express = require('express');
const expressJwt = require('express-jwt')

const UserModel = require('../models/users');

const router = express.Router();

/* Create a user. */
router.post(
  '/', 
  async function(req, res, next) {
    const {
      email,
      password,
      contactNumber,
      firstName,
      middleName,
      lastName
    } = req.body;

    const user = new UserModel();

    user.email = email;
    user.password = password;
    user.contactNumber = contactNumber;
    user.firstName = firstName;
    user.middleName = middleName;
    user.lastName = lastName;

    try {
      await user.save();

      res.send(user);
    } catch (error) {
      res.json({
        error: {
          message: error.message
        }
      });

      next();
    }
  }
);

/* Retrieve a user. */
router.get(
  '/:id',
  expressJwt({ secret: 'secret', algorithms: ['HS256'] }),
  async function(req, res, next) {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (user === null) {
      res.json({
        error: {
          message: 'User not found'
        }
      });

      return next();
    }

    res.send(user);
  }
);

module.exports = router;
