const db = require('../util/database');

class SolicitudDePago {
    // Constructor
    constructor(idSPago, concepto, email, cantidad) {
        this.idSPago = idSPago;
        this.concepto = concepto;
        this.email = email;
        this.cantidad = cantidad; // Agregar cantidad al constructor
    }

    // Método para guardar una nueva solicitud de pago en la base de datos
    async save() {
        try {
            const result = await db.execute(
                'INSERT INTO solicitudesdepagos (IdSPago, Concepto, Email, Cantidad) VALUES (?, ?, ?, ?)',
                [this.idSPago, this.concepto, this.email, this.cantidad] // Incluir la cantidad en los valores a insertar
            );
            return result[0].insertId; // Devolver el ID de la nueva solicitud de pago
        } catch (error) {
            throw error;
        }
    }

    // Método estático para buscar una solicitud de pago por su ID
    static async findById(idSPago) {
        try {
            const [solicitud] = await db.execute('SELECT * FROM solicitudesdepagos WHERE IdSPago = ?', [idSPago]);
            if (solicitud.length > 0) {
                return new SolicitudDePago(solicitud[0].IdSPago, solicitud[0].Concepto, solicitud[0].Email, solicitud[0].Cantidad);
            } else {
                throw new Error('No se encontró ninguna solicitud de pago con el ID especificado.');
            }
        } catch (error) {
            throw error;
        }
    }

    // Método estático para buscar solicitudes de pago por email
    static async findByEmail(email) {
        try {
            const [solicitudes] = await db.execute('SELECT IdSPago, Concepto, Email, Cantidad FROM solicitudesdepagos WHERE Email = ?', [email]);
            const solicitudesArray = solicitudes.map(solicitud => new SolicitudDePago(solicitud.IdSPago, solicitud.Concepto, email, solicitud.Cantidad));
            return solicitudesArray;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { SolicitudDePago };
