var mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')

var Schema=mongoose.Schema
var UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true,
    },
    lastname:{
        type:String,
        trim:true,
        maxlength:15,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    encryp_password : {
        type:String,
        required:true,
    },
    salt:String,
    userinfo:{
        type:String,
        trim:true,
    },
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[],

    }
},{timestamps:true});




UserSchema.virtual("password")
    .set(function(password){
        this._password= password;
        this.salt = uuidv1()
        this.encryp_password = this.securepassword(password)
})
.get(function()
{
    return this._password
})


UserSchema.methods={
    authenticate: function(plainpass)
    {
        return this.securepassword(plainpass) === this.encryp_password;
    },
    securepassword : function(plainpassword)
    {
        if(!plainpassword)
        return " ";
        try
        {
            return crypto.createHmac('sha256',this.salt).update(plainpassword).digest('Hex')
        }
        catch(err)
        {
            return "";
        }
    }

};
module.exports = mongoose.model("User",UserSchema)