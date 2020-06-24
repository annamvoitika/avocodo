const express = require('express');
const router = express.Router();
const session = require('express-session');

const HomeController = require('../controllers/home');

router.get('/', HomeController.CheckAuthenticated, HomeController.Index);
router.get('/signin', HomeController.UserSignin);
router.post('/signin', HomeController.Signin);
router.get('/signup', HomeController.UserSignup);
router.post('/signup', HomeController.Signup);
router.get('/error', HomeController.Error);

module.exports = router;
