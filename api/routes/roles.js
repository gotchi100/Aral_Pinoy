const express = require('express');
const expressJwt = require('express-jwt')

const RoleModel = require('../models/roles');

const router = express.Router();

/* Create a role. */
router.post(
  '/', 
  expressJwt({ secret: 'secret', algorithms: ['HS256'] }),
  async function(req, res, next) {
    const {
        name
    } = req.body;

    const role = new RoleModel();

    role.name = name;

    try {
      await role.save();

      res.send(role);
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

module.exports = router;
