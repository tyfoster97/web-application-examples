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
    this.operand = operand || {amount: 0, type: 'USD'};
    this.result = result || {amount: 0, type: 'USD'};
    this.agent = agent || 'unknown';
    this.ip = ip || 'unknown';
  }

  /***********************************************************
   * Converts an Operation to a String
   *
   * @param {Operation} op the operation object to convert
   */
  static toString(op) {
    return `Operand: ${op.operand.amount} was converted from ${op.operand.type} to ${op.result.amount} ${op.result.type}, IP: ${op.ip}, User-Details: ${op.agent}`;
  }
}

module.exports = {
 Operation
};
