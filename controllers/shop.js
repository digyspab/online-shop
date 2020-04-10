const Product = require('../models/product');
const Cart = require('../models/cart');

/**
 * @param /
 * @description this controller is for shpop.js routes file
 * @method GET
 */
exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

/**
 * @param /products/:productId
 * @description this controller is for shpop.js routes file
 * @method GET
 */
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;

    // Product.findAll({ where: {id: prodId}})
    // .then(product => {
    //     res.render('shop/product-detail', {
    //         pageTitle: product[0].title,
    //         product: product[0],
    //         path: '/products',
    //     })
    // })
    // .catch(err => {
    //     console.log(err);
    // });

    Product.findByPk(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                pageTitle: product.title,
                product: product,
                path: '/products',
            })
        })
        .catch(err => {
            console.log(err);
        });
};

/**
 * @param /products
 * @description this controller is for shpop.js routes file
 * @method GET
 */
exports.getIndex = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    })
    .catch(err => {
        console.log(err);
    });
};

/**
 * @param /cart
 * @description this controller is for shpop.js routes file
 * @method GET
 */
exports.getCart = (req, res, next) => {

    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if(cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts,
            });
        });
    }); 
    
};

/**
 * @param /cart
 * @description this controller is for shpop.js routes file
 * @method POST
 */
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;

    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
      });
      res.redirect('/cart');
};


/**
 * @param /cart-delete-item
 * @description this controller is for shpop.js routes file
 * @method POST
 */
exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
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
