var express = require('express');
const { clearActivity } = require('../util/activity');
const { clearComments } = require('../util/comment');
var router = express.Router();

router.all('/', function (req, res, next) {
  clearComments();
  clearActivity();
  res.render('message', {op: 'Reset', status: 'successful'});
});

module.exports = router;