exports.registraReferenciaPersonalizadaAlumno = (request, response, next) => {
    const tienePermiso = request.session.permisos.includes('registraReferenciaPersonalizadaAlumno');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};

exports.registrarSolicitudCobroAlumno = (request, response, next) => {
    const tienePermiso = request.session.permisos.includes('registrarSolicitudCobroAlumno');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};

exports.registrarPagoEfectivoAlumno = (request, response, next) => {
    const tienePermiso = request.session.permisos.includes('registrarPagoEfectivoAlumno');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};
