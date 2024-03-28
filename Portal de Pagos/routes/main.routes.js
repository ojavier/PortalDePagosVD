const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main.controller');

router.get('/', mainController.get_root);

router.get('/creditos', mainController.get_creditos);

module.exports = router;