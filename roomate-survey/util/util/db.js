const mongoose = require('mongoose');
/**
 * @author Ty Foster
 * @version 2021.04.05
 * 
 * Copyright 2021, all rights reserved.
 * 
 * Contains generic utility functions 
 */

async function connect(server, name) {
  server = server || 'localhost:27017';
  name = name || 'roomate-finder';
  await mongoose.connect(`mongodb://${server}/${name}`, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 10
  });
}

async function close() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
}

async function clean() {
  for (const key in mongoose.connection.collections) {
    await mongoose.connection.collections[key].deleteMany();
  }
}

module.exports = {
  connect,
  close,
  clean
};
