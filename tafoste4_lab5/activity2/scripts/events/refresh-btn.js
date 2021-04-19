/*******************************************************************************
 * @file refresh-btn.js
 * @version 2021.04.18
 * @author Ty Foster
 * SER 421, Arizona State University
 * Copyright 2021, All rights reserved.
 *
 * This file contains methods to handle the refresh button press
 */

/**
 * Handles refresh button select
 */
function handleRefreshBtn() {
  document.getElementById('issues').innerHTML = '';
  document.getElementById('table').innerHTML = '';
  document.getElementById('controls').innerHTML = '';
  document.getElementById('branch-info').innerHTML = '';
  setupTable();
}
