const Usuario = require('../models/usuario.model');

exports.get_login = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('login', {
        Email: request.session.Email || '',
        error: error,
    });
};

exports.post_login = (request, response, next) => {
    console.log(request.body.Email);
    Usuario.fetchOne(request.body.Email)
        .then(([usuarios, fieldData]) => {
            console.log(usuarios);
            if (usuarios) {
                const usuario = usuarios[0];
                // Establecer isLoggedIn en true
                request.session.isLoggedIn = true;
                response.redirect('/home');
            } else {
                request.session.error = "Usuario y/o contraseña incorrectos";
                response.redirect('/users/login');
            }
        })
        .catch((error) => {console.log(error);});
};


exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/users/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};
