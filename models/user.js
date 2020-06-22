var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  age: Number
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
