exports.realizaProcesoAceptacionHorario = (request, response, next) => {
    const tienePermiso = request.session.permisos.includes('realizaProcesoAceptacionHorario');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};

exports.realizarPago = (request, response, next) => {
    const tienePermiso = request.session.permisos.includes('realizarPago');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};

exports.modificaValorCreditoAcademico = (request, response, next) => {
    const tienePermiso = request.session.permisos.includes('modificaValorCreditoAcademico');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};

exports.importarRegistroTransferenciasAlumno = (request, response, next) => {
    const tienePermiso = request.session.permisos.includes('importarRegistroTransferenciasAlumno');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};
