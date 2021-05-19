var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate');
  res.render('index', { title: 'Roomate Finder' });
});

module.exports = router;
