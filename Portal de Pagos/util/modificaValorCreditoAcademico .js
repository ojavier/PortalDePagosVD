exports.modificaValorCreditoAcademico = (request, response, next) => {
    const tienePermiso = request.session.permisos.some(permiso => permiso.NombrePrivilegio === 'modificaValorCreditoAcademico');
    if (tienePermiso) {
        next();
    } else {
        return response.status(404).render('404');
    }
};
