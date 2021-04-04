var express = require('express');
const { addActivity, ops } = require('../util/activity');
const { deleteComment } = require('../util/comment');
const { isVar } = require('../util/util');
var router = express.Router();

/* POST comment to add. */
router.post('/', function(req, res, next) {
  // get comment id
  let id = req.body.id;
  // delete commnent from comments.json
  let comment = deleteComment(id);
  let deleted = isVar(comment);
  if (deleted) {
    // add activity to stack
    addActivity(ops.DELETE, comment, req.header('User-Agent'), req.ip);
  }
  let status = (deleted) ? 'successful' : 'failed';
  // show status page
  res.render('message', {op: 'Delete', status: status});
});

module.exports = router;