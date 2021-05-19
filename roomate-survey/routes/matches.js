var express = require('express');
const { compareAnswers } = require('../util/user/user.methods');
var router = express.Router();

router.all('/', async function (req, res, next) {
  let matches = await compareAnswers(req.session.user);
  
})