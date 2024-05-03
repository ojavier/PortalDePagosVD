const Usuario = require('../models/usuario.model');

exports.getLogin = (request, response, next) => {
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
        role = request.session.rol;
        if(role === 'Alumno'){
            response.redirect('/academic-plan');
        } else if(role === 'Coordinador' || role === 'Administrador'){
            response.redirect('/admin-home');
        } else if(role === 'Desarrollador'){ // As long as the web page is in production
            response.redirect('/academic-plan');
        }
    }
};

exports.postLogin = async (request, response, next) => {
    try {
        console.log('Datos recibidos: ', request.body.Email, request.body.Password);
        const [usuario] = await Usuario.fetchOne(request.body.Email);

        if (usuario && usuario.Password === request.body.Password) {
            console.log('Valid Password');
            request.session.isLoggedIn = true;
            request.session.usuario = usuario;

            const [permits] = await Usuario.getPrivilegios(request.body.Email);
            request.session.permisos = permits.map(permiso => permiso.NombrePrivilegio);

            const [roles] = await Usuario.getUserRole(request.body.Email);
            request.session.rol = roles.length > 0 ? roles[0].Nombre : '';
            
            console.log('Role set in session: ', request.session.rol);
            role = request.session.rol;
            if(role === 'Alumno'){
                response.redirect('/academic-plan');
            } else if(role === 'Coordinador' || role === 'Administrador'){
                response.redirect('/admin-home');
            } else if(role === 'Desarrollador'){ // As long as the web page is in production
                response.redirect('/academic-plan');
            }

        } else {
            console.log('Autenticación fallida. El usuario no ha sido encontrado o su contraseña fue inválida.');
            request.session.error = 'Usuario y/o contraseña incorrectos';
            response.redirect('/users/login');
        }
    } catch (error) {
        console.error('Error durante el proceso de login: ', error);
        response.redirect('/users/login');
    }
};



exports.getLogout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/users/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};
