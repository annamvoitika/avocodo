const User = require('../models/user');

const HomeController = {
  Index: function(req, res) {
    res.render('home/index.hbs', { title: 'Avocodo' });
  },

  UserSignup: function(req, res) {
    res.render('home/signup.ejs', {});
  },

  Signup: function(req, res) {
    var user = new User(req.body);
    user.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/')
    });
  },

  UserSignin: function(req, res) {
    res.render('home/signin.ejs', {});
  },

  Signin: function(req, res) {
    User.findOne({
      email: req.body.email},
      function(user) {
        // if (err) { throw err; }
        if (user) {
          if (user.password === req.body.password) {
          var user = new User(req.email, req.name)
        } else { res.render('error.ejs')
      }
      } else { res.render('error.ejs')
    };
      res.status(201).redirect('/')
    });
  },

  Error: function(req, res) {
    res.render('error.ejs', {});

  }
};

module.exports = HomeController;
