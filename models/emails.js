let mongoose = require('mongoose')
let Schema = mongoose.Schema

let emailSchema = new Schema({
  id: String,
  name: String,
  email: String,
  message: String,
  date: Date
});

// specify collection for storing a model explicitly, otherwise mongoose will create new without hyphen
let Email = mongoose.model('Email', emailSchema, 'emails');

module.exports = { Email } // new JS syntax for when key and value are the same
