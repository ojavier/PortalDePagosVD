const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// "body-parser" is a third party midleware that allows you to analyze
// requests' bodies
const bodyParser = require('body-parser');

// It allows you to analyze requests' bodies with content type
// "application/x-www-form-urlencoded", meaning, it can give sense to
// the forms' data
app.use(bodyParser.urlencoded({ extended: false }));

const mainRoutes = require('./routes/main.routes.js');
const usersRoutes = require('./routes/users.routes.js');

const DataTable = require( 'datatables.net' );
// This is "mounting the route", and it means that all routes defined inside
// "mainRoutes" are going to be attach to the specified route
app.use('/', mainRoutes);
app.use('/users', usersRoutes);

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
