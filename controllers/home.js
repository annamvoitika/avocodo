const User = require('../models/user');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
require('dotenv').config();

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
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const handlebarOptions = {
    viewEngine: {
      extName: '.hbs',
      partialsDir: './views/',
      layoutsDir: './views/',
      defaultLayout: 'email.hbs',
    },
    viewPath: './views/',
    extName: '.hbs',
  };

  transporter.use('compile', hbs(handlebarOptions));

    let mailOptions = {
      from: 'avocodoteam@gmail.com',
      to: user.email,
      subject: 'Welcome to Plenty of Dish, ' + user.name,
      text: 'Hi there!\
      You are one step closer to finding your perfect pear. That is kind of a big dill! \
      Once you log in, please head to the "Profile" section, and edit your information. \
      Then, feel free to explore potential catches, connect with your chosen foodies, and chat to the Plenty of Dish community in our chat section. \
      Most importantly, be respectful and have fun!  \
      We ap-peach-iate you',
      template: 'email'
    };

    transporter.sendMail(mailOptions, function(err, data){
      if(err) {
        console.log('Error', err);
      } else {
        console.log('Email sent');
      }
    });
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
          return res.redirect('/');
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
