const fs = require('fs');
const util = require('./util');
const qStore = './QA.json'; // improves refactorability
/**
 * @author Ty Foster
 * @version 2021.03.25
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
    /**
     * Adds a question to the existing persistent store
     * 
     * @param {string} ques the frequently asked question
     * @param {string} ans answer to the question
     * @param {string} auth the author of the answer
     * @param {string} tags a set of comma delimeted 
     * tags associated with the question
     */
    this.addQuestion = (ques, ans, auth, tags) => {
      if (util.varCheck(ques) 
        && util.varCheck(ans) 
        && util.varCheck(auth) 
        && util.varCheck(tags)
      ) {
      // Ensures that no null variables are passed to the database store
        let qObj = {
          question: ques,
          answer: ans,
          author: auth,
          tags: tags,
          date: new Date(), // converted to string by JSON.stringify()
          id: util.genID() // ensures unique id
        }; // constructs object before adding to store

        let fd = fs.openSync(qStore, 'r+'); // lock file

        let qArr = util.getQArr(qStore);
        if (util.getIdx(qArr, null, ques) == -1) {
        // only add question if it is not in the store
          qArr.push(qObj); // adds new qArr
          util.writeQArr(qStore, qArr);
        }

        fs.closeSync(fd); // unlock file
      }
    };

    /**
     * Modifies the answer to an existing Q&A
     * 
     * @param {string} newAns text for the new answer for the specified question
     * @param {number} id the `id` for the question to modify, if none is provided
     * then `ques` is used to find the question in the data store instead
     * @param {string} ques the question string of the question to modify, used if
     * no `id` is provided
     */
    this.updateQuestion = (newAns, id, ques) => {
      if (util.varCheck(newAns) 
        && (util.varCheck(id) || util.varCheck(ques))
      ) {
      // ensures that at least 2 of the necessary variables have been
      // passed to the function
        let fd = fs.openSync(qStore, 'r+'); // lock file

        let qArr = util.getQArr(qStore);
        let i = util.getIdx(qArr, id, ques);
        if (i >= 0) {
        // checks that the question was found
          qArr[i].answer = newAns;
          util.writeQArr(qStore, qArr); // only writes out qArr if modified
        }

        fs.closeSync(fd); // unlock file
      }
    };

    /**
     * Updates the tags of an existing Q&A object
     * 
     * @param {string} tags the set of comma delimited tags to set as the tags
     * for the specified Q&A object
     * @param {number} id the `id` for the question to modify, if none is provided
     * then `ques` is used to find the question in the data store instead
     * @param {string} ques the question string of the question to modify, used if
     * no `id` is provided
     */
    this.updateTags = (tags, id, ques) => {
      if (util.varCheck(tags) 
        && (util.varCheck(id) || util.varCheck(ques))
      ) {
      // ensures that at least 2 of the necessary variables have been
      // passed to the function
        let fd = fs.openSync(qStore, 'r+'); // lock file

        let qArr = util.getQArr(qStore);
        let i = util.getIdx(qArr, id, ques);
        if (i >= 0) {
        // checks that the question was found
            qArr[i].tags = tags;
            util.writeQArr(qStore, qArr); // only writes out qArr if modified
        }

        fs.closeSync(fd); // unlock file
      }
    };

    /**
     * Deletes the specified question if found
     * @note if no `id` is provided then `ques` is used as the
     * identifier for the Q&A Object
     * 
     * @param {number} id the `id` of the Q&A Object to delete
     * @param {string} ques the `question` of the Q&A Object to delete
     */
    this.deleteQuestion = (id, ques) => {
      if (util.varCheck(id) 
        || util.varCheck(ques)
      ) {
      // ensures 1 of 2 needed parameters is passed to the function
        let fd = fs.openSync(qStore, 'r+'); // lock file

        let qArr = util.getQArr(qStore);
        let i = util.getIdx(qArr, id, ques);
        if (i >= 0) {
        // checks that question was found
          qArr.splice(i, 1); // remove question
          util.writeQArr(qStore, qArr); // only writes if modified
        }

        fs.closeSync(fd);
      }
    };

    /**
     * Filters Q&A Objects by author, tags, and/or a date range
     * 
     * @param {string} author the `author` to match in the Q&A Objects
     * @param {string} tags the `tags` to match in the Q&A Objects
     * @param {string} startDate an ISO date string to compare against
     * `date` in the Q&A Objects
     * @param {string} endDate an ISO date string to compare against
     * `date` in the Q&A Objects
     * @returns {Array<Object>} the set of filtered Q&A Objects
     */
    this.filterQuestions = (author, tags, startDate, endDate) => {
      let fd = fs.openSync(qStore, 'r'); // lock file
      
      let qArr = util.getQArr(qStore);

      // filter by author
      if (util.varCheck(author)) {
        qArr = qArr.filter(
          (qObj) => qObj.author == author
        );
      }

      // filter by tags
      if (util.varCheck(tags)) {
        let tagArr = tags.split(/,\s+/);
        qArr = qArr.filter((qObj) => util.tagMatch(qObj, tagArr)
        )
      }

      // filter by date range
      if (util.varCheck(startDate) || util.varCheck(endDate)) {
        qArr = qArr.filter(
          (qObj) => util.betweenDates(qObj.date, startDate, endDate)
        );
      }

      return qArr;
    }
  }
};

module.exports = { FAQ };