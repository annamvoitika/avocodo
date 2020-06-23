const HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'Avocodo' });
  },

  UserSignup: function(req, res) {
    res.render('home/signup', {});
  },

  Signup: function(req, res) {

  },

  UserSignin: function(req, res) {
    res.render('home/signin', {});
  },

  Signin: function(req, res) {

  }
};

module.exports = HomeController;
