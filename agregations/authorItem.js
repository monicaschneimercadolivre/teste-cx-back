const { ObjectId } = require("mongodb");
const Mongoose = require("../db");
const { ProductModel } = require('../model/product')
const { ProductItemModel } = require('../model/productItem')
//const url= process.env.MONGODB_URL
const url = "mongodb+srv://monicaschnei:m2lk6985@cluster0.vfdk0pj.mongodb.net/?retryWrites=true&w=majority"
console.log(url)

Mongoose.connect(url);


const  agregationAuthorItem = async (authorId) => {
    const agregate = await ProductModel.aggregate([
        {$unwind: "$_id"},
        { $match: { "_id": ObjectId(authorId)} },
    ])
    return agregate  
}

const  agregationAuthorHasItem = async (itemId, authorId) => {
    const agregate = await ProductModel.aggregate([
        {$match: {"_id": ObjectId(authorId)}},
        {$unwind: "$items"},
        { $match: { "items._id": ObjectId(itemId)} },
    ])
    return agregate  
}

const  agregationItem = async (itemId) => {
    const agregate = await ProductItemModel.aggregate([
        { $match: { "_id": ObjectId(itemId)} },
    ])
    return agregate  
}

module.exports = { agregationAuthorItem, agregationItem, agregationAuthorHasItem  }