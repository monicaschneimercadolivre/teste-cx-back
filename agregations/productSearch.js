const { ObjectId } = require("mongodb");
const Mongoose = require("../db");
const { ProductModel } = require('../model/product')
const {ProductItemModel} = require('../model/productItem')

//const url= process.env.MONGODB_URL
const url = "mongodb+srv://monicaschnei:m2lk6985@cluster0.vfdk0pj.mongodb.net/?retryWrites=true&w=majority"
console.log(url)

Mongoose.connect(url);

const  agregationSearch = async (search) => {
    const agregate = await ProductModel.aggregate([
        { $unwind: "$items" }, //Deconstructs an array field from the input documents to output a document for each element. 
        { $match: { "items.title": search} },
    ])
    console.log('thisagregate' + agregate)
    return agregate
    
}

// const  agregationSearch = async (search) => {
//     const agregate = await ProductItemModel.aggregate([
//         { $match: { "title": search} },
//     ])
//     console.log('thisagregate' + agregate)
//     return agregate
    
// }


module.exports = { agregationSearch }