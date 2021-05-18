/*******************************************************************************
 * @file branch-table.js
 * @version 2021.05.18
 * @author Ty Foster
 * Copyright 2021, All rights reserved.
 *
 * This file contains methods to setup the branch table for a repository
 */

async function renderBranchTable(repoName) {
  document.getElementById('branch-table').innerHTML = '';
  const table = document.createElement('table');
  const names = [
    'Branch name', 'Branch sha', 'Branch url', 'Branch protected'
  ];
  table.appendChild(_header(names));
  const user = document.getElementById('uname').value;
  const data = await getBranches(user, repoName);
  // display data
  _loadBranchData(table, data);
  document.getElementById('branch-table').appendChild(table);
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
    table.appendChild(_tableRow(rowData, false));
  }
}