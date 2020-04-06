const path = require('path');
const express = require('express');
const boydParser = require('body-parser');
const errorController = require('./controllers/error');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(boydParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminRoutes);
app.use(shopRoutes);


// page not found routes
app.use(errorController.get404);

app.listen(3000, (err) => {
    console.log(`Connected to port${3000}`);
})