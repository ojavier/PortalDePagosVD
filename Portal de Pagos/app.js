const express = require('express');
const app = express();

app.use(express.static('public'));
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


app.use((request, response, next) => {
  console.log('Middleware!');
  next(); 
});


// "body-parser" is a third party midleware that allows you to analyze
// requests' bodies
const bodyParser = require('body-parser');



const session = require('express-session');
app.use(session({
  secret: 'mySecretKey', 
  resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
  saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));



// It allows you to analyze requests' bodies with content type
// "application/x-www-form-urlencoded", meaning, it can give sense to
// the forms' data
app.use(bodyParser.urlencoded({ extended: false }));

const usersRoutes = require('./routes/users.routes.js');
app.use('/users', usersRoutes);

const mainRoutes = require('./routes/main.routes.js');
app.use('/', mainRoutes);

app.set('view engine', 'ejs');
app.set('views', 'views');


const DataTable = require( 'datatables.net' );

app.use((request, response, next) => {
  response.status(404);
  response.render('article', {
    pagePrimaryTitle: '404',
    includeImageSection: false,
    includeContent: true,
    content: '<h2>The file you\'re searching for doesn\'t exist</h2>',
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
