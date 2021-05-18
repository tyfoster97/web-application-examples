/*******************************************************************************
 * @file opt-select.js
 * @version 2021.04.18
 * @author Ty Foster
 * SER 421, Arizona State University
 * Copyright 2021, All rights reserved.
 *
 * This file contains methods to handle the selection of a dropdown option
 */

/**
 * Handles displaying the selected repo option
 *
 * @param {string} repoName the name of the repo to display
 */
function handleOptSelect(repoName) {
  //TODO implement
  if (document.getElementById('opt-row')) {
    document.getElementById('opt-row').remove();
  }
  const repos = JSON.parse(window.sessionStorage.getItem('repos'));
  let repo = null;
  for (let i = 0; i < repos.length && repo === null; i++) {
    if (repos[i].name === repoName) {
      repo = repos.splice(i, 1)[0];
    }
  }
  if (repo) {
    // save sesssion data
    const opt_repo = JSON.parse(window.sessionStorage.getItem('opt-repo'));
    if (opt_repo) repos.push(opt_repo);
    window.sessionStorage.setItem('opt-repo', JSON.stringify(repo));
    window.sessionStorage.setItem('repos', JSON.stringify(repos));
    // display data in sixth
    const repoData = _repoData(repo);
    const tbl = document.getElementById('repo-table');
    const tr = _tr(repoData, true);
    tr.id = 'opt-row';
    tbl.appendChild(tr);
    // update dropdown
    _repoSelect(repos);
  }
}
