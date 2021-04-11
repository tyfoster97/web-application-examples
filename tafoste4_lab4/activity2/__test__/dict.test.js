const { dict } = require('../dictionary-1');
const { Dictionary } = require('../utils/dictionary');
/**
 * @file dict.test.js
 * @version 2021.04.09
 * @author Ty Foster
 * 
 * File for testing dictionary.js functions
 */

let d;
let safe_d;

beforeAll(() => {
  d = dict;
  safe_d = dict;
})

beforeEach(async () => {
  d = safe_d;
});

describe('Word processing', () => {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0; // guarantee first element selected
  global.Math = mockMath;

  test('Word not in dictionary', () => {
    const arr = ['badass'];
    Dictionary.censor(d, arr);
    expect(arr).toEqual(['badass']);
  });

  test('Word in dictionary', () => {
    const arr = ['cryptic'];
    Dictionary.censor(d, arr);
    expect(arr).toEqual(['obvious']);
  });

  test('Word ends with punctiation', () => {
    const arr = ['cryptic,', 'dumb.', '(ugly)'];
    Dictionary.censor(d, arr);
    expect(arr).toEqual(['obvious,', 'educated.', '(attractive)']);
  });

  test('idle message', () => {
    const arr = ['idle'];
    Dictionary.censor(d, arr)
    expect(arr).toEqual(['idle']);
  })
});

describe('Add words to dictionary', () => {
  test('word already present', async () => {
    expect(Dictionary.addData(d, {stupid: 'educated'})).toBe(true);
  });

  test('word not present', async () => {
    expect(Dictionary.addData(d, {stupid: 'intelligent'})).toBe(true);
  });

  test('key not present', async () => {
    expect(Dictionary.addData(d, {tim: 'beautiful'})).toBe(false);
  });
});