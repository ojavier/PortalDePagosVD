const fs = require('fs');
const csvParser = require('csv-parser');
const moment = require('moment');

const {Alumno, EstadoCuenta, Referencia}= require('../models/alumno.models');
const {SolPago, Pago}= require('../models/pagos.models');
const Cicloescolar = require('../models/materias.models');


exports.getRoot = (request, response, next) => {
    const isLoggedIn = request.session.isLoggedIn || false;
    if(!isLoggedIn) {
        response.redirect('/users/login');
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

exports.getAcademicPlan = (request, response, next) => {
    response.render('home', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
        isLoggedIn: request.session.isLoggedIn || false,
        permisos: request.session.permisos || [],
        usuario: request.session.usuario || {}
    });
};

exports.getStudentHome = (request, response, next) => {
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

// TODO: Later merge with the other home pages controllers in the unified version
exports.getAdminHome = (request, response, next) => {
    Alumno.fetchAll()
    .then(([rows]) => {
        response.render('admin-home', {
            isLoggedIn: request.session.isLoggedIn || false,
            permisos: request.session.permisos || [],
            usuario: request.session.usuario || {},
            alumnos: rows,
        });
    })
    .catch((error) => {
        console.log('Admin home error: ', error);
        response.redirect('/');
    })
};

exports.getStudentData = (request, response, next) => {
    const email = request.query.studentEmail;

    console.log(email);

    Promise.all([
        EstadoCuenta.fetchOne(email),
        SolPago.fetchOne(email),
        Pago.fetchOne(email)
    ])
    .then(([estadoCuentaColegiaturaRegistros, estadoCuentaOtrosServiciosRegistros, historialDePagosRegistros]) => {
        // Process the results here - usually, results are arrays of objects
        const estadoCuentaColegiatura = estadoCuentaColegiaturaRegistros[0];
        const estadoCuentaOtrosServicios = estadoCuentaOtrosServiciosRegistros[0];
        const historialDePagos = historialDePagosRegistros[0];

        // Prepare the data to be sent to the client
        const dataToClient = {
            estadoCuentaColegiatura: estadoCuentaColegiatura,
            estadoCuentaOtrosServicios: estadoCuentaOtrosServicios,
            historialDePagos: historialDePagos
        };

        // Send the JSON response to the client
        response.json(dataToClient);
    })
    .catch((error) => {
        console.log('Error recuperando la información del usuario:', error);
    }); 
    // TODO: Adapt the views so that they can receive and show .json error messages like the one show below
    // .catch(err => {
    //     response.status(500).json({
    //         error: err
    //     });
    // });
};

exports.getPayMethod = (request, response, next) => {
    const paymentType = request.query.paymentType;
    Promise.all([EstadoCuenta.fetchAll(), SolPago.fetchAll()])
        .then(([estadoCuentaRows, solPagoRows]) => {
            response.render('recipe_paymethod', {
                pagePrimaryTitle: 'Portal de Gestión de Pagos',
                estadoCuentas: estadoCuentaRows[0],
                solpagos: solPagoRows[0],
                paymentType: paymentType,
                isLoggedIn: request.session.isLoggedIn || false,
                permisos: request.session.permisos || [],
                usuario: request.session.usuario || {}
            });
        });
};

exports.getPayPlan = (request, response, next) => {
    response.render('payment-plan', {
        pagePrimaryTitle: 'Portal de Gestión de Pagos',
        isLoggedIn: request.session.isLoggedIn || false,
        permisos: request.session.permisos || [],
        usuario: request.session.usuario || {}
    });
};

exports.getProfile = (request, response, next) => {
    const isLoggedIn = request.session.isLoggedIn || false;
    console.log(request.session.rol);
    if(request.session.rol === 'Alumno'){
        Alumno.fetchOne(request.session.usuario.Email)
        .then(([rows]) => {
            const alumno = rows[0] || {};
            response.render('profile', {
                isLoggedIn: isLoggedIn,
                permisos: request.session.permisos || [],
                usuario: request.session.usuario || {},
                role: request.session.rol || '',
                matricula: alumno.Matricula || ''
            });
        })
        .catch((error) => {
            console.error('Error obteniendo la información del estudiante: ', error);
            response.redirect('/');
        });
    } else {
        response.render('profile', {
            isLoggedIn: isLoggedIn,
            permisos: request.session.permisos || [],
            usuario: request.session.usuario || {},
            role: request.session.rol || '',
            matricula: ''
        });
    }
};

// TODO: Later the Comparison Chart of Money Not Yet Obtained will need to be in regard of the school cicles
exports.getReportes = (request, response, next) => {
    Promise.all([
        EstadoCuenta.fetchAllUnpaid(),
        SolPago.fetchAllUnpaid(),
        Cicloescolar.fetchAll(),
        Alumno.fetchAllAlumnosBeca()
    ]).then(([unpaidColegiatura, unpaidOtros, CicloescolarRows, alumnoRows]) => {
        console.log(unpaidColegiatura, unpaidOtros, CicloescolarRows, alumnoRows);
        response.render('reportes', {
            pagePrimaryTitle: 'Portal de Gestión de Pagos',
            error: '',
            unpaidColegiatura: unpaidColegiatura[0],
            unpaidOtros: unpaidOtros[0],
            Cicloescolar: CicloescolarRows,
            alumnos: alumnoRows,
            isLoggedIn: request.session.isLoggedIn || false,
            permisos: request.session.permisos || [],
            usuario: request.session.usuario || {}
        });
    }).catch(error => { // TODO: Show the error in someway to the user instead of just sending a message
        console.log('Error al recuperar la información para los reportes:', error);
        response.render('reportes', {
            pagePrimaryTitle: 'Portal de Gestión de Pagos',
            error: 'Lo sentimos, hubo un problema al cargar la información. Por favor, intente de nuevo más tarde.',
            isLoggedIn: request.session.isLoggedIn || false,
            permisos: request.session.permisos || [],
            usuario: request.session.usuario || {},
            unpaidColegiatura: [], // Envía arreglos vacíos o valores por defecto como fallback
            unpaidOtros: [],
            Cicloescolar: [],
            alumnos: []
        });
    });
};

exports.getCreditos = (request, response, next) => {
    Cicloescolar.fetchAll().then(([rows]) => {
    response.render('creditos', {
        pagePrimaryTitle: 'Créditos',
        Cicloescolar: rows,
        isLoggedIn: request.session.isLoggedIn || false,
        permisos: request.session.permisos || [],
        usuario: request.session.usuario || {}
        });
    });
};

exports.getReferences = (request, response, next) => {
    Alumno.fetchAll().then(([rows]) => {
    response.render('references', {
        pagePrimaryTitle: 'Configuración',
        alumnos: rows,
        isLoggedIn: request.session.isLoggedIn || false,
        permisos: request.session.permisos || [],
        usuario: request.session.usuario || {}
        });
    });
}

exports.postReferences = (request, response, next) => {
    console.log(request.body);
    const NuevaReferencia = new Referencia(request.body.email, request.body.referencia);
    NuevaReferencia.updateByEmail(request.body.email, request.body.referencia).then(([rows,FieldData]) => {
        response.redirect('/references');
    }).catch((error) => {
        console.log('Error al Actualizar Referencia', error);
    });
}

exports.getPagos = (request, response, next) => {
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

exports.postSolPagos = (request, response, next) => {
    console.log(request.body);
    const solicitud = new SolPago(request.body.email, request.body.concepto, request.body.monto, request.body.fechalimite);
    solicitud.save().then(([rows,FieldData]) => {
        response.redirect('/pagos');
    }).catch((error) => {
        console.log('Error al Registrar Solicitud de Pago', error);
    });
};

exports.postRegistrarPago = (request, response, next) => {
    console.log(request.body);
    const pago = new Pago(request.body.emailpago, request.body.referencia, request.body.concepto_pago, request.body.monto_pago, request.body.fechapago);
    pago.save().then(([rows,FieldData]) => {
        response.redirect('/pagos');
    }).catch((error) => {
        console.log('Error al Registrar Pago', error);
    });
}

exports.getImportar = (request, response, next) => {
    response.render('importar', {
        pagePrimaryTitle: 'Importar Transferencias',
        isLoggedIn: request.session.isLoggedIn || false,
        permisos: request.session.permisos || [],
        usuario: request.session.usuario || {}
    });
}

exports.postImportar = (request, response, next) => {
    console.log(request.file);
    const operations = [];
    let hasError = false; 
    const results = { rows: [], reference: [] }; 
    const stream = fs.createReadStream(request.file.path)
        .pipe(csvParser({
            columns: ['Referencia', 'Descripcion', 'Importe', 'Fecha']
        }))

        .on('data', (row) => {
            // Check if the row is empty
            const isEmptyRow = Object.values(row).every(val => val === null || val === '');

            if (!isEmptyRow) {
                // Validate the row parameters
                if (!row.Referencia || !row.Descripcion || !row.Importe || !row.Fecha) {
                    console.log('Error: CSV file has wrong parameters');
                    response.status(400).send('Error: El CSV contiene los parametros erroneos, no se proceso la solicitud');
                    hasError = true;
                    stream.end();
                    return;
                }
        
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

                                    results.rows.push(row);
                                })
                                .catch((error) => {
                                    console.log('Error al Importar Transferencia', error);
                                });
                        } else {
                            console.log(`No se encontró un alumno con la referencia ${row.Referencia}`);

                            results.reference.push(row.Referencia);
                        }
                    });
                operations.push(operation);
            }
        })
        .on('end', () => {
            if (!hasError && !response.headersSent) {
            Promise.all(operations)
                .then(() => {
                    console.log('CSV file successfully processed');
                    response.json(results);
                })
                .catch(error => {
                    console.log('Error processing CSV file:', error);
                    response.status(500).send('Error processing CSV file');
                });
        }
        });
};

exports.postCicloEscolar = (request, response, next) => {
    console.log(request.body);
    const mi_Cicloescolar = new Cicloescolar(
        request.body.MesInicio, request.body.MesFin, request.body.Año, 
        request.body.CostoCreditos
    );
    mi_Cicloescolar.save()
    .then(([rows,FieldData]) => {
        response.redirect('/creditos');
    }).catch((error) => {
        console.log('Error al Registrar ciclo escolar', error);
    });
};

exports.postForms = (request, response, next) => {
    if (request.body.formType === 'registrarPago') {
        // Call post_RegistrarPago if formType is 'registrarPago'
        exports.postRegistrarPago(request, response, next);
    } else if (request.body.formType === 'solPagos') {
        // Otherwise, call post_SolPagos
        exports.postSolPagos(request, response, next);
    }
};
