const User = require('../models/user');
// const session = require('express-session');

const HomeController = {
  Index: function(req, res) {
    res.render('home/index.hbs', { title: 'Avocodo' });
  },

  UserSignup: function(req, res) {
    res.render('home/signup.ejs', {});
  },

  Error: function(req, res) {
    res.render('error', {});
  },

  Signup: function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.save(function(err, savedUser) {
      if(err) {
        res.status(201).redirect('/error')
      }
      return res.status(201).redirect('/signin')
    })
  },

  UserSignin: function(req, res) {
    res.render('home/signin.ejs', {});
  },

  Signin: function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}, function(err, user) {
      if(err) {
        return res.redirect('/error');
      }
      if(!user) {
        return res.redirect('/error');
      }

      user.comparePassword(password, function (err, isMatch) {
        if (isMatch && isMatch == true) {
            req.session.user = user;
            return res.redirect('/');
        } else {
            // return res.status(401).send();
            return res.redirect('/error');
        }
      });
    })
  },

  Logout: function(req, res) {
    req.session.destroy();
    return res.redirect('/signin')
  },

  CheckAuthenticated: function(req, res, next) {
    if(!req.session.user) {
      return res.redirect('/error');
    }
    return next();
  },

  CheckLoggedIn: function(req, res, next) {
    if(req.session.user) {
      return res.redirect('/');
    }
    return next();
  },
};

module.exports = HomeController;
