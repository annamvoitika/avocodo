const upload = require('../services/upload');
const User = require('../models/user')
// const singleUpload = upload.single('image');

const ImageUploadController = {
  Upload: function(req, res, next) {
    res.render('image/upload.hbs', {});
  },

  Uploaded: function(req, res) {
    console.log(req)
    console.log('Kabirs here')
    console.log(req.files.file)
    // User.findOne({
    //   _id: req.session.user._id},
    // )
    // User.findOneAndUpdate({
    //   _id: req.session.user._id}, {
    //     $set: {avatar: 'Hello team'}
    //   })
      console.log(req.session.user._id)
      res.render('home/index.hbs', {});
    }


    // singleUpload(req, res, function(err) {
    //   res.render('error.hbs', {});
};


module.exports = ImageUploadController;
