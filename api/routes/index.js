const express = require('express');
const router = express.Router();

const getProducts = require('./products/getProducts.js');
const postProducts = require('./products/postProducts.js')

const postUsers = require('./users/postUsers.js');


router.use(getProducts);
router.use(postProducts);

router.use(postUsers);

module.exports = router;
