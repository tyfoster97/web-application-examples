var express = require('express');
const { getActivity } = require('../util/activity');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('activity', {activities: getActivity()});
});

module.exports = router;