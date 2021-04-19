/*******************************************************************************
 * @file page.js
 * @version 2021.04.18
 * @author Ty Foster
 * SER 421, Arizona State University
 * Copyright 2021, All rights reserved.
 *
 * This file contains methods to setup the page
 */

setupPg(); // runs setup function

/**
 * Sets up initial page elements
 */
function setupPg() {
  document.getElementById('uname-btn').addEventListener('click', () => {
    handleUnameBtn();
  });
}

/**
 * Determines the average open issues and the
 * maximum issue repo, displays on webpage
 *
 * @param {Array<Object>} data
 */
function _issueMsgs(data) {
  let sum = 0;
  let count = 0;
  let max = 0;
  let maxR = '';
  for (const repo of data) {
    sum += repo.open_issues_count;
    count++;
    if (repo.open_issues_count > max) {
      max = repo.open_issues_count;
      maxR = repo.name;
    }
  }
  const avg = sum / count;

  document.getElementById('issues').innerHTML = `The average number of issues is ${avg} and the repository with the maximum number of issues is ${maxR}`;
}
