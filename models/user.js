var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  location: String,
  zodiac: String,
  breakfast: String,
  lunch: String,
  dinner: String,
  dessert: String,
  amdrink: String,
  pmdrink: String,
  guilty: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
