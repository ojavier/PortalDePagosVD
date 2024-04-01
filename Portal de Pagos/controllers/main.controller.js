exports.get_root = (request, response, next) => {
    response.render('registrar_pago', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
    });
};