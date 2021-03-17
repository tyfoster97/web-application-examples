/**
 * HELPER FUNCTION
 * @param {string} op operation to perform
 * @param {number} a number from calculator
 * @param {number} b number from calculation object
 * @returns {number} result of operation
 */
function operation(op, a, b) {
  if (op == 'add') {
    return a + b;
  } else if (op == 'subtract') {
    return a - b;
  } // ELSE do nothing with b

  return a;
};

module.exports = { operation };