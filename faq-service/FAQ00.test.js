const { FAQ } = require('./FAQ00');
/**
 * @author Ty Foster
 * @version 2021.03.25
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 * 
 * Tests FAQ00.js
 */

var faq = new FAQ();

console.log('TESTING FAQ00\n');
/* DELETING A QUESTION */
faq.deleteQuestion(null, 'does it work?'); // CLEANS STORE
console.log(faq.filterQuestions('ty foster', null, null, null)); // Expected: []

/* ADDING A QUESTION */
faq.addQuestion('does it work?', 'maybe', 'ty foster', 'test, self');
let testQ = faq.filterQuestions('ty foster')[0];
console.log(faq.filterQuestions('ty foster', null, null, null)); // Expected: [{question: 'does it work?', answer: 'maybe', author: 'ty foster', tags: 'test, self', id: {number}.{number}}]

/* UPDATING AN ANSWER TO A QUESTION */
faq.updateQuestion('update by question text does', null, 'does it work?');
console.log(faq.filterQuestions('ty foster', null, null, null)); // Expected: [{question: 'does it work?', answer: 'update by question text does', author: 'ty foster', tags: 'test, self', id: {number}.{number}}]
faq.updateQuestion('update by question id does', testQ.id, null);
console.log(faq.filterQuestions('ty foster', null, null, null)); // Expected: [{question: 'does it work?', answer: 'update by question id does', author: 'ty foster', tags: 'test, self', id: {number}.{number}}]

/* UPDATING TAGS */
faq.updateTags('test, updated, self', testQ.id);
console.log(faq.filterQuestions('ty foster', null, null, null)); // Expected: [{question: 'does it work?', answer: 'update by question id does', author: 'ty foster', tags: 'test, updated, self', id: {number}.{number}}]

/* FILTER BY TAGS */
console.log(faq.filterQuestions(null, 'test, xyz', null, null)); // Expected: [{question: "How do I write Unit Tests?", answer: "You should know this by now", tags: "unit test, whitebox, blackbox", author: "Ruben", date: "2019-09-06T04:17:36.814Z", id: 1567311456814.3071}, {question: "How do I implement xyz?", answer: "Very carefully.", tags: "implement, xyz", author: "Dr.G", date: "2019-07-10T04:18:55.079Z", id: 1567311535079.3115}, {question: 'does it work?', answer: 'update by question id does', author: 'ty foster', tags: 'test, updated, self', id: {number}.{number}}]

/* FILTER BY DATE RANGE */
console.log(faq.filterQuestions(null, null, null, null)); //Expected: QA.json
console.log(faq.filterQuestions(null, null, '2019-09-02T00:00:00.000Z', '2020-01-01T00:00:00.000Z')); // Expected: [{question: 'How do I write Unit Tests?', answer: 'You should know this by now', tags: 'unit test, whitebox, blackbox', author: 'Ruben', date: '2019-09-06T04:17:36.814Z', id: 1567311456814.3071}, { question: 'How do I create a Server in JavasScript?', answer: 'Check the examples in GitHub. ', tags: 'server, assign 2, java script', author: 'Dr.G', date: '2019-09-07T01:41:53.853Z', id: 1567820513853.8557}]
console.log(faq.filterQuestions(null, null, '2019-09-02T00:00:00.000Z', null)); // Expected: [{question: 'How do I write Unit Tests?', answer: 'You should know this by now', tags: 'unit test, whitebox, blackbox', author: 'Ruben', date: '2019-09-06T04:17:36.814Z', id: 1567311456814.3071}, { question: 'How do I create a Server in JavasScript?', answer: 'Check the examples in GitHub. ', tags: 'server, assign 2, java script', author: 'Dr.G', date: '2019-09-07T01:41:53.853Z', id: 1567820513853.8557}, {question: 'does it work?', answer: 'update by question id does', author: 'ty foster', tags: 'test, updated, self', id: {number}.{number}}]
console.log(faq.filterQuestions(null, null, null, '2019-09-02T00:00:00.00Z')); // Expected: everything in QA.json not returned by previous filter call