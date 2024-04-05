const {Alumno, SolPago}= require("../models/main.models");


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
    const solicitud = new SolPago(request.body.email, request.body.concepto, request.body.monto);
    solicitud.save().then(([rows,FieldData]) => {
        response.redirect('/pagos');
    }).catch((error) => {
        console.log('Error al Registrar Solicitud de Pago', error);
    });
};

