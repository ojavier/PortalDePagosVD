exports.get_root = (request, response, next) => {
    response.render('home', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
    });
};