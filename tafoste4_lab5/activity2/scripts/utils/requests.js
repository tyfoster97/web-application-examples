/**
 * @file requests.js
 * @version 2021.04.18
 * @author Ty Foster
 * SER 421, Arizona State University
 * Copyright 2021, All rights reserved.
 *
 * Handles fetch requests
 */

/**
 * Gets repo data for the user
 *
 * @param {string} uname GitHub username
 * @returns {Array<Object>} the collection of all pulbic
 * repositories for the user
 */
async function getRepos(uname) {
  const resp = await fetch(`https://api.github.com/users/${uname}/repos`);
  const data = await resp.json();
  return data;
}
