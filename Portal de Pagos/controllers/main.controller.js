exports.get_root = (request, response, next) => {
    response.render('reportes', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
    });
};

exports.get_creditos = (request, response, next) => {
    response.render('creditos', {
        pagePrimaryTitle: 'Créditos',
    });
};

exports.get_configuracion = (request, response, next) => {
    response.render('configuracion', {
        pagePrimaryTitle: 'Configuración',
    });
};