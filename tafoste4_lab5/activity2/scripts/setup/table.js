/*******************************************************************************
 * @file table.js
 * @version 2021.04.18
 * @author Ty Foster
 * SER 421, Arizona State University
 * Copyright 2021, All rights reserved.
 *
 * This file contains methods to setup the table
 */

async function renderBranchTable() {
  document.getElementById('branch-table').innerHTML = '';
  const table = document.createElement('table');
  const names = [
    'Branch name', 'Branch sha', 'Branch url', 'Branch protected'
  ];
  table.appendChild(_theader(names));
  const user = document.getElementById('uname').value;
  const data = await getBranches(user, repoName);
  // display data
  _loadBranchData(table, data);
  document.getElementById('branch-table').appendChild(table);
}

function _repoTableHeader() {
  const table = document.createElement('table');
  table.id = 'repo-table';
  const names = [
    'Repo name', 'Created At', 'Updated At', 'Size', 'Forks', 'HTML URL', 'Language', 'Language URL', 'Branches'
  ];
  table.appendChild(_theader(names));
  return table;
}

function _renderRepoHeader() {
  if (document.getElementById('table').innerText !== '') {
    document.getElementById('table').innerHTML = '';
  }
  const table = _repoTableHeader();
  document.getElementById('table').appendChild(table);
}

async function renderTable() {
  _renderRepoHeader();
  // get data
  const repoData = await getRepos(document.getElementById('uname').value);
  // calulate averages and generate messages
  _issueMessage(repoData);
  for (let i = 0; i < 5; i++) {
    const data = _repoData(repoData.pop());
    document.getElementById('repo-table').appendChild(_tr(data, true));
  }
  _repoSelect(repoData);
  _refreshBtn();
}

/**
 * Sets up and displays branch table
 */
async function setupBranchTable(repoName) {
  
}

/**
 * Generates a list of repositories to display
 *
 * @param {Object[]} repoData the unlisted repositories
 */
async function _repoSelect(repoData) {
  //FIXME
  document.getElementById('repos').innerText = ''; // erase previous list
  // construct dropdown
  const dropdown = document.createElement('select');
  dropdown.id = 'dropdown';
  // default selected option
  const select = document.createElement('option');
  select.value = ''; select.innerHTML = 'Select repo';
  dropdown.appendChild(select);
  // append repos as children
  for (let i = 0; i < repoData.length && i < 5; i++) {
    const opt = document.createElement('option');
    opt.value = repoData[i].name;
    opt.innerHTML = repoData[i].name;
    dropdown.appendChild(opt);
  }
  // handle new selection
  dropdown.addEventListener('input', () => {
    const txt = dropdown.options[dropdown.selectedIndex].text;
    handleOptSelect(txt);
  });
  // store data in session storage
  window.sessionStorage.setItem('repos', JSON.stringify(repoData));
  // add to document
  document.getElementById('repos').appendChild(dropdown);
}

/**
 * Loads branch data into a table
 *
 * @param {HTMLTableElement} table the Table
 * @param {Array<Object>} data the Array of Branch Objects
 */
function _loadBranchData(table, data) {
  for (let i = 0; i < data.length && i < 30; i++) {
    const rowData = [];
    rowData.push(data[i].name);
    rowData.push(data[i].commit.sha);
    rowData.push(data[i].commit.url);
    rowData.push(data[i].protected);
    table.appendChild(_tr(rowData, false));
  }
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
 * Scrapes the data to display in the table from the
 * Repo Object
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
 * Creates a TableHeaderCell with the name `name`
 *
 * @param {string} name the name of the cell
 * @returns {HTMLTableHeaderCellElement} a cell with the appropriate name
 */
function _th(name) {
  const th = document.createElement('th');
  th.innerHTML = name;
  return th;
}

/**
 * Creates a TableRowElement for the header
 *
 * @param {string[]} names the names for the header cells
 * @returns {HTMLTableRowElement} the header row for the table
 */
function _theader(names) {
  const theader = document.createElement('tr');
  for (const name of names) {
    theader.appendChild(_th(name));
  }
  return theader;
}

/**
 * Creates a table row based on the data added
 *
 * @param {any[]} data the data to add to the table row
 */
function _tr(data, isRepoTbl) {
  const tr = document.createElement('tr');
  for (const item of data) {
    const td = document.createElement('td');
    td.innerHTML = item;
    tr.appendChild(td);
  }
  if (isRepoTbl) {
    const td = document.createElement('td');
    const btn = document.createElement('button');
    btn.innerHTML = 'Branches';
    btn.addEventListener('click', () => {
      handleBranchesBtn(data[0]); // pass name to function
    })
    td.appendChild(btn);
    tr.appendChild(td);
  }
  return tr;
}
