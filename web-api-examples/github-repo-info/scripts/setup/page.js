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
let maxRepos = 'all';

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
function _issueMessage(data) {
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

/**
 * Creates and adds the refresh button to the page
 */
function _refreshBtn() {
  if (document.getElementById('refresh-btn').innerText !== '') {
    document.getElementById('refresh-btn').innerHTML = '';
  }
  const btn = document.createElement('button');
  btn.addEventListener('click', () => {
    handleRefreshBtn();
  });
  btn.id = 'refresh'
  btn.innerHTML = 'Refresh';
  document.getElementById('refresh-btn').appendChild(btn);
}

/**
 * Generates list of the number of repositories to display
 */
 async function _numReposSelect() {
  document.getElementById('num-repos').innerHTML = ''; // erase previous list
  // construct dropdown
  const select = document.createElement('select');
  select.id = 'repo-select';
  // default selected option
  const option = document.createElement('option');
  option.value = ''; option.innerHTML = 'Select maximum to display';
  select.appendChild(option);
  // append 5-25 as children
  for (let i = 0; i < 5; i++) {
    const opt = document.createElement('option');
    opt.value = (i+1) * 5;
    opt.innerHTML = (i+1) * 5;
    select.appendChild(opt);
  }
  const opt = document.createElement('option');
  opt.value = 'All';
  opt.innerHTML = 'All';
  select.appendChild(opt);
  // handle new selection
  select.addEventListener('input', () => {
    const txt = select.options[select.selectedIndex].text;
    handleOptSelect(txt);
  });
  // add to document
  document.getElementById('num-repos').appendChild(select);
}
