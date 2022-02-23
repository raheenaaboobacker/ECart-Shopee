const mongoose = require('mongoose') //accessing mongoose package
    //mongoose connect
mongoose.connect('mongodb+srv://raheena:raheena%40123@cluster1.zmtjd.mongodb.net/fruitsdb?retryWrites=true&w=majority'); //connection string
const Schema = mongoose.Schema; //schema defnitionconst 
const adminSchema = new Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    role: String,
}, { strict: false });
var admindata = mongoose.model('admindata', adminSchema);
module.exports = admindata;