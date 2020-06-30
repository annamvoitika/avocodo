const express = require('express');
const router = express.Router();

const ImageUploadController = require('../controllers/image-upload');

router.get('/upload', ImageUploadController.Upload);
router.post('/upload', ImageUploadController.Uploaded);

module.exports = router;
