const upload = require('../services/upload');

const express = require('express');
const router = express.Router();

const singleUpload = upload.single('image');

router.get('/upload', function(req, res) {
  res.render('image/upload.ejs', {});
},

router.post('/upload', function(req, res,) {
  singleUpload(req, res, function(err) {
    res.render('error.hbs', {});
  });
}))



// router.post('/upload', upload.array('photos', 3), function(req, res, next) {
//   res.send('Successfully uploaded ' + req.files.length + ' files!')
// })

module.exports = router;
