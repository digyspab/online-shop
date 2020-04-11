require('dotenv').config;
const express = require('express');
const bodyParser = require('body-parser');
var session = require('express-session');
const path = require('path');
const logger = require('morgan');
const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');
const CartItem = require('./models/cart-item');
const Cart = require('./models/cart');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


const errorController = require('./controllers/error');

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
  User.findByPk(1)
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => {
    console.log(err);
  });
})
app.use(logger('dev'));
app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);

// Association to database or relation
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' }); // OR
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

// Make table
sequelize
  .sync({ force: true }) // force: true, is overirde table info use only in development
  // .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if(!user) {
      return User.create({ name: 'Hyphen', email: 'hyphen@gmail.com' });
    }
    return user;
  })
  .then(user => {
    // console.log(user);
    return user.createCart();
  })
  .then(cart => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

