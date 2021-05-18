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
 * @param {string} num the maximum number of repositories to display
 */
function handleOptSelect(num) {
  maxRepos = (isNaN(num)) ? NaN : Number(num);
  renderTable();
}
