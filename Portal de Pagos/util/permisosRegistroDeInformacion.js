exports.registraReferenciaPersonalizadaAlumno = (request, response, next) => {
    const tienePermiso = request.session.permisos.some(permiso => permiso.NombrePrivilegio === 'registraReferenciaPersonalizadaAlumno');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};

exports.registrarSolicitudCobroAlumno = (request, response, next) => {
    const tienePermiso = request.session.permisos.some(permiso => permiso.NombrePrivilegio === 'registrarSolicitudCobroAlumno');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};

exports.registrarPagoEfectivoAlumno = (request, response, next) => {
    const tienePermiso = request.session.permisos.some(permiso => permiso.NombrePrivilegio === 'registrarPagoEfectivoAlumno');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};
