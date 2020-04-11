const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

/**
 * @param /
 * @description index page
 * @method GET
 */
router.get('/', shopController.getIndex);

/**
 * @param /products
 * @description show all products
 * @method GET
 */
router.get('/products', shopController.getProducts);

/**
 * @param /products/:productId
 * @description show all products
 * @method GET
 */
router.get('/products/:productId', shopController.getProduct);

/**
 * @param /cart
 * @description add to cart page
 * @method GET
 */
router.get('/cart', shopController.getCart);

/**
 * @param /cart
 * @description add to cart page
 * @method POST
 */
router.post('/cart', shopController.postCart);

/**
 * @param /cart-delete-item
 * @description payment page
 * @method POST
 */
router.post('/cart-delete-item', shopController.postCartDeleteProduct);

/**
 * @param /orders
 * @description all orders page
 * @method GET
 */
router.get('/orders', shopController.getOrders);

/**
 * @param /create-order
 * @description order placed
 * @method POST
 */
router.post('/create-order', shopController.postOrder);



module.exports = router;
