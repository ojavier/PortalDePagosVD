const db = require('../util/database');

class Alumno {
    // Fetch all records from 'alumno' table
    static fetchAll() {
        return db.execute('SELECT * FROM vista_alumno_usuario');
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
        return db.execute('SELECT * FROM solicitudesdepago WHERE Email = ? AND TipoDeCobro = "Colegiatura"', [email]);
    }

   
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
    constructor(mi_email, mi_concepto, mi_monto, mi_fechalimite) {
        this.email = mi_email;
        this.concepto = mi_concepto;
        this.monto = mi_monto;
        this.fechalimite = mi_fechalimite;
    } 
    //Guardar
    save() {
        return db.execute(
            'INSERT INTO solicitudesdepagos (Concepto, Cantidad, Email, TipoDeCobro, FechaLimite) VALUES (?, ?, ?, "Otros", ?)', 
            [this.concepto, this.monto, this.email, this.fechalimite]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM solicitudesdepagos WHERE TipoDeCobro = "Otros"');
    }

    static fetchOne(email) {
        return db.execute('SELECT * FROM solicitudesdepagos WHERE IdSPago = ? AND TipoDeCobro = "Otros"', [email]);
    }

    static fetch(email) {
        if (email) {
            return this.fetchOne(email);
        } else {
            return this.fetchAll();
        }
    }
}

class Pago {

    //Constructor
    constructor(mi_email, mi_referencia, mi_concepto, mi_monto, mi_fechapago) {
        this.emailpago = mi_email;
        this.referencia = mi_referencia;
        this.concepto_pago = mi_concepto;
        this.monto_pago = mi_monto;
        this.fechapago = mi_fechapago;
    } 
    //Guardar
    save() {
        return db.execute(
            'INSERT INTO pago (Fecha, Metodo, Concepto, Total, Email, Referencia) VALUES (?, "Efectivo", ? , ?, ?, ?)', 
            [this.fechapago, this.concepto_pago, this.monto_pago, this.emailpago, this.referencia]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM pago');
    }

    static fetchOne(email) {
        return db.execute('SELECT * FROM pago', [email]);
    }

    static fetch(email) {
        if (email) {
            return this.fetchOne(email);
        } else {
            return this.fetchAll();
        }
    }
}

module.exports = { Alumno, SolPago, EstadoCuenta, Pago };