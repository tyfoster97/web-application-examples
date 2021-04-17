const { Stack } = require('./stack');
/*******************************************************************************
 * @file operation.js
 * @version 2021.04.16
 * @author Ty Foster
 *
 * File containing methods for interacting with a user operation
 */
class Currency {
  /***********************************************************
   * CONSTRUCTOR
   * @param {number} amount the amount of the currency
   * @param {string} type the currency type
   */
  /* istanbul ignore next */
  constructor(amount, type) {
    this.amount = amount;
    this.type = type;
  }
}

class Operation {
  /***********************************************************
   * CONSTRUCTOR
   * @param {Currency} operand the input for the operation
   * @param {Currency} result the result of the operation
   * @param {string} agent the agent requesting the operation
   * @param {string} ip the ip address of the user performing
   * the operation
   */
  constructor(operand, result, agent, ip) {
    this.operand = operand || { amount: 0, type: 'USD' };
    this.result = result || { amount: 0, type: 'USD' };
    this.agent = agent || 'unknown';
    this.ip = ip || 'unknown';
  }
}

/***********************************************************
 * Creates a new conversion object and pushes it to the
 * stack
 *
 * @param {number} in_amt the input amount for the
 * conversion
 * @param {number} out_amt the amount returned
 * @param {string} out_currency the type of currency
 * returned
 * @param {string} agent the agent requesting the operation
 * @param {string} ip the ip address of the user requesting
 * the operation
 */
async function pushToStack(in_amt, out_amt, out_currency, agent, ip) {
  const operand = new Currency(in_amt, 'USD');
  const result = new Currency(out_amt, out_currency);
  const op = new Operation(operand, result, agent, ip);
  const s = (await Stack.findOne()); // one stack element in database
  await s.push(op);
}

module.exports = {
  Operation,
  pushToStack
};
