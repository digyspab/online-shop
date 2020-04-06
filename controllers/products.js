const products = [];

/**
 * GET methodd for add products
 */
exports.getAddProduct = (req, res, next) => {
    res.render('add-product', { 
        pageTitle: 'Add Product', 
        path: '/admin/add-product', 
    });
}

/**
 * POST method for add products
 */
exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
}

/**
 * GET method for display all products
 */
exports.getProduct = (req, res, next) => {
    res.render('shop', { 
        prods: products, 
        pageTitle: 'Shop', 
        path: '/', 
    });
}