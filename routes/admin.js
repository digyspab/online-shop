const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

/**
 * @param /admin/add-product
 * @description admin route for add product page
 * @method GET
 */
router.get('/add-product', adminController.getAddProduct);


/**
 * @param /admin/products
 * @description admin route for show all product page
 * @method GET
 */
router.get('/products', adminController.getProducts);

/**
 * @param /admin/add-product
 * @description admin route for save product
 * @method POST
 */
router.post('/add-product', adminController.postAddProduct);

/**
 * @param /admin/edit-product
 * @description admin route for save product
 * @method GET
 */
router.get('/edit-product/:productId', adminController.getEditProduct);

module.exports = router;
