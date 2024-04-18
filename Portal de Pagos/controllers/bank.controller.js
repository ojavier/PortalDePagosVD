const builder = require('xmlbuilder');
const bcrypt = require('bcryptjs');

 
// Crear la cadena XML con XML Builder
var originalString = builder.create('P')
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
    .ele('reference', 'FACTURA999')
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
  console.log(xmlbuilder);

  // Cifrado con bcryptjs
  var key = '5DCC67393750523CD165F17E1EFADD21';
  var ciphertext = bcrypt.hashSync(originalString, key);

  // Crear la cadena XML con los datos cifrados
var encryptedXml = builder.create('P')
.ele('pgs')
  .ele('data0', 'SNDBX123')
  .up()
  .ele('data', bcryptCiphertext)
.end({ pretty: true });
 
// Codificar la cadena XML para enviarla en la solicitud POST
var data = encodeURIComponent("xml=" + encryptedXml);

// Crear una nueva solicitud XMLHttpRequest
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://sandboxpo.mit.com.mx/gen");
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

// Enviar la cadena XML cifrada al servidor
xhr.send(data);

var originalString = builder.create('P');
// Cifrado con bcryptjs
var keyBcrypt = '5DCC67393750523CD165F17E1EFADD21';
var bcryptCiphertext = bcrypt.hashSync(xmlBuilder, keyBcrypt);

// Decifrado con bcryptjs
var decryptedXml = bcrypt.compareSync(xmlBuilder, bcryptCiphertext);

console.log("Decrypted XML: " + decryptedXml);


// Notificacion POST

const xml = builder.create('CENTEROFPAYMENTS')
  .ele('reference', {}, 'PRUEBASCRYPTODEV')
  .up()
  .ele('response', {}, 'approved')
  .up()
  .ele('folioBpay', {}, '7c105d2d-880b-4f72-a15f-87c6a117949')
  .up()
  .ele('auth', {}, '00000')
  .up()
  .ele('cd_response', {}, '00')
  .up()
  .ele('cd_error')
  .up()
  .ele('nb_error')
  .up()
  .ele('nb_company', {}, 'CRYPTO')
  .up()
  .ele('nb_fpago')
  .up()
  .ele('tp_operation')
  .up()
  .ele('amount', {}, '28.00')
  .up()
  .ele('id_url', {}, 'XB1PT6V6')
  .up()
  .ele('email')
  .up()
  .ele('datos_adicionales')
  .up()
  .ele('nb_fpago', {}, 'BPAY')
  .end({ pretty: true });

console.log(xml);


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

