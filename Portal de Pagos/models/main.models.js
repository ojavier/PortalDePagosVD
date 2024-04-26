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
    constructor(mi_email, mi_referencia, mi_concepto, mi_monto, mi_fechapago, mi_metodo, mi_fechalimite) {
        this.emailpago = mi_email;
        this.referencia = mi_referencia;
        this.metodo = mi_metodo;
        this.concepto_pago = mi_concepto;
        this.monto_pago = mi_monto;
        this.fechapago = mi_fechapago;
        this.fechalimite = mi_fechalimite;
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

    
    static async getEmailByReferencia(referencia) {
        const [alumnos] = await db.execute('SELECT Email FROM alumno WHERE Referencia = ?', [referencia]);
        if (alumnos.length > 0) {
            return alumnos[0].Email;
        } else {
            return null;
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

class Cicloescolar {
    //Constructor
    constructor(mi_MesInicio, mi_MesFin, mi_Año, mi_CostoCreditos) {
        if (!mi_MesInicio || !mi_MesFin || !mi_Año || !mi_CostoCreditos) {
            throw new Error('All properties must be defined');
        }
        this.mi_MesInicio = mi_MesInicio;
        this.mi_MesFin = mi_MesFin;
        this.mi_Año = mi_Año;
        this.mi_CostoCreditos = mi_CostoCreditos;
    }
    //Guardar
    save() {
        return db.execute(
            'INSERT INTO Cicloescolar (MesInicio, MesFin, Año, CostoCreditos) VALUES (?, ?, ?, ?)',
            [this.mi_MesInicio, this.mi_MesFin, this.mi_Año, this.mi_CostoCreditos]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM Cicloescolar');
    }

    static fetchOne(idCiclo) {
        return db.execute('SELECT * FROM Cicloescolar WHERE IdCiclo = ?', [idCiclo]);
    }

    static fetch(idCiclo) {
        if (idCiclo) {
            return this.fetchOne(idCiclo);
        } else {
            return this.fetchAll();
        }
    }
}
module.exports = { Alumno, SolPago, EstadoCuenta, Pago, Referencia, Cicloescolar };
