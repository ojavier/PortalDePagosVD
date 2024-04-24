const builder = require('xmlbuilder');
import crypto from 'crypto';
 
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


// Defining algorithm
const algorithm = 'aes-128-cbc';
const password = '5DCC67393750523CD165F17E1EFADD21'; 
// Defining key
const key = crypto.randomBytes(16); // Usar 16 bytes para una clave de AES-128
// Defining iv
const iv = crypto.randomBytes(16);

const encriptar = (password)=>{
    // Creating and initializing the cipher object 
  const cipher = crypto.createCipheriv(algorithm, key, iv)
    // Concatenating password and the cipher
  const passwordEncrypted = Buffer.concat([cipher.update(password),cipher.final()])
  return{
    iv: iv.toString('hex'),
    encrypted: passwordEncrypted.toString('hex')
  }
};


//Generacion de URL
var originalString = "xml=<pgs><data0>SNDBX123</data0><data>Cadena Cifrada</data></pgs>";
  var data = encodeURIComponent(originalString);

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  
  xhr.open("POST", "https://sandboxpo.mit.com.mx/gen");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  xhr.send(data);


// Decrypting
const desencriptar = (password) => {
  const iv = Buffer.from(password.iv,'hex')
  const encrypted = Buffer.from(password.encrypted, 'hex')

  const passwordDecrypted = crypto.createDecipheriv(algorithm, key, iv)
  // Concatenating passwordDecrypted to generate hex string
  return Buffer.concat([passwordDecrypted.update(encrypted),passwordDecrypted.final()]).toString()
}


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

