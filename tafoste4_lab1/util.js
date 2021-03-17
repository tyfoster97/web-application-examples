/**
 * HELPER FUNCTION
 * @param {string} op operation to perform
 * @param {number} a number from calculator
 * @param {number} b number from calculation object
 * @returns {number} result of operation
 */
function doMath(op, a, b) {
  switch(op) {
    case 'add':
      return a + b;
    case 'subtract':
      return a - b;
  }

  return a;
};

module.exports = { operation };