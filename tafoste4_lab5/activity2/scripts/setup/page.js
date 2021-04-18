/*******************************************************************************
 * @file page.js
 * @version 2021.04.18
 * @author Ty Foster
 * SER 421, Arizona State University
 * Copyright 2021, All rights reserved.
 *
 * This file contains methods to setup the page
 */

setupPg(); // runs setup function

/**
 * Sets up initial page elements
 */
function setupPg() {
  document.getElementById('uname-btn').addEventListener('click', () => {
    handleUnameBtn();
  });
}
