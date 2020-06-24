const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user')

router.get('/', UserController.Index);
router.post('/', UserController.Create);
router.get('/new', UserController.New);
router.get('/profile/:_id', UserController.ViewProfile);
router.get('/catches', UserController.RandomCatch);

module.exports = router;
