const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');

// Importa los middlewares de permisos
const { realizarPago, importarRegistroTransferenciasAlumno, modificaValorCreditoAcademico, realizaProcesoAceptacionHorario } = require('../util/permisosAcciones');
const { registraReferenciaPersonalizadaAlumno, registrarSolicitudCobroAlumno, registrarPagoEfectivoAlumno } = require('../util/permisosRegistroDeInformacion');
const { consultaInformacionPersonalAlumno, consultaEstadoCuenta, consultaEstadoCuentaAlumno, consultaHistorialPagos, consultaHistorialPagosAlumno, consultaPlanMaterias, consultaPlanMateriasAlumno, consultaHistorialValorCredito, consultaReporteAlumnos } = require('../util/permisosConsultaDeInformacion');

const mainController = require('../controllers/main.controller');

router.get('/', mainController.get_root);

router.get('/home2', isAuth, mainController.get_home);

router.get('/admin-home', isAuth, mainController.get_adminHome);

router.get('/student-data', isAuth, mainController.get_studentData);

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
