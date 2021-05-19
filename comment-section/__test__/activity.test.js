const a = require('../util/activity');
const { clearComments } = require('../util/comment');
/**
 * @author Ty Foster
 * @version 2021.04.01
 * 
 * Copyright 2021, all rights reserved.
 * 
 * Unit tests for comment.js
 */

beforeAll(() => {
  a.clearActivity();
});

afterAll(() => {
  //a.clearActivity();
});

describe('addActivity', () => {
  test('null check', () => {
    expect(a.addActivity(null, null, null, null)).toBe(false);
    expect(a.addActivity(null, {id: 'id', comment: 'comment'}, 'agent', 'ip')).toBe(false);
    expect(a.addActivity(a.ops.ADD, null, 'agent', 'ip')).toBe(false);
    expect(a.addActivity(a.ops.ADD, {id: 'id', comment: 'comment'}, null, 'ip')).toBe(false);
    expect(a.addActivity(a.ops.ADD, {id: 'id', comment: 'comment'}, 'agent', null)).toBe(false);
  });

  test('empty parameters check', () => {
    expect(a.addActivity('', {}, '', '')).toBe(false);
    expect(a.addActivity(a.ops.DELETE, {}, '', '')).toBe(false);
    expect(a.addActivity(a.ops.DELETE, {id: 'id', comment: 'comment'}, '', '')).toBe(false);
    expect(a.addActivity(a.ops.DELETE, {id: 'id', comment: 'comment'}, 'agent', '')).toBe(false);
  });

  test('invalid op', () => {
    expect(a.addActivity('reset', {id: 'id', comment: 'comment'}, 'agent', 'ip')).toBe(false);
  });

  test('operand not comment', () => {
    expect(a.addActivity(a.ops.ADD, {stuff: 'stuff'}, 'agent', 'ip')).toBe(false);
    expect(a.addActivity(a.ops.ADD, {id: 'id'}, 'agent', 'id')).toBe(false);
    expect(a.addActivity(a.ops.ADD, {comment: 'comment'}, 'agent', 'id')).toBe(false);
  });

  test('add add op', () => {
    expect(a.addActivity(a.ops.ADD, {id: 'id', comment: 'comment'}, 'agent', 'ip')).toBe(true);
  });

  test('add delete op', () => {
    expect(a.addActivity(a.ops.DELETE, {id: 'id', comment: 'comment'}, 'agent', 'ip')).toBe(true);
  });
});

describe('clearActivity', () => {
  test('clear', () => {
    expect(a.clearActivity()).toBe(true);
  });
});

describe('getActivity', () => {
  test('empty stack', () => {
    a.clearActivity();
    expect(a.getActivity()).toStrictEqual([]);
  });
  
  test('populated stack', () => {
    a.addActivity(a.ops.ADD, {id: 'id', comment: 'comment'}, 'agent', 'ip');
    a.addActivity(a.ops.DELETE, {id: 'id', comment: 'comment'}, 'agent', 'ip');
    expect(a.getActivity()).toStrictEqual([
      {op: a.ops.DELETE, operand: {id: 'id', comment: 'comment'}, agent: 'agent', ip: 'ip'},
      {op: a.ops.ADD, operand: {id: 'id', comment: 'comment'}, agent: 'agent', ip: 'ip'}
    ]);
  });
});

describe('undo', () => {
  test('empty stack', () => {
    a.clearActivity();
    expect(a.undoActivity()).toBe(false);
  });

  test('single item from populated stack', () => {
    a.addActivity(a.ops.ADD, {id: 'id', comment: 'comment'}, 'agent', 'ip');
    a.addActivity(a.ops.DELETE, {id: 'id', comment: 'comment'}, 'agent', 'ip');
    expect(a.undoActivity()).toBe(true);
  });

  test('all items from populated stack', () => {
    a.clearActivity();
    clearComments();
    a.addActivity(a.ops.ADD, {id: 'id', comment: 'comment'}, 'agent', 'ip');
    a.addActivity(a.ops.DELETE, {id: 'id', comment: 'comment'}, 'agent', 'ip');
    expect(a.undoActivity()).toBe(true); // undo delete
    expect(a.undoActivity()).toBe(true); // undo add
    expect(a.undoActivity()).toBe(false); // undo empty stack
  });
});
