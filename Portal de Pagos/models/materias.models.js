const db = require('../util/database');


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

module.exports = Cicloescolar;