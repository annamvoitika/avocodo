const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  imagename: String,
});

const uploadModel = mongoose.model('UploadImage', uploadSchema);
module.exports = uploadModel