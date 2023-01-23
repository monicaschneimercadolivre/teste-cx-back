const Mongoose = require('../db.js')
const mongoose = require('mongoose');
const { Db } = require('mongodb');
const { Schema } = mongoose;

const product = {
    author: {
        name: String,
        lastName: String,
        locale: String
    },
    categories: {
        type: Array,
        of: String
    },
    items: [
        {
            title: String,
            price: {
                currency: String,
                amount: Number,
                decimals: Number
            },
            picture: String,
            condition: String,
            free_shipping: Boolean,
            stock: Number,
            description: String,
            locale:String
        }
    ]
}
const productModel = new mongoose.Schema(
    product,
    {
        collection: 'cxTeste',
        timestamps: true
    }
)

const ProductModel = mongoose.model('cxTeste', productModel, 'cxTeste')

module.exports = {
    ProductModel,
}