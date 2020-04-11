const Product = require('../models/product');

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

    req.user.getCart()
    .then(cart => {
        return cart
        .getProducts()
        .then(products => {
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
    })
    .catch(err => {
        console.log(err);
    })
    
};

/**
 * @param /cart
 * @description this controller is for shpop.js routes file
 * @method POST
 */
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;

    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: { id: prodId }});
    })
    .then(products => {
        let product;
        if(products.length > 0) {
            product = products[0];
        }
        if(product) {
            const oldQuantity = product.CartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product;
           
        }
        return Product.findByPk(prodId)
    })
    .then(product => {
        return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity }
        });
    })
    .then(() => {
        res.redirect('/cart');
    })
    .catch(err => {
        console.log(err);
    });
};


/**
 * @param /cart-delete-item
 * @description this controller is for shpop.js routes file
 * @method POST
 */
exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    req.user
    .getCart()
    .then(cart => {
        return cart.getProducts({ where: { id: prodId }});
    })
    .then(products => {
        const product = products[0];
        return product.CartItem.destroy();
    })
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => {
        console.log(err);
    })
};


/**
 * @param /orders
 * @description this controller is for shpop.js routes file
 * @method GET
 */
exports.getOrders = (req, res, next) => {
    req.user
    .getOrders({ include : ['products'] })
    .then(orders => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: orders
        });
    })
    .catch(err => {
        console.log(err);
    });
};

/**
 * @param /create-order
 * @description order placed
 * @method POST
 */
exports.postOrder = (req, res, next) => {
    let fetchedCart;

    req.user
    .getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts();
    }) 
    .then(products => {
        return req.user
        .createOrder()
        .then(order => {
            return order.addProduct(products.map(product => {
                product.orderItem = { quantity: product.CartItem.quantity };
                return product;
            }));
        })
        .catch(err => {
            console.log(err);
        })
    }) 
    .then(result => {
        return fetchedCart.setProducts(null);
    })
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => {
        console.log(err);
    }); 
}

