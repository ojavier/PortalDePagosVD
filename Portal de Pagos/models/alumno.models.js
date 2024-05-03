const db = require('../util/database');

class Alumno {
    // Fetch all records from 'alumno' table
    static fetchAll() {
        return db.execute('SELECT * FROM vista_alumno_usuario');
    }


    static fetchAllAlumnosBeca() {
        return db.execute('SELECT * FROM alumno');
    }
    
    // Fetch a single record from 'alumno' table by id
    static fetchOne(email) {
        return db.execute('SELECT * FROM vista_alumno_usuario WHERE Email = ?', [email]);
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

class EstadoCuenta {
    
    static fetchAll() {
        return db.execute('SELECT * FROM solicitudesdepagos WHERE TipoDeCobro = "Colegiatura"');
    }

   
    static fetchOne(email) {
        return db.execute('SELECT * FROM solicitudesdepagos WHERE Email = ? AND TipoDeCobro = "Colegiatura"', [email]);
    }

    // The query is based on the notion that payments are considered pending as long as they are still in
    // "solicitudesdepagos" table an "FechaLimite" has already passed.
    static fetchAllUnpaid() {
        const today = new Date().toISOString().slice(0, 10);
        return db.execute(`
            SELECT * 
            FROM solicitudesdepagos 
            WHERE FechaLimite < ? AND TipoDeCobro = 'Colegiatura'
        `, [today]);
    }
   
    static fetch(email) {
        if (email) {
            return this.fetchOne(email);
        } else {
            return this.fetchAll();
        }
    }
}

class Referencia {
    constructor(email, referencia) {
        this.email = email;
        this.referencia = referencia;
    }

    // Update 'concepto_pago' in 'referencia' table by id
    updateByEmail(email, referencia) {
        return db.execute(
            'UPDATE alumno SET referencia = ? WHERE email = ?',
             [referencia, email]
    );
}
}

module.exports = { Alumno, EstadoCuenta, Referencia};
