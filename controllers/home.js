const User = require('../models/user');

const HomeController = {
  Index: function(req, res) {
    res.render('home/index.hbs', { title: 'Avocodo' });
  },

  UserSignup: function(req, res) {
    res.render('home/signup.ejs', {});
  },

  Signup: async function(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const {
        name,
        email,
        password
      } = req.body;

      var user = new User({
        name,
        email,
        hashedPassword
      });
      user.save({
      });
      res.redirect('/signin');
    } catch {
      //change to redirect to same page if know its working
      res.redirect('/error');
    }
  },
    // var user = new User(req.body);
    // user.save(function(err) {
    //   if (err) { throw err; }
    //
    //   res.status(201).redirect('/')
    // });

  UserSignin: function(req, res) {
    res.render('home/signin.ejs', {});
  },

  Signin: function(req, res) {
    User.findOne(
      { email: 'req.body.email' },
      { password: 'req.body.password' },
      function(user) {
        if (user) { res.status(201).redirect('/')
        } else { res.status(201).redirect('/error')
      }
    })
    },

  Error: function(req, res) {
    res.render('error.ejs', {});
  }
};

module.exports = HomeController;
