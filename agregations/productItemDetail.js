const { ObjectId } = require("mongodb");
const Mongoose = require("../db");
const { ProductModel } = require('../model/product')

//const url= process.env.MONGODB_URL
const url = "mongodb+srv://monicaschnei:m2lk6985@cluster0.vfdk0pj.mongodb.net/?retryWrites=true&w=majority"
console.log(url)

Mongoose.connect(url);


const  agregation = async (id) => {
    const agregate = await ProductModel.aggregate([
        { $unwind: "$items" }, //Deconstructs an array field from the input documents to output a document for each element. 
        { $match: { "items._id": ObjectId(id)} },
        {$group: {_id: {
            "author": "$author",
            "item": "$items"
        }}}
    ])
    return agregate
    
}

module.exports = { agregation }