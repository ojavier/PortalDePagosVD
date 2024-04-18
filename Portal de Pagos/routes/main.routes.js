const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');

const mainController = require('../controllers/main.controller');

router.get('/', mainController.get_root);

router.get('/home', isAuth, mainController.get_login);

router.get('/home2', isAuth, mainController.get_home);

router.get('/paymethod', isAuth, mainController.get_paymethod);

router.get('/payplan', isAuth, mainController.get_payplan);

router.get('/profile', isAuth, mainController.get_profile);

router.get('/reportes', isAuth, mainController.get_reportes);

router.get('/creditos', isAuth, mainController.get_creditos);

router.post('/creditos', isAuth, mainController.post_cicloescolar);

router.get('/configuracion', isAuth, mainController.get_configuracion);

router.post('/configuracion', isAuth, mainController.post_configuracion);

router.get('/pagos', isAuth, mainController.get_pagos);

router.post('/pagos', isAuth, mainController.post_Forms);

router.get('/importar', isAuth, mainController.get_importar);

router.post('/importar', isAuth, mainController.post_importar);

module.exports = router;
