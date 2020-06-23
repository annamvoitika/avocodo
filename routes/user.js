const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user')

router.get('/', UserController.Index);
router.post('/', UserController.Create);
router.get('/new', UserController.New);
router.get('/all', UserController.All);

module.exports = router;
