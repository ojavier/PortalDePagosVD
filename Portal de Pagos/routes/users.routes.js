const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');

const usersController = require('../controllers/users.controller');

router.get('/profile', isAuth, usersController.get_profile);
router.get('/login', usersController.get_login);
router.post('/login', usersController.post_login);
router.get('/logout', usersController.get_logout);

module.exports = router;
