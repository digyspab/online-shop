const Product = require('../models/product');
const Cart = require('../models/cart');

/**
 * @param /
 * @description this controller is for shpop.js routes file
 * @method GET
 */
exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    });
};

/**
 * @param /products/:productId
 * @description this controller is for shpop.js routes file
 * @method GET
 */
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        console.log(product)
        res.render('shop/product-detail', {
            pageTitle: 'Product details',
            product: product,
            path: '/products',
        })
    })
};

/**
 * @param /products
 * @description this controller is for shpop.js routes file
 * @method GET
 */
exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
};

/**
 * @param /cart
 * @description this controller is for shpop.js routes file
 * @method GET
 */
exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    });
};

/**
 * @param /cart
 * @description this controller is for shpop.js routes file
 * @method POST
 */
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;

    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};


/**
 * @param /orders
 * @description this controller is for shpop.js routes file
 * @method GET
 */
exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

/**
 * @param /checkout
 * @description this controller is for shpop.js routes file
 * @method GET
 */
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};
