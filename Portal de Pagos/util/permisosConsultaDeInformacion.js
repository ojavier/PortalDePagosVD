exports.consultaInformacionPersonalAlumno = (request, response, next) => {
    const tienePermiso = request.session.permisos.some(permiso => permiso.NombrePrivilegio === 'consultaInformacionPersonalAlumno');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};

exports.consultaEstadoCuenta = (request, response, next) => {
    const tienePermiso = request.session.permisos.some(permiso => permiso.NombrePrivilegio === 'consultaEstadoCuenta');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};
exports.consultaEstadoCuentaAlumno = (request, response, next) => {
    const tienePermiso = request.session.permisos.some(permiso => permiso.NombrePrivilegio === 'consultaEstadoCuentaAlumno');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};

exports.consultaHistorialPagos = (request, response, next) => {
    const tienePermiso = request.session.permisos.some(permiso => permiso.NombrePrivilegio === 'consultaHistorialPagos');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};

exports.consultaHistorialPagosAlumno = (request, response, next) => {
    const tienePermiso = request.session.permisos.some(permiso => permiso.NombrePrivilegio === 'consultaHistorialPagosAlumno');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};

exports.consultaPlanMaterias = (request, response, next) => {
    const tienePermiso = request.session.permisos.some(permiso => permiso.NombrePrivilegio === 'consultaPlanMaterias');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};

exports.consultaPlanMateriasAlumno = (request, response, next) => {
    const tienePermiso = request.session.permisos.some(permiso => permiso.NombrePrivilegio === 'consultaPlanMateriasAlumno');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};

exports.consultaHistorialValorCredito = (request, response, next) => {
    const tienePermiso = request.session.permisos.some(permiso => permiso.NombrePrivilegio === 'consultaHistorialValorCredito');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};


exports.consultaReporteAlumnos = (request, response, next) => {
    const tienePermiso = request.session.permisos.some(permiso => permiso.NombrePrivilegio === 'consultaReporteAlumnos');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};
