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

    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
    .then((result) => {
        console.log(result);
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err)
    });
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

    Product.findByPk(prodId)
    .then(product => {
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
        });
    })
    .catch(err => {
        console.log(err);
    });
};

/**
 * @param /admin/edit-product
 * @description this controller is for admin.js routes file
 * @method POST
 */
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;

    Product.findByPk(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDescription;
            product.imageUrl = updatedImageUrl;

            return product.save();
        })
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
}

/**
 * @param /admin/products
 * @description this controller is for admin.js routes file
 * @method GET
 * 
 */
exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    })
    .catch(err => {
        console.log(err);
    });
};

/**
 * @param /admin/delete-product
 * @description this controller is for admin.js routes file
 * @method GET
 * 
 */
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        })
  };