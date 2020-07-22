var mongoose  = require('mongoose')
var Schema = mongoose.Schema

var categorySchema = new Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true,
            unique:true,
        }
    
    },{timestamps:true}
)

module.exports = mongoose.model("Category",categorySchema)