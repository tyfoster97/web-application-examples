/**
 * HELPER FUNCTION
 * NOTE: Assumes obj has key 'op' AND obj has key 'number' or 'b' has been passed as a parameter
 * 
 * @param {number} ans answer from the calculator
 * @param {string} op Operation Object to perform
 * @param {number} num number to change answer by
 * @return {number} the value of the operation
 */
function doMath(ans, op, num) {
  switch (op) {
    case 'add':
      return ans + num;
    case 'subtract':
      return ans - num;
    default:
      return ans;
  }
};

/**
 * HELPER FUNCTION
 * NOTE: of 'op' is 'push' or 'pop' assumes 'calc' exists and has necessary properties
 * 
 * @param {number} ans answer on the calculator prior to calling
 * @param {string} op operation string denoting 'add' or 'subtract' operation
 * @param {Object} expr operation Object for the calculator to perform
 * @param {Object} calc (optional) calculator for 'push' and 'pop'
 * @returns {number} answer after executing expression on calculator
 */
function doExprB(ans, op, expr) {
  let a = ans; // reassignable variable
  /* if expression has a number -> do math op */
  if (expr.op && expr.number != null) {
    a = doMath(ans, expr.op, expr.number);
    /* if expression has a nested expression 
      -> do expression op */
  } else if (expr.op && expr.expr) {
    a = doExprB(ans, expr.op, expr.expr);
  }

  return doMath(a, op, a);
}

/**
 * HELPER FUNCTION
 * 
 * @param {Object} calc PreCalc Object to perform calculation on
 * @param {Object} expr expression to evaluate
 * @returns 
 */
function doExprC(calc, expr) {
  if (expr.op == 'add' || expr.op == 'subtract') {
    /* if expression has a number -> do math op */
    if (expr.number != null) {
      calc.ans = doMath(calc.calcStack[0], expr.op, expr.number);
      /* if expression has a nested expression 
        -> do expression op */
    } else if (expr.expr) {
      calc.ans = doExprC(calc, expr.expr);
    }
  } else if (expr.op == 'push' || 'pop') {
    calc.ans = doOp(calc, expr);
  }
  return calc.ans;
}

/**
 * HELPER FUNCTION
 * NOTE: Assumes 'obj' has 'op' property AND 'calc' has 'ans' and 'calcStack' properties
 * WARN: can modify calc.ans and calc.calcStack
 * 
 * @param {PreCalc} calc PreCalc Object to perform Ops on
 * @param {Object} obj Operation Objhect to perform
 */
function doOp(calc, obj) {
  switch (obj.op) {
    case 'print':
      /* print stack */
      calc.calcStack.forEach(element => {
        console.log(element);
      });
      return ''; /* return empty string to ensure console prints stack and nothing else */
    case 'pop':
      if (calc.calcStack[0] != null) {
        /* pop top of stack to calc.ans */
        calc.ans = calc.calcStack.shift();
      }
      break;
    case 'push':
      /* if obj.number exists -> set calc.ans to obj.number */
      if (obj.number != null) {
        calc.ans = obj.number;
        /* if obj.expr exists -> set calc.ans to expression result */
      } else if (obj.expr) {
        calc.ans = doExprC(calc, obj.expr);
      }
      /* push calc.ans to top of stack */
      calc.calcStack.unshift(calc.ans);
      break;
    default:
      if (obj.op == 'add' || obj.op == 'subtract') {
        /* if obj.number exists and stack has elements -> do math op */
        if (obj.number != null && calc.calcStack[0] != null) {
          calc.ans = doMath(calc.calcStack[0], obj.op, obj.number);
          /* if obj.expr exists -> evaluate expression, do math if stack exists */
        } else if (obj.expr) {
          calc.ans = doExprC(calc, obj.expr);
          calc.ans = doMath(calc.calcStack[0], obj.op, calc.ans);
        }
      }
      /* do nothing */
      break;
  }
  /* any operation other than print should return calc.ans */
  return calc.ans;
}

module.exports = { doMath, doExprB, doOp };