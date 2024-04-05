const db = require('../util/database');

class Alumno {
    // Fetch all records from 'alumno' table
    static fetchAll() {
        return db.execute('SELECT * FROM alumno');
    }

    // Fetch a single record from 'alumno' table by id
    static fetchOne(email) {
        return db.execute('SELECT * FROM alumno WHERE Email = ?', [email]);
    }

    // Fetch records from 'alumno' table by id if provided, otherwise fetch all records
    static fetch(email) {
        if (email) {
            return this.fetchOne(email);
        } else {
            return this.fetchAll();
        }
    }
}

class SolPago {

    //Constructor
    constructor(mi_email, mi_concepto, mi_monto) {
        this.email = mi_email;
        this.concepto = mi_concepto;
        this.monto = mi_monto;
    } 
    //Guardar
    save() {
        return db.execute(
            'INSERT INTO solicitudesdepagos (Concepto, Cantidad, Email) VALUES (?, ?, ?)', 
            [this.concepto, this.monto, this.email]
        );
    }
}

module.exports = { Alumno, SolPago };