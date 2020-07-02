const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user')
const HomeController = require('../controllers/home')

router.get('/', HomeController.CheckAuthenticated, UserController.Index);
router.get('/new', HomeController.CheckAuthenticated, UserController.New);
router.get('/profile/:_id', HomeController.CheckAuthenticated, UserController.ViewProfile);
router.get('/catches', HomeController.CheckAuthenticated, UserController.RandomCatch);

router.get('/self-match', HomeController.CheckAuthenticated, UserController.SelfMatch);
router.get('/report/:_id', HomeController.CheckAuthenticated, UserController.Report);

router.get('/suggested-matches', HomeController.CheckAuthenticated, UserController.ViewSuggestedMatches);
router.get('/matches', HomeController.CheckAuthenticated, UserController.ViewMatches);

router.get('/match/:_id', HomeController.CheckAuthenticated, UserController.Match);
router.get('/confirm/:_id', HomeController.CheckAuthenticated, UserController.Confirm);
router.get('/confirm2/:_id', HomeController.CheckAuthenticated, UserController.Confirm2);
router.get('/confirm-match/:_id', HomeController.CheckAuthenticated, UserController.ConfirmMatch);

router.get('/unmatch/:_id', HomeController.CheckAuthenticated, UserController.Unmatch);
router.get('/unmatch2/:_id', HomeController.CheckAuthenticated, UserController.Unmatch2);

router.get('/myprofile', HomeController.CheckAuthenticated, UserController.ViewUserProfile);
router.get('/:_id/edit', HomeController.CheckAuthenticated, UserController.Edit);
router.post('/:_id', HomeController.CheckAuthenticated, UserController.Update);
router.get('/chat',HomeController.CheckAuthenticated, UserController.Chat);

module.exports = router;
