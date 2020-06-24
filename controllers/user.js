const User = require('../models/user');

const UserController = {
  Index: function(req, res) {
    User.find(function(err, user) {
      if (err) { throw err; }

      res.render('user/index.hbs', { user: user });
    });
  },
  New: function(req, res) {
    res.render('user/new.hbs', {});
  },
  Create: function(req, res) {
    var user = new User(req.body);
    user.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/user');
    });
  },
  ViewProfile: function(req, res){
    User.find({_id: req.params._id}, function(err, user) {
      if (err) {
        throw err;
      }
      res.render('user/profile', { user: user});
    });
  }

}

module.exports = UserController;
