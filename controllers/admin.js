const Product = require('../models/product');

/**
 * @param /admin/add-product
 * @description this controller is for admin.js routes file
 * @method GET
 */
exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
};

/**
 * @param /admin/add-product
 * @description this controller is for admin.js routes file
 * @method POST
 * 
 */
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};

/**
 * @param /admin/edit-product/:productId
 * @description this controller is for admin.js routes file
 * @method GET
 */
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }

    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if(!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
        });
    });
};

/**
 * @param /admin/edit-product
 * @description this controller is for admin.js routes file
 * @method POST
 */
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(prodId, title, imageUrl, description, price);
    product.save();
    res.redirect('/admin/products')
}

/**
 * @param /admin/products
 * @description this controller is for admin.js routes file
 * @method GET
 * 
 */
exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
};