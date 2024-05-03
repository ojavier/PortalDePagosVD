const builder = require('xmlbuilder');
const crypto = require('crypto');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken'); // Importa la biblioteca para trabajar con JWT
const { SolicitudDePago } = require('../models/bank.models'); // Importa la función para obtener la solicitud de pago

// Clave secreta para firmar el token JWT
const jwtSecretKey = 'dH4eHs8#&2jsnD3!qH7Gp';

// Exporta la función generarURL directamente
exports.generarURL = (req, res) => {
  const reference = uuidv4();

  // Obtener datos de la base de datos
  SolicitudDePago.findByEmail('mail@dominio.com')
    .then(solicitudes => {
      if (solicitudes.length > 0) {
        const solicitud = solicitudes[0]; // Suponiendo que solo obtienes una solicitud
        const cantidad = solicitud.cantidad;

        // Crear la cadena XML con XML Builder
        const xmlData = builder.create('P')
          .ele('business')
            .ele('id_company', 'SNBX')
            .up()
            .ele('id_branch', '01SNBXBRNCH')
            .up()
            .ele('user', 'SNBXUSR0123')
            .up()
            .ele('pwd', 'SECRETO')
          .up()
          .ele('nb_fpago', 'COD')
          .up()
          .ele('url')
            .ele('reference', reference)
            .up()
            .ele('amount', cantidad.toString())
            .up()
            .ele('moneda', 'MXN')
            .up()
            .ele('canal', 'W')
            .up()
            .ele('omitir_notif_default', '1')
            .up()
            .ele('promociones', 'C,3,6')
            .up()
            .ele('id_promotion', 'SNBX12345678')
            .up()
            .ele('st_correo', '1')
            .up()
            .ele('fh_vigencia', '09/09/2021')
            .up()
            .ele('mail_cliente', solicitud.email.toString()) // Usar el email de la solicitud
            .up()
            .ele('data3ds')
              .ele('ml', 'nospam@gmail.com')
            .up()
            .ele('datos_adicionales')
              .ele('data', {'id': '1', 'display': 'true'})
                .ele('label', 'Talla')
                .up()
                .ele('value', 'Grande')
              .up()
              .ele('data', {'id': '2', 'display': 'false'})
                .ele('label', 'Color')
                .up()
                .ele('value', 'Azul')
              .up()
            .up()
          .ele('nb_fpago', 'COD')
          .up()
          .ele('dom', '1')
          .up()
          .ele('version', 'IntegraWPP')
          .up()
        .up()
        .end({ pretty: true });

        // Imprimir la cadena XML
        console.log('Cadena XML:', xmlData.toString());

        // Enviar el XML como parte de la respuesta HTTP
        res.status(200).send(xmlData.toString());

        // Función para desencriptar
        const desencriptar = (encryptedData, key, iv) => {
          // Convertir la clave de hexadecimal a Buffer
          const keyBuffer = Buffer.from(key, 'hex');
          
          const decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);
          let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
          decryptedData += decipher.final('utf-8');
          return decryptedData;
        };

        // Encriptar la cadena XML
        const encryptedXmlData = xmlData.toString();

        // Ejemplo de desencriptación
        const decryptedXmlData = desencriptar(encryptedXmlData, key, iv);
        console.log('Cadena XML desencriptada:', decryptedXmlData);

        // Generar URL y enviar solicitud POST
        const urlData = `xml=${encodeURIComponent(encryptedXmlData)}`;

        axios.post('https://sandboxpo.mit.com.mx/gen', urlData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(response => {
          console.log('Respuesta del servidor:', response.data);
          // Aquí podrías enviar la respuesta al cliente si es necesario

          // Redirigir al cliente a la URL generada
          console.log('Redirigiendo al cliente a la URL:', response.data.url);
          res.redirect(response.data.url); // Suponiendo que la respuesta del servidor contiene la URL generada
        })
        .catch(error => {
          console.error('Error al enviar solicitud:', error);
          // Manejo de errores y respuesta al cliente si es necesario
          res.status(500).send('Error en el servidor');
        });
      } else {
        console.error('No se encontró ninguna solicitud de pago.');
        res.status(404).send('No se encontró ninguna solicitud de pago.');
      }
    })
    .catch(error => {
      console.error('Error al obtener la solicitud de pago:', error);
      res.status(500).send('Error en el servidor');
    });
};

// Función para manejar la respuesta del servidor
exports.handleResponse = (req, res) => {
  // Verificar el token JWT recibido en la solicitud
  const token = req.query.token;

  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) {
      console.error('Error al verificar el token:', err);
      res.status(401).send('Token inválido');
    } else {
      // El token es válido, puedes acceder a los datos decodificados
      const email = decoded.email;
      const reference = decoded.reference;
      const cantidad = decoded.cantidad;

      // Aquí puedes realizar las acciones necesarias con los datos decodificados
      res.send('Token válido. Acceso autorizado.');
    }
  });
};

// Función para manejar la respuesta del servidor
exports.handleResponse = (req, res) => {
  // Variables para almacenar parámetros de solicitud GET
  let nbResponse = "";
  let idLiga = "";
  let referencia = "";
  let importe = "";
  let email = "";
  let nuAut = "";

  // Obtener parámetros de la solicitud GET
  if (req.query.nbResponse != null && req.query.nbResponse !== "") {
    nbResponse = req.query.nbResponse;
  }

  if (req.query.idLiga != null && req.query.idLiga !== "") {
    idLiga = req.query.idLiga;
  }

  if (req.query.referencia != null && req.query.referencia !== "") {
    referencia = req.query.referencia;
  }

  if (req.query.importe != null && req.query.importe !== "") {
    importe = req.query.importe;
  }

  if (req.query.email != null && req.query.email !== "") {
    email = req.query.email;
  }

  if (req.query.nuAut != null && req.query.nuAut !== "") {
    nuAut = req.query.nuAut;
  }

  // Lógica para procesar la respuesta del cobro
  // Aquí puedes realizar las acciones necesarias con los datos recibidos

  // Responder al navegador
  res.send('Respuesta recibida correctamente.');
};
