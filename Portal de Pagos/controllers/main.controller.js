const {Alumno, SolPago, EstadoCuenta, cicloescolar}= require("../models/main.models");


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
    cicloescolar.fetchAll().then(([rows]) => {
    response.render('creditos', {
        pagePrimaryTitle: 'Créditos',
        cicloescolar: rows,
        });
    });
};

exports.get_configuracion = (request, response, next) => {
    response.render('configuracion', {
        pagePrimaryTitle: 'Configuración',
    });
};

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
    const pago = new Pago(request.body.email, request.body.concepto, request.body.monto, request.body.fecha);
    pago.save().then(([rows,FieldData]) => {
        response.redirect('/pagos');
    }).catch((error) => {
        console.log('Error al Registrar Pago', error);
    });
}

exports.post_cicloescolar = (request, response, next) => {
    console.log(request.body);
    const mi_cicloescolar = new cicloescolar(
        request.body.MesInicio, request.body.MesFin, request.body.Año, 
        request.body.CostoCreditos
    );
    mi_cicloescolar.save()
    .then(([rows,FieldData]) => {
        response.redirect('/creditos');
    }).catch((error) => {
        console.log('Error al Registrar ciclo escolar', error);
    });
};

