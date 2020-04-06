const path = require('path');
const express = require('express');
const boydParser = require('body-parser');
const rootDir = require('./util/path');

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
app.use((req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
    });
});

app.listen(3000, (err) => {
    console.log(`Connected to port${3000}`);
})