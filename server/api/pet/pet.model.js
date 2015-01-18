'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PetSchema = new Schema({
  name: String,
  type: String,
  color: String,
  addressFound: String,
  dateFound: String,
  foundBy: String,
  finderContact: String,
  finder: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Pet', PetSchema);