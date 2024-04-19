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
    console.log("Datos recibidos: ", request.body.Email, request.body.Password);
    Usuario.fetchOne(request.body.Email)
        .then(([usuario]) => {  // Aquí cambiamos 'usuarios' a 'usuario' para reflejar que es un objeto único, no un array
            console.log("Usuario encontrado: ", usuario);
            if (usuario) {  // Aquí ya no necesitas verificar 'usuario.length > 0'
                if (usuario.Password === request.body.Password) {
                    console.log('Valid Password');
                    request.session.isLoggedIn = true;
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
