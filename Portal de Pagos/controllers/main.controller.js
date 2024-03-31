exports.get_root = (request, response, next) => {
    response.render('admin_home', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
    });
};