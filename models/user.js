var mongoose = require('mongoose');
var bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
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
  matches: [mongoose.Schema.Types.ObjectId],
});

UserSchema.pre('save', function (next) {
  var user = this;

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

var User = mongoose.model('User', UserSchema);

module.exports = User;
