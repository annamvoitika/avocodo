const mongoose = require('mongoose');
const bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  avatar: String,
  name: String,
  age: Number,
  email: String,
  password: String,
  location: String,
  zodiac: String,
  breakfast: String,
  lunch: String,
  dinner: String,
  dessert: String,
  amdrink: String,
  pmdrink: String,
  guilty: String,
  reported: String,
  matches: [mongoose.Schema.Types.ObjectId],
  usersuggestedmatches: [mongoose.Schema.Types.ObjectId],
  matchsuggestedmatches: [mongoose.Schema.Types.ObjectId],
});

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(undefined, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
