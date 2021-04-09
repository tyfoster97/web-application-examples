var express = require('express');
const { addUser, getUser } = require('../util/user/user.methods');
const { connect } = require('../util/util/db');
const { httpErr } = require('../util/util/util');
var router = express.Router();

/* GET users listing. */
router.post('/', async function(req, res, next) {
  try {
    await connect();
    let user = await addUser(req.body.username);
    if (!user) {
      user = await getUser(req.session.user, req.body.username);
    }
    user.currq = user.currq || 0;
    res.redirect(`../question/${user.currq}`);
  } catch (err) {
    httpErr(400, req, res, next);
  }
});

module.exports = router;
