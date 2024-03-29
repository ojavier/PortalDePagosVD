const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main.controller');

router.get('/', mainController.get_root);

router.get('/creditos', mainController.get_creditos);

router.get('/configuracion', mainController.get_configuracion);

module.exports = router;