const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');

// Importa los middlewares de permisos
const { realizarPago, importarRegistroTransferenciasAlumno, modificaValorCreditoAcademico, realizaProcesoAceptacionHorario } = require('../middlewares/permisosAcciones');
const { registraReferenciaPersonalizadaAlumno, registrarSolicitudCobroAlumno, registrarPagoEfectivoAlumno } = require('../middlewares/permisosRegistroDeInformacion');
const { consultaInformacionPersonalAlumno, consultaEstadoCuenta, consultaEstadoCuentaAlumno, consultaHistorialPagos, consultaHistorialPagosAlumno, consultaPlanMaterias, consultaPlanMateriasAlumno, consultaHistorialValorCredito, consultaReporteAlumnos } = require('../middlewares/permisosConsultaDeInformacion');

const mainController = require('../controllers/main.controller');

router.get('/', mainController.get_root);

router.get('/home', isAuth, mainController.get_login);

router.get('/home2', isAuth, mainController.get_home);

router.get('/paymethod', isAuth, mainController.get_paymethod);

router.get('/payplan', isAuth, mainController.get_payplan);

router.get('/profile', isAuth, mainController.get_profile);

// TODO: Add a view so that admins and coordinators can access a students profile info
// router.get('/profile', isAuth, consultaInformacionPersonalAlumno, mainController.get_profile);

router.get('/reportes', isAuth, consultaReporteAlumnos, mainController.get_reportes);

router.get('/creditos', isAuth, modificaValorCreditoAcademico, mainController.get_creditos);

router.post('/creditos', isAuth, modificaValorCreditoAcademico, mainController.post_cicloescolar);

router.get('/configuracion', isAuth, registraReferenciaPersonalizadaAlumno, mainController.get_configuracion);

router.post('/configuracion', isAuth, registraReferenciaPersonalizadaAlumno, mainController.post_configuracion);

router.get('/pagos', isAuth, registrarSolicitudCobroAlumno, registrarPagoEfectivoAlumno, mainController.get_pagos);

router.post('/pagos', isAuth, realizarPago, mainController.post_Forms);

router.get('/importar', isAuth, importarRegistroTransferenciasAlumno, mainController.get_importar);

router.post('/importar', isAuth, importarRegistroTransferenciasAlumno, mainController.post_importar);

module.exports = router;
