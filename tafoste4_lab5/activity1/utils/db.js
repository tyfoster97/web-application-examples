const mongoose = require('mongoose');
/*******************************************************************************
 * @file db.js
 * @version 2021.04.16
 * @author Ty Foster
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 *
 * Contains functions for interacting with a database
 */

/***********************************************************
 * Connects to the specified database
 *
 * @param {string} path the uri to the database
 * @param {string} name the name of the database
 */
async function connect(path, name) {
  const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  };
  path = path || 'mongodb://localhost:27017';
  name = name || 'test';
  uri = `${path}/${name}?retryWrites=true&w=majority`;

  await mongoose.connect(uri, options);
}

/***********************************************************
 * Closes the default collection
 */
async function close() {
  await mongoose.connection.close();
}

/***********************************************************
 * Closes and deletes the default connection
 */
async function closeAndDelete() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

/***********************************************************
 * Cleans the default connection
 */
async function clean() {
  for (const key in mongoose.connection.collections) {
    await mongoose.connection.collections[key].deleteMany({});
  }
}

module.exports = {
  connect,
  clean,
  close,
  closeAndDelete
};
