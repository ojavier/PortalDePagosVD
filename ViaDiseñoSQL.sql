USE portaldepagosvd;

CREATE TABLE `portaldepagosvd`.`usuario` (
  `Email` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `ApellidoP` VARCHAR(45),
  `ApellidoM` VARCHAR(45),
  `Status` ENUM("Si","No"),
  PRIMARY KEY (`Email`),
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish_ci
COMMENT = 'Datos del alumno';

INSERT INTO Usuario (Email, Password, Nombre, ApellidoP, ApellidoM, Status) VALUES 
('alumno1@example.com', 'contraseña1', 'Juan', 'Pérez', 'Gómez', 'Si'),
('alumno2@example.com', 'contraseña2', 'María', 'López', 'Martínez', 'Si'),
('alumno3@example.com', 'contraseña3', 'Pedro', 'García', 'Hernández', 'Si'),
('alumno4@example.com', 'contraseña4', 'Laura', 'Martínez', 'Fernández', 'Si'),
('alumno5@example.com', 'contraseña5', 'Carlos', 'Sánchez', 'Rodríguez', 'No'),
('alumno6@example.com', 'contraseña6', 'Ana', 'Ramírez', 'Díaz', 'Si'),
('alumno7@example.com', 'contraseña7', 'David', 'González', 'Moreno', 'Si'),
('alumno8@example.com', 'contraseña8', 'Marta', 'Torres', 'Vázquez', 'Si'),
('alumno9@example.com', 'contraseña9', 'Sofía', 'Díaz', 'Jiménez', 'Si'),
('alumno10@example.com', 'contraseña10', 'Diego', 'Ruiz', 'López', 'Si'),
('alumno11@example.com', 'contraseña11', 'Elena', 'Hernández', 'García', 'Si'),
('alumno12@example.com', 'contraseña12', 'Javier', 'Martínez', 'Sánchez', 'Si'),
('alumno13@example.com', 'contraseña13', 'Paula', 'Gómez', 'Rodríguez', 'Si'),
('alumno14@example.com', 'contraseña14', 'Adrián', 'Fernández', 'Martínez', 'Si'),
('alumno15@example.com', 'contraseña15', 'Carmen', 'Jiménez', 'Pérez', 'Si'),
('alumno16@example.com', 'contraseña16', 'Hugo', 'Rodríguez', 'Díaz', 'Si'),
('alumno17@example.com', 'contraseña17', 'Isabel', 'Sánchez', 'González', 'Si'),
('alumno18@example.com', 'contraseña18', 'Antonio', 'Pérez', 'Gómez', 'Si'),
('alumno19@example.com', 'contraseña19', 'Lorena', 'Martínez', 'Ramírez', 'Si'),
('alumno20@example.com', 'contraseña20', 'Pablo', 'García', 'López', 'Si'),
('alumno21@example.com', 'contraseña21', 'Lucía', 'Díaz', 'Hernández', 'Si'),
('alumno22@example.com', 'contraseña22', 'Daniel', 'Moreno', 'Sánchez', 'Si'),
('alumno23@example.com', 'contraseña23', 'Alicia', 'Ruiz', 'Gómez', 'Si'),
('alumno24@example.com', 'contraseña24', 'Santiago', 'Jiménez', 'Martínez', 'Si'),
('alumno25@example.com', 'contraseña25', 'Eva', 'Gómez', 'Rodríguez', 'Si'),
('alumno26@example.com', 'contraseña26', 'Rubén', 'Martínez', 'Fernández', 'No'),
('alumno27@example.com', 'contraseña27', 'Mónica', 'Sánchez', 'Hernández', 'Si'),
('alumno28@example.com', 'contraseña28', 'Andrea', 'Ramírez', 'Gómez', 'Si'),
('alumno29@example.com', 'contraseña29', 'Jorge', 'García', 'Martínez', 'Si'),
('alumno30@example.com', 'contraseña30', 'Patricia', 'López', 'Hernández', 'Si'),
('alumno31@example.com', 'contraseña31', 'Manuel', 'Pérez', 'Jiménez', 'Si'),
('alumno32@example.com', 'contraseña32', 'Sara', 'Rodríguez', 'Gómez', 'Si'),
('alumno33@example.com', 'contraseña33', 'Fernando', 'Martínez', 'Sánchez', 'Si'),
('alumno34@example.com', 'contraseña34', 'Natalia', 'Hernández', 'Martínez', 'Si'),
('alumno35@example.com', 'contraseña35', 'Marcos', 'Gómez', 'López', 'Si'),
('alumno36@example.com', 'contraseña36', 'Raquel', 'Sánchez', 'Ramírez', 'Si'),
('alumno37@example.com', 'contraseña37', 'Cristian', 'López', 'García', 'Si'),
('alumno38@example.com', 'contraseña38', 'Ana', 'Martínez', 'Hernández', 'Si'),
('alumno39@example.com', 'contraseña39', 'Lucas', 'García', 'Sánchez', 'Si'),
('alumno40@example.com', 'contraseña40', 'Elena', 'Pérez', 'Ramírez', 'Si'),
('alumno41@example.com', 'contraseña41', 'Sandra', 'Rodríguez', 'Martínez', 'Si'),
('alumno42@example.com', 'contraseña42', 'Roberto', 'Martínez', 'López', 'Si'),
('alumno43@example.com', 'contraseña43', 'Miriam', 'López', 'García', 'Si'),
('alumno44@example.com', 'contraseña44', 'Óscar', 'Ramírez', 'Sánchez', 'Si'),
('alumno45@example.com', 'contraseña45', 'Lidia', 'Gómez', 'Martínez', 'Si'),
('alumno46@example.com', 'contraseña46', 'Alberto', 'Martínez', 'Hernández', 'Si'),
('alumno47@example.com', 'contraseña47', 'Nerea', 'García', 'López', 'Si'),
('alumno48@example.com', 'contraseña48', 'Alejandro', 'Sánchez', 'Rodríguez', 'Si'),
('alumno49@example.com', 'contraseña49', 'Marina', 'Martínez', 'Ramírez', 'Si'),
('alumno50@example.com', 'contraseña49', 'Hiram', 'Mendoza', 'Lopez', 'Si');

CREATE TABLE `alumno` (
  `Email` varchar(45) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Beca` int DEFAULT NULL,
  `Matricula` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`Email`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci COMMENT='Datos del alumno';

INSERT INTO alumno (Email, Beca, Matricula, Estado) VALUES 
('alumno1@example.com', 50, 1001, 'Regular'),
('alumno2@example.com', 25, 1002, 'Irregular'),
('alumno3@example.com', 75, 1003, 'Regular'),
('alumno4@example.com', 0, 1004, 'Irregular'),
('alumno5@example.com', 100, 1005, 'Regular'),
('alumno6@example.com', 60, 1006, 'Regular'),
('alumno7@example.com', 80, 1007, 'Irregular'),
('alumno8@example.com', 10, 1008, 'Regular'),
('alumno9@example.com', 45, 1009, 'Regular'),
('alumno10@example.com', 20, 1010, 'Irregular'),
('alumno11@example.com', 30, 1011, 'Regular'),
('alumno12@example.com', 70, 1012, 'Regular'),
('alumno13@example.com', 85, 1013, 'Irregular'),
('alumno14@example.com', 5, 1014, 'Regular'),
('alumno15@example.com', 90, 1015, 'Regular'),
('alumno16@example.com', 40, 1016, 'Irregular'),
('alumno17@example.com', 55, 1017, 'Regular'),
('alumno18@example.com', 15, 1018, 'Regular'),
('alumno19@example.com', 65, 1019, 'Irregular'),
('alumno20@example.com', 95, 1020, 'Regular'),
('alumno21@example.com', 35, 1021, 'Regular'),
('alumno22@example.com', 50, 1022, 'Irregular'),
('alumno23@example.com', 0, 1023, 'Regular'),
('alumno24@example.com', 75, 1024, 'Regular'),
('alumno25@example.com', 100, 1025, 'Irregular'),
('alumno26@example.com', 60, 1026, 'Regular'),
('alumno27@example.com', 80, 1027, 'Regular'),
('alumno28@example.com', 10, 1028, 'Irregular'),
('alumno29@example.com', 45, 1029, 'Regular'),
('alumno30@example.com', 20, 1030, 'Regular'),
('alumno31@example.com', 30, 1031, 'Irregular'),
('alumno32@example.com', 70, 1032, 'Regular'),
('alumno33@example.com', 85, 1033, 'Regular'),
('alumno34@example.com', 5, 1034, 'Irregular'),
('alumno35@example.com', 90, 1035, 'Regular'),
('alumno36@example.com', 40, 1036, 'Regular'),
('alumno37@example.com', 55, 1037, 'Irregular'),
('alumno38@example.com', 15, 1038, 'Regular'),
('alumno39@example.com', 65, 1039, 'Regular'),
('alumno40@example.com', 95, 1040, 'Irregular'),
('alumno41@example.com', 35, 1041, 'Regular'),
('alumno42@example.com', 50, 1042, 'Regular'),
('alumno43@example.com', 0, 1043, 'Irregular'),
('alumno44@example.com', 75, 1044, 'Regular'),
('alumno45@example.com', 100, 1045, 'Regular'),
('alumno46@example.com', 60, 1046, 'Irregular'),
('alumno47@example.com', 80, 1047, 'Regular'),
('alumno48@example.com', 10, 1048, 'Regular'),
('alumno49@example.com', 45, 1049, 'Irregular'),
('alumno50@example.com', 20, 1050, 'Regular');

CREATE TABLE `alumnopertenecegrupo` (
  `Email` int NOT NULL,
  `IdGrupo` int NOT NULL,
  PRIMARY KEY (`Email`,`IdGrupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `cicloescolar` (
  `IdCiclo` int NOT NULL,
  `FechaInicio` date NOT NULL,
  `FechaFin` date NOT NULL,
  `CostoCreditos` float DEFAULT NULL,
  PRIMARY KEY (`IdCiclo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `grupo` (
  `IdGrupo` int NOT NULL,
  `IdMateria` int DEFAULT NULL,
  `Profesor` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Horario` time DEFAULT NULL,
  `Salon` int DEFAULT NULL,
  `Nombre` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `IdPlanDePagos` int DEFAULT NULL,
  `IdCiclo` int DEFAULT NULL,
  PRIMARY KEY (`IdGrupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `grupodefineplan` (
  `IdGrupo` int NOT NULL,
  `IdPlanDePagos` int NOT NULL,
  `CostoActualC` float NOT NULL,
  PRIMARY KEY (`IdGrupo`,`IdPlanDePagos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `materia` (
  `IdMateria` int NOT NULL,
  `NombreMateria` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `CantidadCreditos` int DEFAULT NULL,
  PRIMARY KEY (`IdMateria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `pago` (
  `Referencia` int NOT NULL,
  `Fecha` date DEFAULT NULL,
  `Metodo` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Total` float DEFAULT NULL,
  `IdPlanDePagos` int DEFAULT NULL,
  `IdSPago` int DEFAULT NULL,
  `Email` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`Referencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `permisos` (
  `IdPermisos` int NOT NULL,
  `Nombre` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`IdPermisos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `permisosrol` (
  `IdPermisos` int NOT NULL,
  `IdRol` int NOT NULL,
  PRIMARY KEY (`IdPermisos`,`IdRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `plandepagos` (
  `IdPlanDePagos` int NOT NULL,
  `FechaLimite` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Pendiente` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Notas` mediumtext COLLATE utf8mb4_spanish_ci,
  PRIMARY KEY (`IdPlanDePagos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `rol` (
  `IdRol` int NOT NULL,
  `Nombre` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`IdRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `roldeusuarios` (
  `IdRol` int NOT NULL,
  `Nombre` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`IdRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `solicitudesdepagos` (
  `IdSPago` int NOT NULL,
  `Concepto` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Cantidad` float DEFAULT NULL,
  `Email` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`IdSPago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;





