exports.getLogin = (request, response, next) => {
    response.render('login', {
        pagePrimaryTitle: 'Iniciar Sesión',
    });
};