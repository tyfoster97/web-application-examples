var u = require('../util/util');
/**
 * @author Ty Foster
 * @version 2021.04.01
 * 
 * Copyright 2021, all rights reserved.
 * 
 * Unit tests for util.js
 */

describe('isVar', () => {
  test('null', () => {
    expect(u.isVar(null)).toBe(false);
  });

  test('undefined', () => {
    expect(u.isVar(undefined)).toBe(false);
  })

  test('empty object', () => {
    expect(u.isVar({})).toBe(true);
  });

  test('empty array', () => {
    expect(u.isVar([])).toBe(true);
  });

  test('empty string', () => {
    expect(u.isVar('')).toBe(true);
  });

  test('zero', () => {
    expect(u.isVar(0)).toBe(true);
  });
});