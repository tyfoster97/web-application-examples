const { connect, closeAndDelete } = require('../utils/db');
const { Operation, pushToStack } = require('../utils/operation');
const { Stack } = require('../utils/stack');
/*******************************************************************************
 * @file operation.test.js
 * @version 2021.04.16
 * @author Ty Foster
 *
 * Tests implementation of operation.js
 */

describe('Constructor', () => {
  test('null parameters', () => {
    const op = new Operation();
    expect(op.operand).toEqual({amount: 0, type: 'USD'});
    expect(op.result).toEqual({amount: 0, type: 'USD'});
    expect(op.agent).toEqual('unknown');
    expect(op.ip).toEqual('unknown');
  });

  test('with parameters', () => {
    const op = new Operation(
      {amount: 1, type: 'USD'},
      {amount: 0.78, type: 'POUND'},
      'agent',
      'localhost'
    );
    expect(op.operand).toEqual({amount: 1, type: 'USD'});
    expect(op.result).toEqual({amount: 0.78, type: 'POUND'});
    expect(op.agent).toEqual('agent');
    expect(op.ip).toEqual('localhost');
  });
});

describe('To String', () => {
  test('null parameters', () => {
    const op = new Operation();
    expect(Operation.toString(op)).toEqual(
      'Operand: 0 was converted from USD to 0 USD, IP: unknown, User-Details: unknown'
    );
  });
});

describe('Stack integration', () => {
  test('Stack recieves object', async () => {
    await connect(null, 'test-stack');
    await new Stack({
      size: 0,
      stack: []
    }).save();
    await pushToStack();
    const s = (await Stack.findOne()).toJSON();
    expect(s.stack[0]).toBeTruthy();
    await closeAndDelete();
  });
});
