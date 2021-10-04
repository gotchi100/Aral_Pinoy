var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send({
    id: 1,
    name: ''
  });
});

module.exports = router;
