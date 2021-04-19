/*******************************************************************************
 * @file table.js
 * @version 2021.04.18
 * @author Ty Foster
 * SER 421, Arizona State University
 * Copyright 2021, All rights reserved.
 *
 * This file contains methods to setup the table
 */

/**
 * Sets up repo data table
 */
function setupTable() {
  // generate table and header row
  document.getElementById('table').innerHTML = '';
  const table = document.createElement('table');
  table.id = 'result-table';
  const names = [
    'Repo name', 'Created At', 'Updated At', 'Size', 'Forks', 'HTML URL', 'Language', 'Language URL', 'Downloads', 'Branches'
  ]
  table.appendChild(_theader(names)); // appead header row
  document.getElementById('table').appendChild(table);

  // display data
  _loadRepoData();
}

/**
 * Sets up and displays branch table
 */
async function setupBranchTable(repoName) {
  document.getElementById('branch-info').innerHTML = '';
  const table = document.createElement('table');
  const names = [
    'Branch name', 'Branch sha', 'Branch url', 'Branch protected'
  ];
  table.appendChild(_theader(names));
  const user = document.getElementById('uname').value;
  const data = await getBranches(user, repoName);
  // display data
  _loadBranchData(table, data);
  document.getElementById('branch-info').appendChild(table);
}

/**
 * Generates a list of repositories to display
 *
 * @param {Object[]} repoData the unlisted repositories
 */
function _dropDown(repoData) {
  document.getElementById('controls').innerHTML = '';
  const dropdown = document.createElement('select');
  dropdown.id = 'dropdown';
  const blank = document.createElement('option');
  blank.value = ''; blank.innerHTML = 'Select repo';
  dropdown.appendChild(blank);
  for (let i = 0; i < repoData.length && i < 5; i++) {
    const opt = document.createElement('option');
    opt.value = repoData[i].name;
    opt.innerHTML = repoData[i].name;
    dropdown.appendChild(opt);
  }
  dropdown.addEventListener('input', () => {
    const txt = dropdown.options[dropdown.selectedIndex].text;
    handleOptSelect(txt);
  });
  window.sessionStorage.setItem('repos', JSON.stringify(repoData)); // for ease of access
  document.getElementById('controls').appendChild(dropdown);
  _refreshBtn();
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
 * Loads the repo data into the page
 */
async function _loadRepoData() {
  // get data
  const repoData = await getRepos(document.getElementById('uname').value);
  // calulate averages and generate messages
  _issueMsgs(repoData);
  // select 2 elements
  const r1Data = _repoData(repoData.pop());
  const r2Data = _repoData(repoData.pop());
  // add data to table
  document.getElementById('result-table').appendChild(_tr(r1Data, true));
  document.getElementById('result-table').appendChild(_tr(r2Data, true));
  // make dropdown and refresh button
  _dropDown(repoData);
}

/**
 * Creates and adds the refresh button to the page
 */
function _refreshBtn() {
  const btn = document.createElement('button');
  btn.addEventListener('click', () => {
    handleRefreshBtn();
  });
  btn.id = 'refresh'
  btn.innerHTML = 'Refresh';
  document.getElementById('controls').appendChild(btn);
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
  data.push(repo.downloads_url || 'None');
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
  for(const name of names) {
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
