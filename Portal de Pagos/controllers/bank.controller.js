const builder = require('xmlbuilder');
const crypto = require('crypto');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken'); // Importa la biblioteca para trabajar con JWT
const { SolicitudDePago } = require('../models/bank.models'); // Importa la función para obtener la solicitud de pago

// Clave secreta para firmar el token JWT
const jwtSecretKey = 'dH4eHs8#&2jsnD3!qH7Gp';

// Vector de inicialización específico proporcionado por el servidor
const iv = Buffer.from('0123456789abcdef0123456789abcdef', 'hex');

// Exporta la función generarURL directamente
exports.generarURL = (request, response) => {
  const reference = uuidv4();

  // Obtener datos de la base de datos
  SolicitudDePago.findByEmail('correo9@example.com')
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
          .up() // Cierre del elemento <business>
        .up() // Cierre del elemento <P>
        .ele('nb_fpago', 'COD') // Declaración de nb_fpago fuera de business
          .up() // Cierre de nb_fpago
        .ele('url') // Inicio del elemento <url>
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
            .ele('cl', '5515009020')
            .up()
            .ele('dir', 'Calle y número exterior')
            .up()
            .ele('cd', 'Ciudad')
            .up()
            .ele('est', 'CX')
            .up()
            .ele('cp', '1234567890')
            .up()
            .ele('idc', '484')
            .up() // Cerrar data3ds
          .up() // Cerrar url
        .ele('version', 'IntegraWPP') // <version>IntegraWPP</version>
        .up() // Cerrar la etiqueta version
        .end({ pretty: true });
        
        // Imprimir la cadena XML
        console.log('Cadena XML:', xmlData.toString());

        // Cadena original para cifrado
        const originalXmlString = xmlData.toString();

        // Clave para cifrado
        const key = Buffer.from('5DCC67393750523CD165F17E1EFADD21', 'hex');

        // Crear un objeto Cipher para cifrado
        const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);

        // Cifrar la cadena original
        let encryptedXmlData = cipher.update(originalXmlString, 'utf-8', 'hex');
        encryptedXmlData += cipher.final('hex');

        console.log("Cadena XML cifrada:", encryptedXmlData);

        // Función para desencriptar
        const desencriptar = (encryptedData, key) => {
          // Convertir la clave de hexadecimal a Buffer
          const keyBuffer = Buffer.from(key, 'hex');
  
          // Crear un objeto Decipher para descifrado
          const decipher = crypto.createDecipheriv('aes-128-cbc', keyBuffer, iv);
  
          // Descifrar los datos en hexadecimal y convertirlos a UTF-8
          let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
          decryptedData += decipher.final('utf-8');
  
          return decryptedData;
        };
  
        // Desencriptar la cadena XML
        const decryptedXmlData = desencriptar(encryptedXmlData, key);
  
        console.log('Cadena XML desencriptada:', decryptedXmlData);
  
        // Enviar el XML como parte de la respuesta HTTP
        response.status(200).send(xmlData.toString());

        // Crear la cadena XML para <pgs>
        const pgsXmlData = builder.create('pgs')
        .ele('data0', 'SNBX')
        .up()
        .ele('data', encryptedXmlData)
        .end({ pretty: true });

        // Imprimir la cadena XML cifrada para <pgs>
        console.log('Cadena XML cifrada para <pgs>:', pgsXmlData.toString());

        // Convertir la cadena original a URI
        const data = encodeURIComponent(pgsXmlData.toString());

        axios.post('https://sandboxpo.mit.com.mx/gen', 
            `xml=${encodeURIComponent(xmlData.toString())}&pgs=${encodeURIComponent(`<pgs><data0>SNBX</data0><data>${encryptedXmlData}</data></pgs>`)}`, 
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          )
        .then(response => {
          // Captura la URL de la respuesta
          const url = response.data[0].url; // Suponiendo que la URL está en el campo 'url' del primer objeto en la respuesta
          console.log('URL generada:', url);
        })
        .catch(error => {
          console.error('Error al enviar solicitud:', error);
          // Manejo de errores y respuesta al cliente si es necesario
        });


      } else {
        console.error('No se encontró ninguna solicitud de pago.');
        response.status(404).send('No se encontró ninguna solicitud de pago.');
      }
    });
};


// Función para manejar la respuesta del servidor
exports.handleResponse = (req, response) => {
  // Verificar el token JWT recibido en la solicitud
  const token = req.query.token;

  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) {
      console.error('Error al verificar el token:', err);
      response.status(401).send('Token inválido');
    } else {
      // El token es válido, puedes acceder a los datos decodificados
      const email = decoded.email;
      const reference = decoded.reference;
      const cantidad = decoded.cantidad;

      // Aquí puedes realizar las acciones necesarias con los datos decodificados
      response.send('Token válido. Acceso autorizado.');
    }
  });
};

// Función para manejar la respuesta del servidor
exports.handleResponse = (req, response) => {
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
  response.send('Respuesta recibida correctamente.');
};
