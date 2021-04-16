var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Currency Converter', amount: 0, currency_type: 'USD'});
});

module.exports = router;
