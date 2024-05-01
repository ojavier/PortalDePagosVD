const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');

// Importa los middlewares de permisos
const { realizarPago, importarRegistroTransferenciasAlumno, modificaValorCreditoAcademico, realizaProcesoAceptacionHorario } = require('../util/permisosAcciones');
const { registraReferenciaPersonalizadaAlumno, registrarSolicitudCobroAlumno, registrarPagoEfectivoAlumno } = require('../util/permisosRegistroDeInformacion');
const { consultaInformacionPersonalAlumno, consultaEstadoCuenta, consultaEstadoCuentaAlumno, consultaHistorialPagos, consultaHistorialPagosAlumno, consultaPlanMaterias, consultaPlanMateriasAlumno, consultaHistorialValorCredito, consultaReporteAlumnos } = require('../util/permisosConsultaDeInformacion');

const mainController = require('../controllers/main.controller');

router.get('/', mainController.getRoot);

router.get('/academic-plan', isAuth, realizaProcesoAceptacionHorario, mainController.getAcademicPlan);

router.get('/student-home', isAuth, consultaEstadoCuenta, consultaHistorialPagos, consultaPlanMaterias, mainController.getStudentHome);

router.get('/admin-home', isAuth, consultaInformacionPersonalAlumno, consultaEstadoCuentaAlumno, consultaHistorialPagosAlumno, consultaPlanMateriasAlumno, mainController.getAdminHome);

router.get('/student-data', isAuth, mainController.getStudentData);

router.get('/paymethod', isAuth, mainController.getPayMethod);

router.get('/payplan', isAuth, mainController.getPayPlan);

router.get('/profile', isAuth, mainController.getProfile);

// TODO: Add a view so that admins and coordinators can access a students profile info
// router.get('/profile', isAuth, consultaInformacionPersonalAlumno, mainController.get_profile);

router.get('/reportes', isAuth, consultaReporteAlumnos, mainController.getReportes);

router.get('/creditos', isAuth, consultaHistorialValorCredito, modificaValorCreditoAcademico, mainController.getCreditos);

router.post('/creditos', isAuth, consultaHistorialValorCredito, modificaValorCreditoAcademico, mainController.postCicloEscolar);

router.get('/references', isAuth, registraReferenciaPersonalizadaAlumno, mainController.getReferences);

router.post('/references', isAuth, registraReferenciaPersonalizadaAlumno, mainController.postReferences);

router.get('/pagos', isAuth, registrarSolicitudCobroAlumno, registrarPagoEfectivoAlumno, mainController.getPagos);

router.post('/pagos', isAuth, realizarPago, mainController.postForms);

router.get('/importar', isAuth, importarRegistroTransferenciasAlumno, mainController.getImportar);

router.post('/importar', isAuth, importarRegistroTransferenciasAlumno, mainController.postImportar);

module.exports = router;
