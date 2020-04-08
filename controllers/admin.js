const Product = require('../models/product');

/**
 * @param /admin/add-product
 * @description this controller is for admin.js routes file
 * @method GET
 */
exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
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
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};

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