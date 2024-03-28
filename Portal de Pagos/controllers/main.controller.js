exports.get_root = (request, response, next) => {
    response.render('payment-methods', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
    });
};