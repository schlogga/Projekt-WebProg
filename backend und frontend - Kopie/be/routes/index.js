var express = require('express');
var router = express.Router();

const User = require('../models/Users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/api-docs');
});

module.exports = router;
