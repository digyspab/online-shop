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
 * @param /orders
 * @description all orders page
 * @method GET
 */
router.get('/orders', shopController.getOrders);

/**
 * @param /checkout
 * @description payment page
 * @method GET
 */
router.get('/checkout', shopController.getCheckout);

module.exports = router;
