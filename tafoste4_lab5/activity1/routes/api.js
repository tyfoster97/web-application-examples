var express = require('express');
var router = express.Router();

/* GET api for server. */
router.get('/', function(req, res, next) {
  res.render('api');
});

module.exports = router;
