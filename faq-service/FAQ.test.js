const { deleteQuestion, filterDatabase, addQuestion, updateQuestion } = require("./FAQ");
/**
 * @author Ty Foster
 * @version 2021.03.28
 * 
 * Copyright 2021, all rights reserved.
 * 
 * Tests FAQ.js
 */

console.log('TESTING FAQ');

console.log('deleteQuestion');
deleteQuestion(null, 'does it work?');
console.log(filterDatabase('ty foster', null, null, null)); //EXPECTED: []

console.log('\naddQuestion');
addQuestion('does it work?', 'maybe', 'ty foster', 'test, self');
console.log(filterDatabase('ty foster', null, null, null)); //EXPECTED: [{question: 'does it work?', answer: 'maybe', author: 'ty foster', tags: 'test, self', id: {number}.{number}}]

console.log('\nupdateQuestion: answer');
updateQuestion(null, 'does it work?', 'yes', null, null);
console.log(filterDatabase('ty foster', null, null, null));//EXPECTED: [{question: 'does it work?', answer: 'yes', author: 'ty foster', tags: 'test, self', id: {number}.{number}}]

console.log('updateQuestion: tags');
updateQuestion(null, 'does it work?', null, null, 'test, updated, self');
console.log(filterDatabase('ty foster', null, null, null));//EXPECTED: [{question: 'does it work?', answer: 'yes', author: 'ty foster', tags: 'test, updated, self', id: {number}.{number}}]

console.log('updateQuestion: author');
updateQuestion(null, 'does it work?', null, 'tim tester', '');
console.log(filterDatabase('tim tester', null, null, null));//EXPECTED: [{question: 'does it work?', answer: 'yes', author: 'tim tester', tags: 'test, updated, self', id: {number}.{number}}]
let obj = filterDatabase('tim tester')[0];

console.log('updateQuestion: question');
updateQuestion(obj.id, 'does the program work?', null, '', '');
console.log(filterDatabase('tim tester', null, null, null));//EXPECTED: [{question: 'does the program work?', answer: 'yes', author: 'tim tester', tags: 'test, updated, self', id: {number}.{number}}]

console.log('\nfilterDatabase: tags');
console.log(filterDatabase(null, 'test, xyz', null, null)); //EXPECTED: [{question: "How do I write Unit Tests?", answer: "You should know this by now", tags: "unit test, whitebox, blackbox", author: "Ruben", date: "2019-09-06T04:17:36.814Z", id: 1567311456814.3071}, {question: "How do I implement xyz?", answer: "Very carefully.", tags: "implement, xyz", author: "Dr.G", date: "2019-07-10T04:18:55.079Z", id: 1567311535079.3115}, {question: 'does the program work?', answer: 'yes', author: 'tim tester', tags: 'test, updated, self', id: {number}.{number}}]


console.log('filterDatabase: dateRange');
console.log(filterDatabase(null, null, '2019-09-02T00:00:00.000Z', '2020-01-01T00:00:00.000Z')); //EXPECTED: [{question: 'How do I write Unit Tests?', answer: 'You should know this by now', tags: 'unit test, whitebox, blackbox', author: 'Ruben', date: '2019-09-06T04:17:36.814Z', id: 1567311456814.3071}, { question: 'How do I create a Server in JavasScript?', answer: 'Check the examples in GitHub. ', tags: 'server, assign 2, java script', author: 'Dr.G', date: '2019-09-07T01:41:53.853Z', id: 1567820513853.8557}]

deleteQuestion(null, 'does it work?');
deleteQuestion(null, 'does the program work?');