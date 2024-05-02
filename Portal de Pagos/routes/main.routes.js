const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main.controller');
const bankController = require('../controllers/bank.controller');

router.get('/', mainController.get_root);

router.get('/home', mainController.get_login);

router.get('/home2', mainController.get_home);

router.get('/paymethod', mainController.get_paymethod);

router.get('/payplan', mainController.get_payplan);

router.get('/profile', mainController.get_profile);

router.get('/reportes', mainController.get_reportes);

router.get('/creditos', mainController.get_creditos);

router.post('/creditos', mainController.post_cicloescolar);

router.get('/configuracion', mainController.get_configuracion);

router.post('/configuracion', mainController.post_configuracion);

router.get('/pagos', mainController.get_pagos);

router.post('/pagos', mainController.post_Forms);

router.get('/importar', mainController.get_importar);

router.post('/importar', mainController.post_importar);

router.post('/generar', bankController.generarURL);

router.get('/respuesta-cobro', bankController.handleResponse);


module.exports = router;