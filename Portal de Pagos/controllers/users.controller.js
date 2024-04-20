const Usuario = require('../models/usuario.model');

exports.get_login = (request, response, next) => {
    const error = request.session.error || null;
    const isLoggedIn = request.session.isLoggedIn || false;
    if(!isLoggedIn) {
        response.render('login', {
            pagePrimaryTitle: 'Portal de Gestión de Pagos',
            isLoggedIn: isLoggedIn,
            permisos: request.session.permisos || [],
            usuario: request.session.usuario || {},
            error: error
        });
    } else {
        response.render('home', {
            pagePrimaryTitle: 'Portal de Gestión de Pagos',
            isLoggedIn: isLoggedIn,
            permisos: request.session.permisos || [],
            usuario: request.session.usuario || {},
            error: error
        });
    }
};

exports.post_login = (request, response, next) => {
    console.log("Datos recibidos: ", request.body.Email, request.body.Password);
    Usuario.fetchOne(request.body.Email)
        .then(([usuario]) => {
            console.log("Usuario encontrado: ", usuario);
            if (usuario) {
                if (usuario.Password === request.body.Password) {
                    console.log('Valid Password');
                    request.session.isLoggedIn = true;
                    request.session.usuario = usuario;
                    Usuario.getPrivilegios(request.body.Email)
                        .then(([permits, fieldData]) => {
                            request.session.permisos = permits.map(permiso => permiso.NombrePrivilegio);
                            response.redirect('/home');
                        })
                        .catch((error) => {
                            console.error('Error al extraer privilegios', error);
                            response.redirect('/users/login');
                        });
                } else {
                    console.log('Contraseña incorrecta');
                    request.session.error = "Usuario y/o contraseña incorrectos";
                    response.redirect('/users/login');
                }
            } else {
                console.log('No se encontró el usuario');
                request.session.error = "Usuario y/o contraseña incorrectos";
                response.redirect('/users/login');
            }
        })
        .catch((error) => {
            console.error('Error en fetchOne', error);
            response.redirect('/users/login');
        });
};


exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/users/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};
