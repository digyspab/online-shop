const express = require('express');
const path = require('path');
const productsConroller = require('../controllers/products');

const router = express.Router();

router.get('/', productsConroller.getProduct);

module.exports = router;