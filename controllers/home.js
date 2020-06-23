const User = require('../models/user');

const HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'Avocodo' });
  },

  UserSignup: function(req, res) {
    res.render('home/signup', {});
  },

  Signup: function(req, res) {
    var user = new User(req.body);
    user.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('home/index')
    });
  },

  UserSignin: function(req, res) {
    res.render('home/signin', {});
  },

  Signin: function(req, res) {

  }
};

module.exports = HomeController;
