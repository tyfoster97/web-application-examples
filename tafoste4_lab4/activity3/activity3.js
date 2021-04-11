/**
 * @file activity3.js
 * @version 2021.04.10
 * @author Ty Foster
 * 
 * Contains functions for manipulating content on the single page application
 */

/**
 * Handles initial page setup
 */
function setup() {
  // add onclick listener to submit name button
  document.getElementById('btn_uname').onclick = submitName;
  // check if user has previously logged in
  _hasVisited();
  // set timeout
  window.setTimeout(_idleMsg, 30 * 1000); // 30s timeout
}

/**
 * Handles submitting a content from the text area
 */
function submitComment() {

}

/**
 * Handles submitting the username
 */
function submitName() {
  const uname = document.getElementById('u_name').value; // get
  window.localStorage.setItem('uname', uname); // store
  _welcomeMsg(uname); // display welcome message
}

/**
 * Determines if the user has visited and handles
 * restoring the previous state for the user
 */
function _hasVisited() {

}

/**
 * Handles displaying an idle message to the user
 */
function _idleMsg() {

}

/**
 * Handles displaying the review section
 * 
 * @param div the div for the review section
 */
function _reviewSection(div) {

}

/**
 * Handles displaying the welcome message to the user
 * 
 * @param uname the user's name
 */
const rev_id = 'reviews'; // for refactorability
function _welcomeMsg(uname) {
  // remove div if it exists on the page
  try {
    document.getElementById(rev_id).remove();
  } catch (err) {
    // do nothing
  }
  // make div
  const div = document.createElement('div');
  div.id = rev_id;
  // make message nodes
  const p = document.createElement('p');
  const msg = document.createTextNode(
    `${uname} Welcome to the movie review System! Please enter your comments about the movie`
  );
  // append nodes
  p.appendChild(msg);
  div.appendChild(p);
  document.body.appendChild(div);
  // display reviews section
  _reviewSection(div);
}