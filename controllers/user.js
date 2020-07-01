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
        matches: user.matches,
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
      _id: req.session.user._id},
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
      guilty: req.body.guilty,
    }},

    function(err, user) {
      if (err) {
        throw err;
      }
      res.status(201).redirect('/user/myprofile');
    });
  },

  Match: function(req, res){
    //write match into the users db
    const match = req.params._id;
    const userId = req.session.user._id;

    User.updateOne({
      _id: userId
    }, {
      $push: {
        usersuggestedmatches: match
      }
    }).then();

    //write match into the matches db
    User.updateOne({
      _id: match
    }, {
      $push: {
        matchsuggestedmatches: userId
      }
    }).then();

    res.status(201).redirect('/user/suggested-matches');
  },

  ViewSuggestedMatches: function(req, res) {
    User.findOne({_id: req.session.user._id}, function(err, user) {
    res.render('user/suggestedmatches.ejs', {
      name: user.name,
      usersuggestedmatches: user.usersuggestedmatches,
      matchsuggestedmatches: user.matchsuggestedmatches,
    });
  })
  },

  ViewMatches: function(req, res) {
    User.findOne({_id: req.session.user._id}, function(err, user) {
    res.render('user/viewmatches.ejs', {
      name: user.name,
      matches: user.matches,
    });
  })
},

Confirm: function(req, res){
  console.log("got to confirm");
  //delete match from existing user suggested matches
  const match = req.params._id;
  const userId = req.session.user._id;

  User.updateMany({
    _id: userId
  }, {
    //this should remove match from all elements of my user arrays
    $pull: {
      matches: match,
      usersuggestedmatches: match,
      matchsuggestedmatches: match,
    }
  }).then();

  res.render('user/confirmmatch.hbs', {match: req.params._id});
  //redirects to second user writing
},

Confirm2: function(req, res){
  console.log("got to confirm2");
  //delete match from existing matches suggested matches
  const match = req.params._id;
  const userId = req.session.user._id;

  User.updateMany({
    _id: match
  }, {
    //this should remove match from all elements of my user arrays
    $pull: {
      matches: userId,
      usersuggestedmatches: userId,
      matchsuggestedmatches: userId,
    }
  }).then();

  res.render('user/confirmmatch2.hbs', {match: req.params._id})
  //this then redirects to confirm match so we can write to the db matches
},

ConfirmMatch: function(req, res){
  console.log("got to confirm match");
  //add matches to both matches array
  const match = req.params._id;
  const userId = req.session.user._id;

  //write array into user db matches array
  User.updateOne({
    _id: userId
  }, {
    $push: {
      matches: match
    }
  }).then();

  //write match into the matches' array db
  User.updateOne({
    _id: match
  }, {
    $push: {
      matches: userId
    }
  }).then();

  //remove match from suggested matches db and matches db

  res.status(201).redirect('/user/matches');
},

Unmatch: function(req, res){
  const match = req.params._id;
  const userId = req.session.user._id;

  //update db to remove match for user
  User.updateMany({
    _id: userId
  }, {
    //this should remove match from all elements of my user arrays
    $pull: {
      matches: match,
      usersuggestedmatches: match,
      matchsuggestedmatches: match,
    }
  }).then();
  //unmatch page then redirects to unmatch 2 to remove info from matches db
  res.render('user/unmatch.hbs', {match: req.params._id});
},

Unmatch2: function(req, res) {
  const match = req.params._id;
  const userId = req.session.user._id;

  //update db to remove match for user
  User.updateMany({
    _id: match
  }, {
    //this should remove match from all elements of my user arrays
    $pull: {
      matches: userId,
      usersuggestedmatches: userId,
      matchsuggestedmatches: userId,
    }
  }).then();

  res.status(201).redirect('/user/suggested-matches');
},

  RandomCatch: function(req, res) {
        User.aggregate([{$sample: {size: 2}}], function(err, user) {
      if (err) { throw err; }
          res.render('user/catches.hbs', { user: user });
         });
      }
  }

module.exports = UserController;
