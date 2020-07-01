const User = require('../models/user');
const ImageUpload = require('../models/upload');
const express = require('express');
const router = express.Router();
const imageData = ImageUpload.find({});

router.use(express.static(__dirname + './public/'))


const UserController = {
  Index: function (req, res) {
    User.find(function (err, user) {
      if (err) { throw err; }
      res.render('user/index.hbs', { user: user });
    });
  },
  New: function (req, res) {
    res.render('user/new.hbs', {});
  },
  ViewProfile: function (req, res) {
    User.find({ _id: req.params._id }, function (err, user) {
      if (err) {
        throw err;
      }
      res.render('user/profile.hbs', { user: user });
    });
  },
  ViewUserProfile: function (req, res) {
    User.findOne({ _id: req.session.user._id }, function (err, user) {
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
        avatar: user.avatar
      });
    })
  },
  UploadImage: function (req, res) {
    let imageFile = req.file.filename;
    let success = req.file.filename + " uploaded successfully";
    let imageDetails = new ImageUpload({
      UploadImage: imageFile
    });
    User.findOneAndUpdate({ _id: req.params._id }, {
      $set: { avatar: req.body.file }
    });
    imageDetails.save(function (err, doc) {
      if (err) {
        throw err;
      }
      imageData.exec(function (err, data) {
        if (err) {
          throw err;
        }
        res.render('user/upload', {
          title: 'Upload File', records: data, success: success
        })
      })
    })
  },
  Upload: function (req, res, next) {
    imageData.exec(function (err, data) {
      if (err) {
        throw err;
      }
      res.render('user/upload', {
        title: 'Upload File', records: data, success: ''
      });
    });
  },
  Edit: function (req, res) {
    User.find({ _id: req.params._id }, function (err, user) {
      if (err) {
        throw err;
      }
      res.render('user/edit.hbs', { user: user });
    });
  },
  Update: function (req, res) {
    User.findOneAndUpdate({ _id: req.params._id }, {
      $set: {
        name: req.body.name,
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
        avatar: req.body.file
      }
    },
      function (err, user) {
        if (err) {
          throw err;
        }
        res.status(201).redirect('/user/myprofile');
      });
  },
  RandomCatch: function (req, res) {
    User.aggregate([{ $sample: { size: 2 } }], function (err, user) {
      if (err) { throw err; }
      res.render('user/catches.hbs', { user: user });
    });
  },
  Chat: function (req, res) {
    User.find({ _id: req.session.user._id }, function (err, user) {
      if (err) {
        throw err;
      }
      res.render('chat.hbs', { user: user });
    });
  }
}

module.exports = UserController;
