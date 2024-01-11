const mongoose= require('mongoose');
const productSchema=mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    discount: Number,
    image: String,
})
module.exports=new mongoose.model('Product', productSchema);