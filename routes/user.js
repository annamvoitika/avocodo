const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user')
const HomeController = require('../controllers/home')

router.get('/', HomeController.CheckAuthenticated, UserController.Index);
router.post('/', HomeController.CheckAuthenticated, UserController.Create);
router.get('/new', HomeController.CheckAuthenticated, UserController.New);
router.get('/profile/:_id', UserController.ViewProfile);
router.get('/catches', UserController.RandomCatch);

module.exports = router;
