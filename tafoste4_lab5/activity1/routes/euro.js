var express = require('express');
const { connect, close } = require('../utils/db');
const { pushToStack } = require('../utils/operation');
var router = express.Router();
const conversion = 0.9;

/* POST conversion */
router.post('/', async function(req, res, next) {
  const amt = req.query.amount * conversion;
  // push op to stack
  await connect();
  await pushToStack(
    req.query.amount,
    amt, 'EURO',
    req.headers['user-agent'],
    req.headers.host
  );
  const msg = JSON.stringify(
    {
      op: 'euro',
      currency: 'EURO',
      amount: amt,
      stack: (await Stack.findOne()).toJSON().stack
    });
  await close();
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(msg);
});

module.exports = router;
