const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user')
const HomeController = require('../controllers/home');
const ImageUploadController = require('../controllers/image-upload');

router.get('/upload', HomeController.CheckAuthenticated, ImageUploadController.Upload);
router.post('/upload', ImageUploadController.Uploaded, UserController.ViewProfile);

module.exports = router;
