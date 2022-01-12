const express = require('express');
const { auth } = require('../../controller/auth');
const { Products } = require('../../data/models');
const validate = require('../../controller/validate.js')
const router = express.Router();

//buscar todos los productos
router.get('/products', auth, async (req, res, next) => {
    try {
        const products = await Products.find().select('-__v');
        return res.json(products);
    } catch (error) {
        next(error)
    }
})

//buscar productos por su nombre
router.get('/products/name/:name', auth, async (req, res, next) => {
    const { name } = req.params;

    try {
        validate.nameValidate(name)

        let productFound = await Products.find({ name: { $regex: new RegExp(name, "i") } }).lean().select('-__v');

        if (productFound.length === 0) {
            return res.status(404).json(["No hay productos con el nombre ingresado."]);
        }

        return res.json(productFound);
    } catch (error) {
        next(error);
    }
});

// buscar por precio mayor al ingresado
router.get('/products/mayorPrice/:price', auth, async (req, res, next) => {
    const { price } = req.params;

    try {
        validate.noNumber(price)

        const productFound = await Products.find({ price: { $gt: price } }).lean().select('-__v');

        if (productFound.length === 0) {
            return res.status(404).json(["No hay productos con el precio mayor al ingresado."]);
        }

        return res.json(productFound);
    } catch (error) {
        next(error);
    }
});

// buscar por precio menor al ingresado
router.get('/products/menorPrice/:price', auth, async (req, res, next) => {
    const { price } = req.params;

    try {
        validate.noNumber(price)

        const productFound = await Products.find({ price: { $lt: price } }).lean().select('-__v');

        if (productFound.length === 0) {
            return res.status(404).json(["No hay productos con el menor al ingresado."]);
        }

        return res.json(productFound);
    } catch (error) {
        next(error);
    }
});

// buscar por precio 
router.get('/products/price/:price', auth, async (req, res, next) => {
    const { price } = req.params;

    try {
        validate.noNumber(price)

        const productFound = await Products.find({ price: { $eq: price } }).lean().select('-__v');

        if (productFound.length === 0) {
            return res.status(404).json(["No hay productos con el precio ingresado."]);
        }

        return res.json(productFound);
    } catch (error) {
        next(error);
    }
});

module.exports = router;