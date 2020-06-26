const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user')
const HomeController = require('../controllers/home')

router.get('/', HomeController.CheckAuthenticated, UserController.Index);
router.post('/', HomeController.CheckAuthenticated, UserController.Create);
router.get('/new', HomeController.CheckAuthenticated, UserController.New);
router.get('/profile/:_id', HomeController.CheckAuthenticated, UserController.ViewProfile);
router.get('/catches', HomeController.CheckAuthenticated, UserController.RandomCatch);
router.get('/myprofile', HomeController.CheckAuthenticated, UserController.ViewUserProfile);
router.get('/:_id/edit', HomeController.CheckAuthenticated, UserController.Edit);
router.post('/:_id', HomeController.CheckAuthenticated, UserController.Update);
// router.get('/chat/:_id', HomeController.CheckAuthenticated, UserController.Chat);


module.exports = router;
