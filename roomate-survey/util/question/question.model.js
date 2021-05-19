const { model, Schema, SchemaTypes } = require("mongoose");
/**
 * @author Ty Foster
 * @version 2021.04.05
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 * 
 * Contains utility methods for the Question collection in the database
 */

const QSchema = new Schema({
  text: {
    type: String,
    required: true,
    unique: true
  },
  answers: {
    type: SchemaTypes.Array,
    required: true
  },
  num: {
    type: Number,
    required: true,
    unique: true
  }
});

module.exports = model('Question', QSchema);