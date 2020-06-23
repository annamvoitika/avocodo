var User = require('../models/user');

var UserController = {
  Index: function(req, res) {
    User.find(function(err, user) {
      if (err) { throw err; }

      res.render('user/index', { user: user });
    });
  },
  New: function(req, res) {
    res.render('user/new', {});
  },
  Create: function(req, res) {
    var user = new User(req.body);
    user.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/user');
    });
  },
  All: function(req, res) {
    res.render('user/all', {});
  },
}

module.exports = UserController;
