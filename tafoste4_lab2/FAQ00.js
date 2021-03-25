const fs = require('fs');
const { varCheck, genID } = require('./util');
/**
 * @author Ty Foster
 * @version 2021.03.24
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 * 
 * CONTRAINTS
 * 1. Prevent concurrent read/write problems
 * 2. Q&A has question, answer, tags, author, date, and id
 * 3. Persistent store must be in QA.json 
 */
class FAQ {
  constructor() {
    //TODO

    /**
     * Adds a question to the existing persistent store
     * 
     * @param {string} ques the frequently asked question
     * @param {string} ans answer to the question
     * @param {string} auth the author of the answer
     * @param {Array<string>} tags an array of tags associated with the question
     */
    this.addQuestion = (ques, ans, auth, tags) => {
      if (varCheck(ques) && varCheck(ans) && varCheck(auth) && varCheck(tags)) {
      // Ensures that no null variables are passed to the database store
        qObj = {
          question: ques, 
          answer: ans, 
          author: auth, 
          tags: tags, 
          date: new Date()., 
          id: genID()
        };

      }
    };
  }
  //TODO: write Q&A to persistent store

  //TODO: update answers to an existing Q&A

  //TODO: update tags to an existing Q&A
  
  //TODO: ability to delete an existing Q&A

  //TODO: ability to return collection of Q&As based on filters: (author, date range, tags)
}