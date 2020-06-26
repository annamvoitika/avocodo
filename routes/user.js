const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

const UserController = require('../controllers/user');

router.get('/', ensureAuthenticated, UserController.Index);
router.get('/profile/:_id', ensureAuthenticated, UserController.ViewProfile);
router.get('/catches', ensureAuthenticated, UserController.RandomCatch);
router.get('/myprofile', ensureAuthenticated, UserController.ViewUserProfile);
router.get('/:_id/edit', ensureAuthenticated, UserController.Edit);
router.post('/:_id', ensureAuthenticated, UserController.Update);

module.exports = router;
