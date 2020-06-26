const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const { forwardAuthenticated } = require('../config/auth');
const HomeController = require('../controllers/home');

router.get('/', ensureAuthenticated, HomeController.Index);
router.get('/register', forwardAuthenticated, HomeController.Register);
router.post('/register', HomeController.UserRegister);
router.get('/login', forwardAuthenticated, HomeController.Login);
router.post('/login', HomeController.UserLogin);
router.get('/logout', ensureAuthenticated, HomeController.Logout);

module.exports = router;
