/*******************************************************************************
 * @file table.js
 * @version 2021.04.18
 * @author Ty Foster
 * SER 421, Arizona State University
 * Copyright 2021, All rights reserved.
 *
 * This file contains generic table methods
 */

/**
 * Creates a TableHeaderCell with the name `name`
 *
 * @param {string} name the name of the cell
 * @returns {HTMLTableHeaderCellElement} a cell with the appropriate name
 */
function _headerCell(name) {
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
function _header(names) {
  const theader = document.createElement('tr');
  for (const name of names) {
    theader.appendChild(_headerCell(name));
  }
  return theader;
}

/**
 * Creates a table row based on the data added
 *
 * @param {any[]} data the data to add to the table row
 * @param {boolean} isRepoTbl indicates if the table is a repository
 * table
 */
function _tableRow(data, isRepoTbl) {
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
