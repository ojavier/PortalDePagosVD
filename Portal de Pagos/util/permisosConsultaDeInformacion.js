exports.consultaInformacionPersonalAlumno = (request, response, next) => {
    const tienePermiso = request.session.permisos.includes('consultaInformacionPersonalAlumno');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).redirect('/404');
    }
};

exports.consultaEstadoCuenta = (request, response, next) => {
    const tienePermiso = request.session.permisos.includes('consultaEstadoCuenta');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).redirect('/404');
    }
};

exports.consultaEstadoCuentaAlumno = (request, response, next) => {
    const tienePermiso = request.session.permisos.includes('consultaEstadoCuentaAlumno');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).redirect('/404');
    }
};

exports.consultaHistorialPagos = (request, response, next) => {
    const tienePermiso = request.session.permisos.includes('consultaHistorialPagos');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).redirect('/404');
    }
};

exports.consultaHistorialPagosAlumno = (request, response, next) => {
    const tienePermiso = request.session.permisos.includes('consultaHistorialPagosAlumno');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).redirect('/404');
    }
};

exports.consultaPlanMaterias = (request, response, next) => {
    const tienePermiso = request.session.permisos.includes('consultaPlanMaterias');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).redirect('/404');
    }
};

exports.consultaPlanMateriasAlumno = (request, response, next) => {
    const tienePermiso = request.session.permisos.includes('consultaPlanMateriasAlumno');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).redirect('/404');
    }
};

exports.consultaHistorialValorCredito = (request, response, next) => {
    const tienePermiso = request.session.permisos.includes('consultaHistorialValorCredito');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).redirect('/404');
    }
};

exports.consultaReporteAlumnos = (request, response, next) => {
    const tienePermiso = request.session.permisos.includes('consultaReporteAlumnos');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).redirect('/404');
    }
};
