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
 * HELPER FUNCTION FOR B
 * 
 * @param {number} ans answer on the calculator prior to calling
 * @param {string} op operation string denoting 'add' or 'subtract' operation
 * @param {Object} expr operation Object for the calculator to perform
 * @returns {number} answer after executing expression on calculator
 */
function doExpr(ans, op, expr) {
  let a = ans; // reassignable variable
  /* if expression has a number -> do math op */
  if (expr.op && expr.number != null) {
    a = doMath(ans, expr.op, expr.number);
    /* if expression has a nested expression 
      -> do expression op */
  } else if (expr.op && expr.expr) {
    a = doExpr(ans, expr.op, expr.expr);
  }

  return doMath(a, op, a);
}

/**
 * HELPER FUNCTION FOR C
 * NOTE: Assumes 'obj' has 'op' property AND 'calc' has 'ans' and 'calcStack' properties
 * WARN: can modify calc.ans and calc.calcStack
 * 
 * @param {PreCalc} calc PreCalc Object to perform Ops on
 * @param {Object} obj Operation Objhect to perform
 */
function doOp(calc, obj) {
  /* if op is add or subtract -> do math ops */
  if (obj.op == 'add' || obj.op == 'subtract') {
    /* if a number is provided -> do math */
    if (obj.number) {
      calc.ans = doMath(calc.calcStack[0], obj.op, obj.number);
    /* if an expression is provided -> evaluate, do math */
    } else if (obj.expr) {
      calc.ans = doOp(calc, obj.expr);
      calc.ans = doMath(calc.calcStack[0], obj.op, calc.ans);
    }
  } else {
    /* use switch for efficiency */
    switch (obj.op) {
      case 'push':
        /* if a number is provided -> assign to calc.ans */
        if (obj.number) {
          calc.ans = obj.number;
        /* if an expression is provided -> evaluate, assign to calc.ans */
        } else if (obj.expr) {
          calc.ans = doOp(calc, obj.expr);
        }
        /* push calc.ans to stack */
        calc.calcStack.unshift(calc.ans);
        break;
      case 'pop':
        /* if calc.calcStack has elements */
        if (calc.calcStack[0] != null) {
          /* pop top element from stack to calc.ans */
          calc.ans = calc.calcStack.shift();
        }
        break;
      case 'print':
        calc.calcStack.forEach((num) => {
          console.log(num);
        });
        break;
    }
  }
  return calc.ans;
}

module.exports = { doMath, doExpr, doOp };