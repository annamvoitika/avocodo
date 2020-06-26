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
      res.render('user/profile.hbs', { user: user});
    });
  },
  ViewUserProfile: function(req, res) {
    User.findOne({_id: req.session.user._id}, function(err, user) {
      res.render('user/myprofile', {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        location: user.location,
        zodiac: user.zodiac,
        breakfast: user.breakfast,
        lunch: user.lunch,
        dinner: user.dinner,
        dessert: user.dessert,
        amdrink: user.amdrink,
        pmdrink: user.pmdrink,
        guilty: user.guilty,
      });
    })
  },
  Edit: function(req, res) {
    User.find({_id: req.params._id}, function(err, user) {
      if (err) {
        throw err;
      }
      res.render('user/edit.hbs', { user: user });
    });
  },
  Update: function(req, res) {
    User.findOneAndUpdate({
      _id: req.params._id},
    {$set: {name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      location: req.body.location,
      zodiac: req.body.zodiac,
      breakfast: req.body.breakfast,
      lunch: req.body.lunch,
      dinner: req.body.dinner,
      dessert: req.body.dessert,
      amdrink: req.body.amdrink,
      pmdrink: req.body.pmdrink,
      guilty: req.body.guilty}},
    function(err, user) {
      if (err) {
        throw err;
      }
      res.status(201).redirect('/user/myprofile');
    });
  },
    RandomCatch: function(req, res) {
        User.aggregate([{$sample: {size: 2}}], function(err, user) {
      if (err) { throw err; }
          res.render('user/catches.hbs', { user: user });
         });
      },
      Chat: function(req, res){
        User.find({_id: req.params._id}, function(err, user) {
          if (err) {
            throw err;
          }
          res.render('chat.hbs', { user: user});
        });
      }

  }

module.exports = UserController;
