 const mongoose = require ("mongoose");

//const url= process.env.MONGODB_URL
const url = "mongodb+srv://monicaschnei:m2lk6985@cluster0.vfdk0pj.mongodb.net/?retryWrites=true&w=majority"
console.log(url)

mongoose.connect(url);

module.exports = mongoose;
