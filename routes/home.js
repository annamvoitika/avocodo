const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/home');

router.get('/', HomeController.Index);
router.get('/signin', HomeController.UserSignin);
router.post('/signin', HomeController.Signin);
router.get('/signup', HomeController.UserSignup);
router.post('/signup', HomeController.Signup);

module.exports = router;
