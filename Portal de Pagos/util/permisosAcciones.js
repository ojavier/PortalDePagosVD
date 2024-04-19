exports.realizaProcesoAceptacionHorario = (request, response, next) => {
    const tienePermiso = request.session.permisos.some(permiso => permiso.NombrePrivilegio === 'realizaProcesoAceptacionHorario');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};

exports.realizarPago = (request, response, next) => {
    const tienePermiso = request.session.permisos.some(permiso => permiso.NombrePrivilegio === 'realizarPago');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};

exports.modificaValorCreditoAcademico = (request, response, next) => {
    const tienePermiso = request.session.permisos.some(permiso => permiso.NombrePrivilegio === 'modificaValorCreditoAcademico');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};

exports.importarRegistroTransferenciasAlumno = (request, response, next) => {
    const tienePermiso = request.session.permisos.some(permiso => permiso.NombrePrivilegio === 'importarRegistroTransferenciasAlumno');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};
