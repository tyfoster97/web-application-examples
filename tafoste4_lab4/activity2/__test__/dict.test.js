const dict = require('../utils/dict');
/**
 * @file dict.test.js
 * @version 2021.04.09
 * @author Ty Foster
 * 
 * File for testing dict.js functions
 */

const { getDictionary } = require("../utils/dict");

describe('File I/O', () => {
  test('read from file', async () => {
    const d = await dict.getDictionary();
    expect(d.entries).toEqual(
      [{
        "key": ["stupid", "dumb", "idiot", "unintelligent", "simple-minded", "braindead", "foolish", "unthoughtful"],
        "answer": ["educated", "informed", "schooled"]
      }, {
        "key": ["unattractive", "hideous", "ugly"],
        "answer": ["attractive", "beauteous", "beautiful", "lovely", "pretty", "ravishing"]
      }, {
        "key": ["ambiguous", "cryptic", "dark", "nebulous", "obscure", "unintelligible"],
        "answer": ["obvious", "plain", "unambiguous", "understandable", "unequivocal"]
      }, {
        "key": ["incapable", "incompetent", "inept", "unable", "unfit", "unqualified", "weak", "artless"],
        "answer": ["accomplished", "fit", "adept", "complete", "consummate"]
      }, {
        "key": ["emotionless", "heartless", "unkind", "mean", "selfish", "evil"],
        "answer": ["benevolent", "benignant", "gentle", "kind", "clement"]
      }, {
        "key": ["idle"],
        "answer": ["Can you reply something?", "You have been idle for more than 30 seconds", "Whats the matter with you? Submit something"]
      }]
    );
  });

  test('write to file', async () => {

  });
});

describe('Word processing', () => {
  test('Word not in dictionary', () => {

  });

  test('Word in dictionary', () => {

  });

  test('5 copies are not all same replacement', () => { // this test could fail, unlikely

  });
});

describe('Add words to dictionary', () => {
  test('word already present', () => {

  });

  test('word not present', () => {

  });

  test('key not present', () => {

  });
})