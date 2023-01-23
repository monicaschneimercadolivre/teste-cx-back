const Mongoose = require('../db.js')
const mongoose = require('mongoose');

const productItem = {
    price: {
        currency: String,
        amount: Number,
        decimals: Number
    },
    title: String,
    picture: String,
    condition: String,
    free_shipping: Boolean,
    stock: Number,
    description: String,
    locale: String

}
const productItemModel = new mongoose.Schema(
    productItem,
    {
        collection: 'cxTesteItem',
        timestamps: true
    }
)

const ProductItemModel = mongoose.model('cxTesteItem', productItemModel, 'cxTesteItem')

module.exports = {
    ProductItemModel,
}