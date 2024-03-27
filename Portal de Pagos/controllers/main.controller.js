exports.get_root = (request, response, next) => {
    response.render('home2', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
    });
};