const db = require('../util/database');


module.exports = class Usuario {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_Email, mi_Password) {
        this.Email = mi_Email;
        this.Password = mi_Password;

    }

    static fetchAll() {
        return db.execute('SELECT * FROM usuario');
    }

    static fetch(Email) {
        if (Email) {
            return this.fetchOne(Email);
        } else {
            return this.fetchAll();
        }
    }

    static fetchOne(Email) {
        return db.execute('SELECT * FROM usuario WHERE Email = ?', [Email])
            .then(([rows, fields]) => {
                console.log(rows); 
                return rows;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    static getPrivilegios(Email) {
        return db.execute(`
            SELECT p.NombrePrivilegio
            FROM usuario u
            JOIN roldelusuarios ru ON u.Email = ru.Email
            JOIN permisosrol pr ON ru.IdRol = pr.IdRol
            JOIN permisos p ON pr.IdPermisos = p.IdPermisos
            WHERE u.Email = ?
        `, [Email]);
    }    
    

}
