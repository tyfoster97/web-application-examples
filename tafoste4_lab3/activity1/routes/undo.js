var express = require('express');
const { undoActivity } = require('../util/activity');
const { httpErr } = require('../util/util');
var router = express.Router();

router.post('/', function (req, res, next) {
  undo(req, res, next);
});

router.get('/', function (req, res, next) {
  undo(req, res, next);
});

router.all('/', function(req, res, next) {
  httpErr(405, req, res, next);
});

function undo(req, res, next) {
  let undone = undoActivity();
  let status = (undone) ? 'successful' : 'failed';
  res.render('message', {op: 'Undo', status: status});
}

module.exports = router;