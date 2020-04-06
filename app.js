const path = require('path');
const express = require('express');
const boydParser = require('body-parser');
const rootDir = require('./util/path');

const app = express();

app.use(boydParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminData.routes);
app.use(shopRoutes);


// page not found routes
app.use((req, res, next) => {
    res.status(404).sendfile(path.join(rootDir, 'views', '404.html'));
});

app.listen(3000, (err) => {
    console.log(`Connected to port${3000}`);
})