const express = require("express");
const {Products} = require('../../data/models');
const validate = require('../../controller/validate')
const { auth } = require('../../controller/auth');
const router = express.Router();

router.post('/products', auth, async (req, res, next) => {
    const {SKU, code, name, description, pictures, price, currency} = req.body;

    try{
        validate.argumentsValidate([
            { keyName: 'SKU', value: SKU, type: 'string', notEmpty: true },
            { keyName: 'code', value: code, type: 'number', notEmpty: true , optional : true},
            { keyName: 'name', value: name, type: 'string', notEmpty: true },
            { keyName: 'description', value: description, type: 'string', notEmpty: true , optional : true},
            { keyName: 'pictures', value: pictures, type: 'array', notEmpty: true },
            { keyName: 'price', value: price, type: 'number', notEmpty: true },
            { keyName: 'currency', value: currency, type: 'string', notEmpty: true }
        ])
        const productCreated = await Products.create({ SKU, code, name, description, pictures, price, currency });
        return res.json(productCreated);
    } catch (error) {
        next(error);
    }

});

module.exports = router;