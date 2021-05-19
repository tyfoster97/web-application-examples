const mongoose = require('mongoose');
/*******************************************************************************
 * @file db.js
 * @version 2021.04.16
 * @author Ty Foster
 * 
 * Copyright 2021, all rights reserved.
 *
 * Contains functions for interacting with a database
 */

const DBINFO = {
  host: 'localhost',
  port: '27017',
  name: 'cc-history'
};

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
  path = path || `mongodb://${DBINFO.host}:${DBINFO.port}`;
  name = name || `${DBINFO.name}`;
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
