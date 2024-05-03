const express = require('express');
const app = express();

app.use(express.static('public'));
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));




app.use((request, response, next) => {
  console.log('Middleware!');
  next(); 
});

// 'body-parser' is a third party midleware that allows you to analyze
// requests' bodies
const bodyParser = require('body-parser');


// TODO: Needs to be changed to something that supports production
const session = require('express-session');
app.use(session({
  secret: 'mySecretKey', 
  resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
  saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));



// It allows you to analyze requests' bodies with content type
// 'application/x-www-form-urlencoded', meaning, it can give sense to
// the forms' data
app.use(bodyParser.urlencoded({ extended: false }));

const multer = require('multer');

//fileStorage: Es nuestra constante de configuración para manejar el almacenamiento
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        //'uploads': Es el directorio del servidor donde se subirán los archivos 
        callback(null, 'uploads');
    },
    filename: (request, file, callback) => {
        //aquí configuramos el nombre que queremos que tenga el archivo en el servidor, 
        //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
        callback(null, file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv') {
    cb(null, true); // Accept the file
  } else {
    cb(null, false); // Reject the file
  }
}

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

app.use(upload.single('csvFile')); // Put in the above code line







const usersRoutes = require('./routes/users.routes.js');
app.use('/users', usersRoutes);

const mainRoutes = require('./routes/main.routes.js');
app.use('/', mainRoutes);

app.set('view engine', 'ejs');
app.set('views', 'views');


const DataTable = require( 'datatables.net' );

app.use((request, response, next) => {
  response.status(404).render('404', {
    isLoggedIn: request.session.isLoggedIn || false, 
    permisos: request.session.permisos || [],
    usuario: request.session.usuario || {}
  });
});


// Definir una ruta POST para '/generar'
app.post('/generar', (req, res) => {
  // Lógica para procesar la solicitud POST aquí
  try {
    // Aquí va la lógica de procesamiento de la solicitud

    // Si se procesa correctamente, enviar una respuesta exitosa
    res.send('Respuesta a la solicitud POST recibida correctamente.');
  } catch (error) {
    // Si ocurre un error durante el procesamiento, enviar una respuesta de error
    console.error('Error en el procesamiento de la solicitud:', error);
    res.status(500).send('Error en el servidor al procesar la solicitud.');
  }
});


  // Ruta para manejar la respuesta del cobro
  app.get('/respuesta-cobro', (req, res) => {
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
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

