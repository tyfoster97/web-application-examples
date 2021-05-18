/*******************************************************************************
 * @file branches-btn.js
 * @version 2021.04.18
 * @author Ty Foster
 * SER 421, Arizona State University
 * Copyright 2021, All rights reserved.
 *
 * This file contains methods to handle the refresh button being pressed
 */

/**
 * Handles the Branches button being clicked
 *
 * @param {string} repoName repository name
 */
function handleBranchesBtn(repoName) {
  renderBranchTable(repoName);
}
