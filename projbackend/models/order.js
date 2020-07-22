var mongoose = require('mongoose')
const {ObjectId}= mongoose.Schema;

const ProductCartSchema =  new mongoose.Schema({
    product:{
        type:ObjectId,
        ref: "Product"
    },
    name:String,
    count:Number,
    price:Number,
})



var orderSchema = new mongoose.Schema({
products:[ProductCartSchema],
transaction_id:{

},
amount:{
    type:Number
},
address:{
    type:String,
    required:true,
    maxlength:500
},
status : {
    type:String,
    default : "Recieved",
    enum : ["Cancelled","Delivered","Shipped","Processing","Recieved"]
},
updated:Date,
user:
{
    type:ObjectId,
    ref : "User",
    required:true
}
},{timestamps:true})

const Order= mongoose.model("Order",orderSchema)
const Productcart =  mongoose.model("ProductCart",ProductCartSchema)

module.exports = {Order,Productcart}