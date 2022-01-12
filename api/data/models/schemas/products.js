const { Schema } = require('mongoose');

const products = new Schema({
    SKU: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        min: 0,
        validate: {
            validator: function (value) {
                return Number.isInteger(value);
            }
        }
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    pictures: {
        type: [{
            type: String,
            required: true
        }]
    },
    price: {
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    }

})

module.exports = products;