/*******************************************************************************
 * @file repo-table.js
 * @version 2021.05.18
 * @author Ty Foster
 * Copyright 2021, All rights reserved.
 *
 * This file contains methods to setup the repository table
 */

/**
 * Renders the repository table
 */
async function renderTable() {
  _renderRepoHeader();
  // get data
  const repoData = await getRepos(document.getElementById('uname').value);
  // calulate averages and generate messages
  _issueMessage(repoData);
  const n = (isNaN(maxRepos)) ? repoData.length : maxRepos;
  for (let i = 0; i < n && repoData.length > 0; i++) {
    const data = _repoData(repoData.pop());
    document.getElementById('repo-table').appendChild(_tableRow(data, true));
  }
  _numReposSelect();
  _refreshBtn();
}

/**
 * Renders the repository table header
 */
function _renderRepoHeader() {
  if (document.getElementById('table').innerText !== '') {
    document.getElementById('table').innerHTML = '';
  }
  const table = _repoTableHeader();
  document.getElementById('table').appendChild(table);
}

/**
 * Scrapes the data to display in the table from the
 * Repo Object returned from the fetch request
 *
 * @param {Object} repo the repo to scrape
 * @returns the repo data for the table
 */
function _repoData(repo) {
  const data = [];
  data.push(repo.name);
  data.push(repo.created_at);
  data.push(repo.updated_at);
  data.push(repo.size);
  data.push(repo.forks);
  data.push(repo.html_url);
  data.push(repo.language);
  data.push(repo.languages_url);
  return data;
}

/**
 * Generates the Repo table header
 * 
 * @returns the repository table header
 */
function _repoTableHeader() {
  const table = document.createElement('table');
  table.id = 'repo-table';
  const names = [
    'Repo name', 'Created At', 'Updated At', 'Size', 'Forks', 'HTML URL', 'Language', 'Language URL', 'Branches'
  ];
  table.appendChild(_header(names));
  return table;
}
