const { PreCalc, exec } = require('./lab1act2partC');
console.log('TESTING calc()');
var c = new PreCalc();

console.log('ans: ' + c.calc('{"op": "add", "number": 5}') + ',\tstack: ' + c.calcStack); // expect: 5, [0]
console.log('ans: ' + c.calc('{"op": "push", "number": 5}') + ',\tstack: ' + c.calcStack); // expect: 5, [5, 0]
console.log('ans: ' + c.calc('{"op": "pop"}') + ',\tstack: ' + c.calcStack); // expect: 5, [0]
console.log('ans: ' + c.calc('{"op": "push", "expr": {"op": "subtract", "number": 2}}') + ',\tstack: ' + c.calcStack); // expect: -2, [-2, 0]
console.log('ans: ' + c.calc('{"op": "push", "expr": {"op": "add", "number": 19}}') + ',\tstack: ' + c.calcStack); // expect: 17, [17, -2, 0]
console.log('ans: ' + c.calc('{"op": "pop"}') + ',\tstack: ' + c.calcStack); // expect: 17, [-2, 0]
console.log('ans: ' + c.calc('{"op": "push", "expr": {"op": "add", "expr": {"op": "pop"}}}') + ',\tstack: ' + c.calcStack); // expect: -2, [-2, 0]
console.log('stack: ');
c.calc('{"op": "print"}'); //should work without console.log
/* expect:
  -2
  0
*/
console.log('ans: ' + c.calc('{"op": "pop"}') + ',\tstack: ' + c.calcStack); // expect: -2, [0]
console.log('ans: ' + c.calc('{"op": "pop"}') + ',\tstack: ' + c.calcStack); // expect: 0, []
console.log('ans: ' + c.calc('{"op": "pop"}') + ',\tstack: ' + c.calcStack); // expect: 0, []

console.log('TESTING exec()');
var expC = [
  {'exp': {'op': 'add', 'number': 0}, 'expected': 0},
  {'exp': {'op': 'add', 'number': -1}, 'expected': -1},
  {'exp': {'op': 'subtract', 'number': -1}, 'expected': 1},
  {'exp': {'op': 'add', 'number': 5}, 'expected': 5},
  {'exp': {'op': 'subtract', 'number': 10}, 'expected': -10},
  {'exp': {'op': 'add', 'number': 15}, 'expected': 15},
  {'exp': {'op': 'subtract', 'expr': {'op': 'add', 'number': 15}}, 'expected': -15},
  {'exp': {'op': 'add', 'expr': {'op': 'add', 'expr': {'op': 'subtract', 'number': 3}}}, 'expected': -3},
  {'exp': {'op': 'push', 'number': -12}, 'expected': -12},
  {'exp': {'op': 'add', 'number': 5}, 'expected': -7},
  {'exp': {'op': 'push', 'number': 5}, 'expected': 5},
  {'exp': {'op': 'pop'}, 'expected': 5},
  {'exp': {'op': 'push', 'number': -7}, 'expected': -7},
  {'exp': {'op': 'push', 'expr': {'op': 'add', 'expr': {'op': 'pop'}}}, 'expected': -19}
];
let val = exec(expC);