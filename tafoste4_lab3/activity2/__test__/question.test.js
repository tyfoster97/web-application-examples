"use strict;"
const { addQuestion, remQuestion } = require("../util/question/question.methods");
const Question = require("../util/question/question.model");
const { connect, close, clean } = require("../util/util/db")

const seed = [
  {
    text: 'do you like to swim?',
    num: 0,
    answers: [
      'yes',
      'no'
    ]
  },
  {
    text: 'when do you go to sleep?',
    num: 1,
    answers: [
      'early evening',
      'before midnight',
      'before 2 am',
      'what is sleep?'
    ]
  }
];

beforeAll(async () => {
  await connect(null, 'ques-test');
});

afterEach(async () => {
  await clean();
});

afterAll(async () => {
  await close();
});

describe('Added when', () => {
  it('first question', async done => {
    const q_id = await addQuestion(seed[0].text, seed[0].answers);

    const question = await Question.findById(q_id).lean();

    expect(question.text).toEqual(seed[0].text);
    expect(question.num).toEqual(seed[0].num);
    expect(question.answers).toEqual(seed[0].answers);
    done();
  });

  it('second question', async done => {
    await addQuestion(seed[0].text, seed[0].answers);
    const q_id = await addQuestion(seed[1].text, seed[1].answers);

    const question = await Question.findById(q_id).lean();
    expect(question.text).toEqual(seed[1].text);
    expect(question.num).toEqual(seed[1].num);
    expect(question.answers).toEqual(seed[1].answers);
    done();
  });
});

describe('Errors thrown when', () => {
  it('text repeated', async done => {
    await addQuestion(seed[0].text, seed[0].answers);
    await expect(addQuestion(seed[0].text, seed[1].answers)).rejects.toThrow();
    done();
  });
});

describe('Numbers edited when', () => {
  it('First question removed', async done => {
    await addQuestion(seed[0].text, seed[0].answers);
    await addQuestion(seed[1].text, seed[1].answers);
    await addQuestion('Are you clean?', ['yes', 'no']);
    await remQuestion(null, 0, null);
    
    const question = await Question.findOne({num: 1}).lean();
    expect(question.text).toEqual('Are you clean?');
    done();
  });

  it('Middle question removed', async done => {
    await addQuestion(seed[0].text, seed[0].answers);
    await addQuestion(seed[1].text, seed[1].answers);
    await addQuestion('Are you clean?', ['yes', 'no']);
    await remQuestion(null, 1, null);

    const question = await Question.findOne({num: 1}).lean();
    expect(question.text).toEqual('Are you clean?');
    done();
  });
});