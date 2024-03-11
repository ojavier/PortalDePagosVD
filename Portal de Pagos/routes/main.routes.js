const express = require('express');
const router = express.Router();

const mainRouteController = require('../controllers/main.controller');

router.get('/', mainRouteController.get_root);

module.exports = router;