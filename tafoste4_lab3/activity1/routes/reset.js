var express = require('express');
const { clearActivity } = require('../util/activity');
const { clearComments } = require('../util/comment');
const { httpErr } = require('../util/util');
var router = express.Router();

router.get('/', function (req, res, next) {
  clearComments();
  clearActivity();
  res.render('message', {op: 'Reset', status: 'successful'});
});

router.all('/', function(req, res, next) {
  httpErr(405, req, res, res);
})

module.exports = router;