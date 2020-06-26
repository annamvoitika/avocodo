const express = require('express');
const router = express.Router();
const session = require('express-session');

const HomeController = require('../controllers/home');

router.get('/', HomeController.CheckAuthenticated, HomeController.Index);
router.get('/signin', HomeController.CheckLoggedIn, HomeController.UserSignin);
router.post('/signin', HomeController.CheckLoggedIn, HomeController.Signin);
router.get('/signup', HomeController.CheckLoggedIn, HomeController.UserSignup);
router.post('/signup', HomeController.CheckLoggedIn, HomeController.Signup);
router.get('/logout', HomeController.CheckAuthenticated, HomeController.Logout);
router.get('/error', HomeController.Error);

module.exports = router;
