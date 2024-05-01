const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');

const usersController = require('../controllers/users.controller');

router.get('/login', usersController.getLogin);
router.post('/login', usersController.postLogin);
router.get('/logout', usersController.getLogout);

module.exports = router;
