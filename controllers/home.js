const User = require('../models/user');

const HomeController = {
  Index: function(req, res) {
    res.render('home/index.hbs', { title: 'Avocodo' });
  },

  UserSignup: function(req, res) {
    res.render('home/signup.ejs', {});
  },

  Signup: async function(req, res) {
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
      return res.status(201).redirect('/')
    })
  },

  UserSignin: function(req, res) {
    res.render('home/signin.ejs', {});
  },

  Signin: function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email, password: password}, function(err, user) {
      if(err) {
        res.status(201).redirect('/error')
      }
      if(!user) {
        res.status(201).redirect('/error')
      }
      return res.status(201).redirect('/')
    })
  },

  Error: function(req, res) {
    res.render('error.ejs', {});
  }
};

module.exports = HomeController;
