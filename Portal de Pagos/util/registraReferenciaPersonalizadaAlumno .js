exports.registraReferenciaPersonalizadaAlumno = (request, response, next) => {
    const tienePermiso = request.session.permisos.some(permiso => permiso.NombrePrivilegio === 'registraReferenciaPersonalizadaAlumno');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};
