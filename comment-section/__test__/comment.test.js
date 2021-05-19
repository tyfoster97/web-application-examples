var c = require('../util/comment');
/**
 * @author Ty Foster
 * @version 2021.04.01
 * 
 * Copyright 2021, all rights reserved.
 * 
 * Unit tests for comment.js
 */

beforeAll(() => {
  c.clearComments();
});

afterAll(() => {
  c.clearComments();
});

describe('Add Comment', () => {
  test('null checks', () => {
    expect(c.addComment(null, null)).toBe(false);
    expect(c.addComment('identifier', null)).toBe(false);
    expect(c.addComment(null, 'comment text')).toBe(false);
  });

  test('empty string checks', () => {
    expect(c.addComment('', '')).toBe(false);
    expect(c.addComment('', 'comment text')).toBe(false);
    expect(c.addComment('identifier', '')).toBe(false);
  });

  test('trivial add', () => {
    expect(c.addComment('id', 'text')).toBe(true);
  });

  test('non-trivial add', () => {
    expect(c.addComment('id', 'text')).toBe(false); // should be added from previous call
    expect(c.addComment('identifier', 'text')).toBe(true); // comment text can repeat
    expect(c.addComment('id', 'comment text')).toBe(false); // ids must be unique
  });

  test('comment found in data store', () => {
    expect(c.getComments()).toStrictEqual([
      {id: 'id', comment: 'text'},
      {id: 'identifier', comment: 'text'}
    ]);
  });
});

test('Clear Comments', () => {
  expect(c.clearComments()).toBe(true);
});

describe('Delete Comment', () => {
  test('null checks', () => {
    expect(c.deleteComment(null)).toBe(undefined);
  });

  test('empty string checks', () => {
    expect(c.deleteComment('')).toBe(undefined);
  });

  test('ID does not match', () => {
    expect(c.deleteComment('some-id-that-does-not-exist')).toBe(undefined);
  });

  test('ID does match', () => {
    c.addComment('id', 'text');
    c.addComment('identifier', 'text');
    expect(c.deleteComment('id')).toStrictEqual({id: 'id', comment: 'text'});
  });

  test('comment removed from data store', () => {
    expect(c.getComments()).toStrictEqual([
      {id: 'identifier', comment: 'text'}
    ]);
  });
});

describe('Get Comments', () => {
  test('empty file', () => {
    c.clearComments();
    expect(c.getComments()).toStrictEqual([]);
  });

  test('populated file', () => {
    c.addComment('id', 'text');
    c.addComment('identifier', 'text');
    expect(c.getComments()).toStrictEqual([
      { id: 'id', comment: 'text'},
      { id: 'identifier', comment: 'text'}
    ]);
  });
});