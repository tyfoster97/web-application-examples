const { connect, close, clean } = require("../utils/db");
const { Stack } = require('../utils/stack');
/*******************************************************************************
 * @file stack.test.js
 * @version 2021.04.16
 * @author Ty Foster
 *
 * Tests stack.js implementation
 */

beforeAll(async () => {
  await connect(null, 'test-stack');
});

beforeEach(async () => {
  const stack = new Stack({
    size: 0,
    stack: []
  });
  await stack.save();
});

afterEach(async () => {
  await clean();
});

afterAll(async () => {
  await close();
});

describe('Push', () => {
  test('null check', async () => {
    const s = await Stack.findOne({size: 0});
    await s.push(null);
    const s_test = await Stack.findById(s._id);
    expect(s_test.stack).toEqual(s.stack);
    expect(s_test.size).toBe(0);
  });

  test('item pushed', async () => {
    const s = await Stack.findOne({size: 0});
    await s.push({test: 'object'});
    const s_test = (await Stack.findById(s._id)).toJSON();
    expect(s_test.stack).toEqual([{test: 'object'}]);
    expect(s.size).toBe(1);
  });
});

describe('Pop', () => {
  test('empty stack', async () => {
    const s = await Stack.findOne({size: 0});
    const popped = await s.pop();
    const s_test = (await Stack.findById(s._id)).toJSON();
    expect(popped).toEqual({});
    expect(s_test.stack).toEqual([]);
    expect(s_test.size).toBe(0);
  });

  test('populated stack', async () => {
    const s = await Stack.findOne({size: 0});
    await s.push({test: 'object'});
    const popped = await s.pop();
    const s_test = (await Stack.findById(s._id)).toJSON();
    expect(popped).toEqual({test: 'object'});
    expect(s_test.stack).toEqual([]);
    expect(s_test.size).toBe(0);
  });
});

describe('Clear', () => {
  test('empty stack', async () => {
    const s = await Stack.findOne({size: 0});
    await s.clear();
    const s_test = (await Stack.findById(s._id)).toJSON();
    expect(s_test.stack).toEqual([]);
    expect(s_test.size).toBe(0);
  });

  test('populated stack', async () => {
    const s = await Stack.findOne({size: 0});
    await s.push({});
    await s.push({});
    await s.clear();
    const s_test = (await Stack.findById(s._id)).toJSON();
    expect(s_test.stack).toEqual([]);
    expect(s_test.size).toBe(0);
  });
});
