
exports.get_root = (request, response, next) => {
    response.render('home', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
    });
};

exports.get_home = (request, response, next) => {
    response.render('home2', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
    });
};

exports.get_paymethod = (request, response, next) => {
    response.render('payment-methods', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
    });
};

exports.get_payplan = (request, response, next) => {
    response.render('payment-plan', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
    });
};

exports.get_profile = (request, response, next) => {    
    response.render('profile', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
    });
};

exports.get_reportes = (request, response, next) => {    
    response.render('reportes', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
    });
};

exports.get_search = (request, response, next) => {
    response.render('search', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
    });
};



