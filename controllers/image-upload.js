const upload = require('../services/upload');
const User = require('../models/user')

const ImageUploadController = {
  Upload: function (req, res) {
    res.render('image/upload.hbs', {});
  },

  Uploaded: function (req, res) {
    const sampleFile = req.files.sampleFile
    const imagePath = '/Users/student/Projects/avocodo/public/images/ProfilePics/' + sampleFile.name 
    const displayImagePath = '/public/images/ProfilePics/' + sampleFile.name 
    sampleFile.mv(imagePath , function(err) {
      if (err) {
        return res.status(500).send(err);
      }
    });
    User.findOneAndUpdate({
      _id: req.session.user._id
    },
     {
      $set: { avatar: displayImagePath }
    },
      function (err, user) {
        if (err) {
          throw err;
        }
        res.status(201).redirect('/user/myprofile');
      });
  }
};

module.exports = ImageUploadController;
