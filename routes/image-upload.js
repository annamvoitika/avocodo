const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload')

const UserController = require('../controllers/user')
const HomeController = require('../controllers/home');
const ImageUploadController = require('../controllers/image-upload');

router.get('/upload', HomeController.CheckAuthenticated, ImageUploadController.Upload);
router.post('/upload', ImageUploadController.Uploaded);

module.exports = router;
