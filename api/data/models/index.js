const mongoose = require('mongoose');

const products = require('./schemas/products');
const users = require('./schemas/users');

const model = mongoose.model.bind(mongoose);

module.exports = {
    Products: model('Products', products),
    Users: model('Users', users)
};