const { Entry } = require('../utils/entry');
/**
 * @file entry.test.js
 * @version 2021.04.09
 * @author Ty Foster
 * 
 * File for testing entry.js functions
 */

describe('Constructor', () => {
  test('Empty params', () => {
    const e = new Entry();
    expect(e.key).toEqual([]);
    expect(e.answer).toEqual([]);
  });

  test('Arrays', () => {
    const e = new Entry(['hello'], ['howdy']);
    expect(e.key).toEqual(['hello']);
    expect(e.answer).toEqual(['howdy']);
  });
});

describe('Functions', () => {
  const e = new Entry(['gay', 'lesbian'], ['straight', 'boring']);

  describe('addAnswer', () => {
    test('Already present', () => {
      Entry.addAnswer(e, 'boring');
      expect(e.answer).toEqual(['straight', 'boring']);
    });
    
    test('Not present', () => {
      Entry.addAnswer(e, 'cisgender');
      expect(e.answer).toEqual(['straight', 'boring', 'cisgender']);
    });
  });

  describe('hasKey', () => {
    test('key present', () => {
      expect(Entry.hasKey(e, 'gay')).toBe(true);
    });

    test('key not present', () => {
      expect(Entry.hasKey(e, 'straight')).toBe(false);
    });
  });

  describe('getAnswer', () => {
    test('populated list', () => {
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 0.25; // guarantee first element selected
      global.Math = mockMath;
      expect(Entry.getAnswer(e)).toEqual('straight');
    });

    test('empty list', () => {
      e.answer = [];
      expect(Entry.getAnswer(e)).toEqual('');
    });
  })
});