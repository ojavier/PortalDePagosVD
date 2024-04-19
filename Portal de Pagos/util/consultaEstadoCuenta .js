exports.consultaEstadoCuenta = (request, response, next) => {
    const tienePermiso = request.session.permisos.some(permiso => permiso.NombrePrivilegio === 'consultaEstadoCuenta');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};
