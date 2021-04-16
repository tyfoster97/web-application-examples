var express = require('express');
var router = express.Router();

/* GET previous conversion. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
