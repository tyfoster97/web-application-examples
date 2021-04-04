var express = require('express');
const { addComment } = require('../util/comment');
const { addActivity, ops } = require('../util/activity');
var router = express.Router();

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

module.exports = router;
