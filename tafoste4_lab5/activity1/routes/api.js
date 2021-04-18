var express = require('express');
const { httpErr } = require('../utils/util');
var router = express.Router();

/* GET api for server. */
router.get('/', function(req, res, next) {
  res.render('api');
});

router.all('/', function(req, res, next) {
  httpErr(405, req, res, next);
});

module.exports = router;
