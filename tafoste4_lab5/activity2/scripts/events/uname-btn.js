/*******************************************************************************
 * @file uname-btn.js
 * @version 2021.04.18
 * @author Ty Foster
 * SER 421, Arizona State University
 * Copyright 2021, All rights reserved.
 *
 * This file contains methods to handle the Search button press for the GitHub
 * username
 */

/**
 * Handles username button being selected
 */
function handleUnameBtn() {
  setupTable();
  document.getElementById('branch-info').innerHTML = '';
}
