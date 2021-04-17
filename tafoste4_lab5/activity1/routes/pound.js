var express = require('express');
const { connect, close } = require('../utils/db');
const { Stack } = require('../utils/stack');
var router = express.Router();
const conversion = 0.78;

/* POST conversion. */
router.post('/', async function(req, res, next) {
  const amt = req.query.amount * conversion; // perform
  // push to stack
  await connect();
  await pushToStack(
    req.query.amount,
    amt, 'POUND',
    req.headers['user-agent'],
    req.headers.host
  );
  const msg = JSON.stringify(
    {
      op: 'pound',
      currency: 'POUND',
      amount: amt,
      stack: (await Stack.findOne()).toJSON().stack
    });
  await close();
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(msg);
});

module.exports = router;
