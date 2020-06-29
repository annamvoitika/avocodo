const upload = require('../services/upload');
const singleUpload = upload.single('image');

const ImageUploadController = {
  Upload: function(req, res) {
    res.render('image/upload.ejs', {});
  },

  Uploaded: function(req, res) {
    singleUploadsingleUpload(req, res, function(err) {
      res.render('error.hbs', {});
    });
  }
};


module.exports = ImageUploadController;
