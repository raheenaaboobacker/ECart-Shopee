const mongoose = require('mongoose') //accessing mongoose package
    //mongoose connect
mongoose.connect('mongodb+srv://raheena:raheena%40123@cluster1.zmtjd.mongodb.net/fruitsdb?retryWrites=true&w=majority'); //connection string
const Schema = mongoose.Schema; //schema defnition
const fruitSchema = new Schema({
    name: String,
    price: String,
    img: String
}, { strict: false });


var productsdata = mongoose.model('productsdata', fruitSchema);
module.exports = productsdata;