const {Alumno, SolPago, EstadoCuenta, Pago, Referencia}= require("../models/main.models");


exports.get_root = (request, response, next) => {
    response.render('login', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
    });
};

exports.get_login = (request, response, next) => {
    response.render('home', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
    });
}

exports.get_home = (request, response, next) => {
    Promise.all([EstadoCuenta.fetchAll(), SolPago.fetchAll()])
        .then(([estadoCuentaRows, solPagoRows]) => {
            response.render('home2', {
                pagePrimaryTitle: 'Portal de Gestión de Pagos',
                estadoCuentas: estadoCuentaRows[0],
                solpagos: solPagoRows[0],
            });
        })
        .catch(err => {
            console.log(err);
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

exports.get_creditos = (request, response, next) => {
    response.render('creditos', {
        pagePrimaryTitle: 'Créditos',
    });
};

exports.get_configuracion = (request, response, next) => {
    Alumno.fetchAll().then(([rows]) => {
    response.render('configuracion', {
        pagePrimaryTitle: 'Configuración',
        alumnos: rows,
        });
    });
}

exports.post_configuracion = (request, response, next) => {
    console.log(request.body);
    const NuevaReferencia = new Referencia(request.body.email, request.body.referencia);
    NuevaReferencia.updateByEmail(request.body.email, request.body.referencia).then(([rows,FieldData]) => {
        response.redirect('/configuracion');
    }).catch((error) => {
        console.log('Error al Actualizar Referencia', error);
    });
}

exports.get_pagos = (request, response, next) => {
    Alumno.fetchAll().then(([rows]) => {
        response.render('pagos', {
            pagePrimaryTitle: 'Registrar Pago',
            alumnos: rows,
        });
    });
}

exports.post_SolPagos = (request, response, next) => {
    console.log(request.body);
    const solicitud = new SolPago(request.body.email, request.body.concepto, request.body.monto, request.body.fechalimite);
    solicitud.save().then(([rows,FieldData]) => {
        response.redirect('/pagos');
    }).catch((error) => {
        console.log('Error al Registrar Solicitud de Pago', error);
    });
};

exports.post_RegistrarPago = (request, response, next) => {
    console.log(request.body);
    const pago = new Pago(request.body.emailpago, request.body.referencia, request.body.concepto_pago, request.body.monto_pago, request.body.fechapago);
    pago.save().then(([rows,FieldData]) => {
        response.redirect('/pagos');
    }).catch((error) => {
        console.log('Error al Registrar Pago', error);
    });
}


exports.post_Forms = (request, response, next) => {
    if (request.body.formType === 'registrarPago') {
        // Call post_RegistrarPago if formType is 'registrarPago'
        exports.post_RegistrarPago(request, response, next);
    } else if (request.body.formType === 'solPagos') {
        // Otherwise, call post_SolPagos
        exports.post_SolPagos(request, response, next);
    }
};

