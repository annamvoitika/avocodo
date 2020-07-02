const upload = require('../services/upload');
const User = require('../models/user')

const ImageUploadController = {
  Upload: function (req, res, next) {
    res.render('image/upload.hbs', {});
  },

  Uploaded: function (req, res) {
    console.log(req);
    console.log('Kabirs here');
    console.log('File path before request: ' + req.files.sampleFile.tempFilePath);
    User.findOneAndUpdate({
      _id: req.session.user._id
    },
      console.log('Name inside update: ' + req.session.user.name), {
      $set: { name: 'kkca' }
    },
      function (err, user) {
        if (err) {
          throw err;
        }
        console.log('Name outside update: ' + req.session.user.name);
        console.log('File path after request: ' + req.files.sampleFile.tempFilePath);
        res.status(201).redirect('/user/myprofile');
      });
  }
};

module.exports = ImageUploadController;
