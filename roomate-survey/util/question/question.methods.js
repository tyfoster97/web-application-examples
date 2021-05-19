const Question = require("./question.model");
const { isVar } = require('../util/util');
/**
 * @author Ty Foster
 * @version 2021.04.05
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 * 
 * Contains utility methods for the Question collection in the database
 */

/**
 * 
 * @param {*} text 
 * @param {*} answers 
 * @throws
 * @returns 
 */
async function addQuestion(text, answers) {
  try {
    let num = await numQuestions();
    let q = new Question({
      text: text,
      answers: answers,
      num: num
    });
    await q.save();

    return q._id;
  } catch (err) {
    throw err;
  }
}

/**
 * 
 * @param {*} id 
 * @param {*} num 
 * @param {*} text 
 * @returns 
 */
async function getQuestion(id, num, text) {
  var question;
  if (isVar(id)) { // prefer id
    question = await Question.findById(id).lean();
  } else if (isVar(num)) { // then question number
    question = await Question.findOne({ num: num }).lean();
  } else if (isVar(text)) { // then question text
    question = await Question.findOne({ text: text }).lean();
  }
  return question;
}

/**
 * Obtains the full set of questions from the database
 * 
 * @returns the set of questions from the database
 */
async function getQuestions() {
  const questions = await Question.find().sort({ num: 1 }).lean(); // get all the questions in numerical order
  return questions || [];
}

/**
 * 
 * @returns 
 */
 async function numQuestions() {
  const num = await Question.countDocuments();
  return num || 0;
}

/**
 * 
 * @param {*} id 
 * @param {*} num 
 * @param {*} text 
 */
async function remQuestion(id, num, text) {
  let q;
  // remove question
  if (isVar(id)) { // prefer id
    q = await Question.findOneAndDelete({_id: id}).lean();
  } else if (isVar(num)) { // then question number
    q = await Question.findOneAndDelete({ num: num }).lean();
  } else if (isVar(text)) { // then question text
    q = await Question.findOneAndDelete({ text: text }).lean();
  }
  // fix question numbers
  await Question.updateMany({num: {$gt: q.num}}, {$inc: {num: -1}});
}

module.exports = {
  addQuestion,
  getQuestion,
  getQuestions,
  numQuestions,
  remQuestion
};
