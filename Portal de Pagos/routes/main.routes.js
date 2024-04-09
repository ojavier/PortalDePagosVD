const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main.controller');

router.get('/', mainController.get_root);

router.get('/home', mainController.get_home);

router.get('/paymethod', mainController.get_paymethod);

router.get('/payplan', mainController.get_payplan);

router.get('/profile', mainController.get_profile);

router.get('/reportes', mainController.get_reportes);

router.get('/creditos', mainController.get_creditos);

router.get('/configuracion', mainController.get_configuracion);

router.get('/pagos', mainController.get_pagos);

router.post('/pagos', mainController.post_Forms);


module.exports = router;