var express = require('express');
const { getActivity } = require('../util/activity');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('activity', {activities: getActivity()});
});

router.all('/', function(req, res, next) {
  httpErr(405, req, res, next);
});

module.exports = router;