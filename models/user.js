const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date: {type: Date, default: Date.now},
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

const User = mongoose.model('User', UserSchema);

module.exports = User;
