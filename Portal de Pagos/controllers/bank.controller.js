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
const key = '5DCC67393750523CD165F17E1EFADD21';
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

// Generar URL codificando la cadena XML encriptada
const urlData = `xml=${encodeURIComponent(encryptedXmlData)}`;
axios.post('https://sandboxpo.mit.com.mx/gen', urlData, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}).then(response => {
  console.log('Respuesta del servidor:', response.data);
}).catch(error => {
  console.error('Error al enviar solicitud:', error);
});

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
if (request.getParameter("nbResponse") != null && request.getParameter("nbResponse") !== "") {
  nbResponse = request.getParameter("nbResponse");
}

if (request.getParameter("idLiga") != null && request.getParameter("idLiga") !== "") {
  idLiga = request.getParameter("idLiga");
}

if (request.getParameter("referencia") != null && request.getParameter("referencia") !== "") {
  referencia = request.getParameter("referencia");
}

if (request.getParameter("importe") != null && request.getParameter("importe") !== "") {
  importe = request.getParameter("importe");
}

if (request.getParameter("email") != null && request.getParameter("email") !== "") {
  email = request.getParameter("email");
}

if (request.getParameter("nuAut") != null && request.getParameter("nuAut") !== "") {
  nuAut = request.getParameter("nuAut");
}

