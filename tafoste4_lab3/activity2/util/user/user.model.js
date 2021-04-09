const { model, Schema, SchemaTypes } = require("mongoose");
/**
 * @author Ty Foster
 * @version 2021.04.05
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 * 
 * Contains the model definition for a user in the database
 */

const USchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  question_answers: {
    type: SchemaTypes.Map,
    required: true
  },
  currq: {
    type: Number
  },
  done: {
    type: Boolean,
    required: true
  }
});

module.exports = model('User', USchema);