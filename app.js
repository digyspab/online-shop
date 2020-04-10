require('dotenv').config;
const express = require('express');
const bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const path = require('path');
const logger = require('morgan');


const errorController = require('./controllers/error');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

// Add Middleware
app.use(bodyParser.urlencoded({ extended: false }));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(logger('dev'));
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
