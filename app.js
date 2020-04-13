require('dotenv').config;
const express = require('express');
const bodyParser = require('body-parser');
var session = require('express-session');
const path = require('path');
const logger = require('morgan');
const mongoConnect = require('./util/database').mongoConnect;

const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
/* 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
 */
// Add Middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // User.findByPk(1)
  // .then(user => {
  //   req.user = user;
  //   next();
  // })
  // .catch(err => {
  //   console.log(err);
  // });
  next();
});
// app.use(logger('dev'));
app.use('/admin', adminRoutes);
// app.use(shopRoutes);


app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000, () => {
    console.log('Connected to port 3000');
  });
});

