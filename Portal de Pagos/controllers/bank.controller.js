const builder = require('xmlbuilder');
const crypto = require('crypto');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid'); // Importar función para generar UUID

// Generar referencia UUID
const reference = uuidv4();

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
    .ele('reference', reference) // Utilizar referencia generada
    .up()
    .ele('amount', '1.00')
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
    .ele('mail_cliente', 'mail@dominio.com')
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
console.log(xmlData.toString());

// Definir algoritmo, clave e iv
const algorithm = 'aes-128-cbc';
const key = '5DCC67393750523CD165F17E1EFADD21'.slice(0, 16); // Truncar la clave a 16 bytes
const iv = crypto.randomBytes(16);

// Función para encriptar
const encriptar = (data, key, iv) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encryptedData = cipher.update(data, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
};

// Encriptar la cadena XML
const encryptedXmlData = encriptar(xmlData.toString(), key, iv);
console.log('Cadena XML encriptada:', encryptedXmlData);

// Función para generar URL y enviar solicitud POST
exports.generarURL = (req, res) => {
  // Encriptar la cadena XML
  const encryptedXmlData = encriptar(xmlData.toString(), key, iv);

  // Generar URL codificando la cadena XML encriptada
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
};



// Función para desencriptar
const desencriptar = (encryptedData, key, iv) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
  decryptedData += decipher.final('utf-8');
  return decryptedData;
};

// Ejemplo de desencriptación
const decryptedXmlData = desencriptar(encryptedXmlData, key, iv);
console.log('Cadena XML desencriptada:', decryptedXmlData);



//Redirect
// Variables
let nbResponse = "";
let idLiga = "";
let referencia = "";
let importe = "";
let email = "";
let nuAut = "";

// Obtenemos los parámetros del request

exports.handleResponse = (req, res) => {
  // Obtener parámetros de la solicitud GET
  const nbResponse = req.query.nbResponse;
  const idLiga = req.query.idLiga;
  const referencia = req.query.referencia;
  const importe = req.query.importe;
  const email = req.query.email;
  const nuAut = req.query.nuAut;

  // Lógica para procesar la respuesta del cobro
  // Aquí puedes realizar las acciones necesarias con los datos recibidos
  
  // Responder al navegador
  res.send('Respuesta recibida correctamente.');
};
