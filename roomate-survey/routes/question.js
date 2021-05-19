var express = require('express');
const { getQuestion, numQuestions } = require('../util/question/question.methods');
const { addAnswer } = require('../util/user/user.methods');
const { connect } = require('../util/util/db');
var router = express.Router();

router.get('/:id/:orient?', async function (req, res, next) {
  await connect();
  if (req.params.orient) {
    req.session.orient = req.params.orient;
  }
  let other_orient = (req.session.orient === 'v') ? 'h' : 'v';
  let q = await getQuestion(null, req.params.id);
  res.render('question', {text: q.text, answers: q.answers, orient: req.session.orient || 'h', other_orient: other_orient, current: q.num});
});

router.post('/', async function(req, res, next) {
  await connect();
  // save current answer
  console.log(req.body.qid);
  let q_id = (await getQuestion(null, req.body.qid, null))._id;
  console.log(req.body.answer);
  await addAnswer(req.session.user, q_id, req.body.answer)
  let id = req.body.qid;
  if (req.body.prev) {
    if (id > 0) {
      id--;
    }
    
  } else if (req.body.next) {
    if (id < numQuestions()) {
      id++;
    } else {
      //TODO redirect to matches
    }
  }
  res.redirect(`/${id}/${req.session.orient}`);
});

module.exports = router;