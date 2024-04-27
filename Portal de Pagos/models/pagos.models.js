const db = require('../util/database');


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

module.exports = { SolPago, Pago };