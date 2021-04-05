var express = require('express');
const { addComment } = require('../util/comment');
const { addActivity, ops } = require('../util/activity');
var router = express.Router();
const { createError } = require('http-errors');
const { httpErr } = require('../util/util');

/* POST comment to add. */
router.post('/', function(req, res, next) {
  // get comment id
  let id = req.body.id;
  // get comment text
  let text = req.body.comment;
  //attempt to save comment to comments.json
  let saved = addComment(id, text);
  if (saved) {
    // add to activity stack
    addActivity(ops.ADD, {id: id, comment: text}, req.header('User-Agent'), req.ip);
  }
  let status = (saved) ? 'successful' : 'failed';
  // show status page
  res.render('message', {op: 'Add', status: status});
});

router.all('/', function(req, res, next) {
  httpErr(405, req, res, next);
})

module.exports = router;
