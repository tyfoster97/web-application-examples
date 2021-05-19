/**
 * @file commands.js
 * @version 2021.04.10
 * @author Ty Foster
 * 
 * Utility functions for handling commands
 */

/**
 * Resets application to initial state
 */
function clear() {
  sessionStorage.clear();
  localStorage.removeItem('uname');
  localStorage.removeItem('comments');
  localStorage.removeItem('dict');
  document.getElementById(rev_id).remove();
  document.getElementById('u_name').value = '';
}

/**
 * Displays the total count of rude words in text area
 */
function count() {
  const ta = document.getElementById(ta_id);
  ta.value = sessionStorage.getItem('rude_count') || 0;
}

/**
 * Displays the search history below the text area
 */
function history() {
  const history = JSON.parse(sessionStorage.getItem('history') || '[]');
  const rev = document.getElementById(rev_id)
  const p = document.createElement('p');
  for (let i = 0; i < history.length; i++) {
    const p_text = document.createTextNode(`${i + 1}. ${history[i]}`);
    p.appendChild(p_text);
    p.appendChild(_br());
  }
  rev.appendChild(p);
}

/**
 * Lists the users actual and censored comments below the
 * text area
 */
function list() {
  const div = document.getElementById(rev_id);
  const p = document.createElement('p');
  const actual = JSON.parse(sessionStorage.getItem('uncensored') || '[]');
  const censored = JSON.parse(sessionStorage.getItem('comments') || '[]');
  for (let i = 0; i < actual.length; i++) {
    let p_text = document.createTextNode(`${i+1}.`);
    p.appendChild(p_text);
    p.appendChild(_br());
    p_text = document.createTextNode(`Actual: ${actual[i]}`);
    p.appendChild(p_text);
    p.appendChild(_br());
    p_text = document.createTextNode(`Censored: ${censored[i]}`);
    p.appendChild(p_text);
    p.appendChild(_br());
    p.appendChild(_br());
  }
  div.appendChild(p);
}

/**
 * Searches for a key in the Dictionary and returns all 
 * possible answers
 * 
 * @param {string} key the key
 */
function search(key) {
  const history = JSON.parse(sessionStorage.getItem('history') || '[]');
  history.push(key);
  sessionStorage.setItem('history', JSON.stringify(history));
  const ta = document.getElementById(ta_id);
  const entry = Dictionary._entry(key);
  const ans = (entry) ? entry.answer.join(', ') : '';
  ta.value = ans;
}