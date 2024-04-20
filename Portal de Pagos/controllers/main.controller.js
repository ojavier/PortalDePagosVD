const fs = require('fs');
const csvParser = require('csv-parser');
const moment = require('moment');

const {Alumno, SolPago, EstadoCuenta, Pago, Referencia, cicloescolar}= require("../models/main.models");

exports.get_root = (request, response, next) => {

    response.render('login', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
        isLoggedIn: request.session.isLoggedIn || false,
        permisos: request.session.permisos || [],
        usuario: request.session.usuario || {}
    });
};

// TODO: The controller needs a proper name that isn't already used
exports.get_login = (request, response, next) => {

    response.render('home', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
        isLoggedIn: request.session.isLoggedIn || false,
        permisos: request.session.permisos || [],
        usuario: request.session.usuario || {}
    });
}

exports.get_home = (request, response, next) => {

    Promise.all([EstadoCuenta.fetchAll(), SolPago.fetchAll(), Pago.fetchAll()])
        .then(([estadoCuentaRows, solPagoRows, pagoRows]) => {
            response.render('home2', {
                pagePrimaryTitle: 'Portal de Gestión de Pagos',
                estadoCuentas: estadoCuentaRows[0],
                solpagos: solPagoRows[0],
                pagos: pagoRows[0],
                isLoggedIn: request.session.isLoggedIn || false,
                permisos: request.session.permisos || [],
                usuario: request.session.usuario || {}
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.get_paymethod = (request, response, next) => {

    response.render('payment-methods', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
        isLoggedIn: request.session.isLoggedIn || false,
        permisos: request.session.permisos || [],
        usuario: request.session.usuario || {}
    });
};

exports.get_payplan = (request, response, next) => {

    response.render('payment-plan', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
        isLoggedIn: request.session.isLoggedIn || false,
        permisos: request.session.permisos || [],
        usuario: request.session.usuario || {}
    });
};

exports.get_profile = (request, response, next) => {    

    response.render('profile', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
        isLoggedIn: request.session.isLoggedIn || false,
        permisos: request.session.permisos || [],
        usuario: request.session.usuario || {}
    });
};

exports.get_reportes = (request, response, next) => {    

    response.render('reportes', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
        isLoggedIn: request.session.isLoggedIn || false,
        permisos: request.session.permisos || [],
        usuario: request.session.usuario || {}
    });
};

exports.get_creditos = (request, response, next) => {

    cicloescolar.fetchAll().then(([rows]) => {
    response.render('creditos', {
        pagePrimaryTitle: 'Créditos',
        cicloescolar: rows,
        isLoggedIn: request.session.isLoggedIn || false,
        permisos: request.session.permisos || [],
        usuario: request.session.usuario || {}
        });
    });
};

exports.get_configuracion = (request, response, next) => {

    Alumno.fetchAll().then(([rows]) => {
    response.render('configuracion', {
        pagePrimaryTitle: 'Configuración',
        alumnos: rows,
        isLoggedIn: request.session.isLoggedIn || false,
        permisos: request.session.permisos || [],
        usuario: request.session.usuario || {}
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
            isLoggedIn: request.session.isLoggedIn || false,
            permisos: request.session.permisos || [],
            usuario: request.session.usuario || {}
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

exports.get_importar = (request, response, next) => {


    response.render('importar', {
        pagePrimaryTitle: 'Importar Transferencias',
        isLoggedIn: request.session.isLoggedIn || false,
        permisos: request.session.permisos || [],
        usuario: request.session.usuario || {}
    });
}


exports.post_importar = (request, response, next) => {
    console.log(request.file);
    const operations = [];
    fs.createReadStream(request.file.path)
        .pipe(csvParser({
            columns: ['Referencia', 'Descripcion', 'Importe', 'Fecha']
        }))
        .on('data', (row) => {
            // Check if the row is empty
            const isEmptyRow = Object.values(row).every(val => val === null || val === '');

            if (!isEmptyRow) {
                const fecha = moment(row.Fecha, 'DDMMYYYY').format('YYYY-MM-DD');

                const operation = Pago.getEmailByReferencia(row.Referencia)
                    .then(email => {
                        if (email) {
                            const importar = new Pago(
                                email,
                                row.Referencia,
                                row.Descripcion,
                                row.Importe,
                                fecha
                            );
                            return importar.save()
                                .then(([rows,FieldData]) => {
                                    console.log('Saved row:', row);
                                })
                                .catch((error) => {
                                    console.log('Error al Importar Transferencia', error);
                                });
                        } else {
                            console.log(`No se encontró un alumno con la referencia ${row.Referencia}`);
                        }
                    });
                operations.push(operation);
            }
        })
        .on('end', () => {
            Promise.all(operations)
                .then(() => {
                    console.log('CSV file successfully processed');
                    response.redirect('/importar');
                })
                .catch(error => {
                    console.log('Error processing CSV file:', error);
                    response.status(500).send('Error processing CSV file');
                });
        });
};



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

exports.post_Forms = (request, response, next) => {
    if (request.body.formType === 'registrarPago') {
        // Call post_RegistrarPago if formType is 'registrarPago'
        exports.post_RegistrarPago(request, response, next);
    } else if (request.body.formType === 'solPagos') {
        // Otherwise, call post_SolPagos
        exports.post_SolPagos(request, response, next);
    }
};

