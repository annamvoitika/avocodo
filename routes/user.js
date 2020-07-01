const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const UserController = require('../controllers/user')
const HomeController = require('../controllers/home')

router.use(express.static(__dirname+'./public/'))

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + "_" + Date.now() +
    path.extname(file.originalname));
  }
});

const upload =  multer({
  storage:storage
}).single('file');

router.get('/', HomeController.CheckAuthenticated, UserController.Index);
router.get('/new', HomeController.CheckAuthenticated, UserController.New);
router.get('/profile/:_id', HomeController.CheckAuthenticated, UserController.ViewProfile);
router.get('/catches', HomeController.CheckAuthenticated, UserController.RandomCatch);
router.get('/myprofile', HomeController.CheckAuthenticated, UserController.ViewUserProfile);
router.get('/:_id/edit', HomeController.CheckAuthenticated, UserController.Edit);
router.post('/:_id', HomeController.CheckAuthenticated, UserController.Update);
router.get('/chat', HomeController.CheckAuthenticated, UserController.Chat);
router.get('/upload', HomeController.CheckAuthenticated, UserController.Upload);
router.post('/upload', HomeController.CheckAuthenticated, upload, UserController.UploadImage);

module.exports = router;
