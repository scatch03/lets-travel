let mongoose = require('mongoose')
let Schema = mongoose.Schema

let callbackRequestSchema = new Schema({
  id: String,
  phoneNumber: String,
  date: Date
});

// specify collection for storing a model explicitly, otherwise mongoose will create new without hyphen
let CallbackRequest = mongoose.model('CallbackRequest', callbackRequestSchema, 'callback-requests');

module.exports = { CallbackRequest } // new JS syntax for when key and value are the same
