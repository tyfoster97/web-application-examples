/**
 * @file activity1.js
 * @version 2021.04.08
 * @author Ty Foster
 * SER 421, Arizona Stae University
 * Copyright 2021, All rights reserved.
 * 
 * Demonstrates DOM manipulation with JavaScript
 * @WARN MUST BE RUN IN BROWSER CONSOLE
 */
/**
 * @task Output to the console the <ol> element encompassing the results of the search
 */
document.getElementsByTagName('ol')[0];

/**
 * @task Output to the console the code for the "onload" event on the <body> element
 */
document.body.onload;

/**
 * @task Output to the console the second child node underneath the <body> element
 */
document.body.firstChild.nextSibling;

/**
 * @task Output to the console the number of <h2> tags in the page
 */
document.getElementsByTagName('h2').length;

/**
 * @task Output to the console the value in the search bar (must be from search bar)
 */
document.getElementsByTagName('input')[0].value;

/**
 * @task Make the "Add Bing New Tab Extension" text in the upper right corner result go away
 */
//NOTE: Text is not present on web page