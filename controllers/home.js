const User = require('../models/user');

const HomeController = {
  Index: function(req, res) {
    res.render('home/index.hbs', { title: 'Avocodo' });
  },

  UserSignup: function(req, res) {
    res.render('home/signup.ejs', {});
  },

  Error: function(req, res) {
    res.render('error.hbs', {});
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
    res.render('home/signin.hbs', {});
  },

  Signin: function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}, function(err, user) {
      if(err) {
        return res.redirect('/error');
      }
      if(!user) {
        return res.render('home/signin.hbs', {message: 'Email does not exist'});
        }
      user.comparePassword(password, function (err, isMatch) {
        if (isMatch && isMatch == true) {
          req.session.user = user;
            if (user.reported === "true") {
              res.render('home/signin.hbs', {message: 'Your profile has been reported. You are no longer able to use this site.'});
            } else {return res.redirect('/')};
        } else {
          return res.render('home/signin.hbs', {message: 'Please use correct password'});
        }
    })
  });
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
