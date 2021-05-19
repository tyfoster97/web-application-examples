const { isVar } = require("../util/util");
const User = require("./user.model");
/**
 * @author Ty Foster
 * @version 2021.04.05
 * 
 * Copyright 2021, all rights reserved.
 * 
 */

/**
 * 
 * @param {*} id 
 * @param {*} q_id 
 * @param {*} answer 
 */
async function addAnswer(id, q_id, answer) {
  User.findById(id).lean()
    .then(async (user) => {
      user.question_answers.set(q_id, answer);
      user.currq++;
      await user.save();
    })
    .catch(err => {
      throw err;
    });
}

/**
 * 
 * @param {*} name 
 * @throws
 * @returns 
 */
async function addUser(name) {
  try {
    const u = new User({
      username: name,
      question_answers: new Map(),
      currq: 0,
      done: false
    });
    await u.save();

    return u._id;
  } catch (err) {
    throw err;
  }
}

/**
 * 
 * @param {*} id 
 * @param {*} name 
 * @throws
 */
async function remUser(id, name) {
  if (isVar(id)) {
    await User.findByIdAndDelete(id);
  } else if (isVar(name)) {
    await User.findOneAndDelete({username: name});
  } else {
    throw new Error('Must provide id or username of user');
  }
}

/**
 * 
 * @param {*} id 
 * @param {*} name 
 * @throws
 * @returns 
 */
async function getUser(id, name) {
  var user;
  if (isVar(id)) {
    user = await User.findById(id);
  } else if (isVar(name)) {
    user = await User.findOne({username: name});
  } else {
    throw new Error('Must provide id or username of user');
  }
  return user;
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
async function compareAnswers(id) {
  let user = await getUser(id, name);
  let matches = new Map();
  const finished_users = await User.find({done: true, _id: {$ne: user._id}}).lean(); // all users that are not user
  for (u in users) {
    matches.set(u.username, _compare(user.answers, u.answers));
  }
  return matches;
}

module.exports = {
  addAnswer,
  addUser,
  //getAnswer,
  getUser,
  remUser,
  compareAnswers
};

/**
 * Determines the number of common answers between to answer 
 * Maps
 * 
 * @param {Map} ans1 Map of question ids to answers
 * @param {Map} ans2 Map of question ids to answers
 * @returns {number} the number of answers that are the same
 */
function _compare(ans1, ans2) {
  let count = 0;
  let keys = ans1.keys();
  for (const key in keys) {
    if (ans1.get(key) === ans2.get(key)) {
      count++;
    }
  }
  return count;
}