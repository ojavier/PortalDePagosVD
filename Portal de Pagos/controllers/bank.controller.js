const builder = require('xmlbuilder');
const bcrypt = require('bcryptjs');
const xmlbuilder = require('xmlbuilder');
 
// Crear la cadena XML con XML Builder
var originalString = builder.create('P')
  .ele('business')
    .ele('repo', {'type': 'git'}, 'git://github.com/oozcitak/xmlbuilder-js.git')
  .up()
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
    .ele('nb_fpago', 'COD')
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
