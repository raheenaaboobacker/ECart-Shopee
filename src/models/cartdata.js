const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://raheena:raheena%40123@cluster1.zmtjd.mongodb.net/fruitsdb?retryWrites=true&w=majority'); //connection string
const Schema = mongoose.Schema;
const cartSchema = new Schema({
    // product_id: { type: Schema.Types.ObjectId, ref: "productsdata", required: true },
    prdname: String,
    prdprice: String,
    prdimg: String,
    qt: String,
    amount: String

})
var cartdata = mongoose.model('cartdata', cartSchema);
module.exports = cartdata;