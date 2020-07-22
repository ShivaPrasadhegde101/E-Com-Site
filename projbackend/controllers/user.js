const User = require("../models/user")
const Order = require("../models/order")
const { populate } = require("../models/user")

exports.getUserById= (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(403).json({
                error:"No user was founnd in DB"
            })
        }
        req.profile =user
        next()

    })
}
exports.getUser = (req,res)=>{
    //TODO: get Back here for password
    req.profile.salt = req.profile.createdAt = req.profile.updatedAt=undefined
    req.profile.encryp_password= undefined
    return res.json(req.profile)
}

exports.updateUser = (req,res)=>{
    User.findByIdAndUpdate(
        {_id :req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,user)=>{
            if(err)
            return res.status(400).json({
                error:"You are not authorized to update this information"
            })
            user.salt = user.createdAt = user.updatedAt=undefined
            user.encryp_password= undefined
            res.json(user)
        }
    
    )
}

exports.userPurchaseList =(req,res)=>{
    Order.find({user: req.profile._id}).populate("user","_id name")
    .exec((err,order)=>{
        if(err)
        {
            return res.status(400).json({
                error:"No order in this account"
            })
        }
        return res.json(order)
    })
}

//middle for purchases

exports.pushOrderInPurchaseList = (req,res,next)=>{
    let purchases=[]
    req.body.order.products.forEach(product=>{
        purchases.push({
            _id:product._id,
            name:product.name,
            description : product.description,
            category  :product.category,
            quantity : product.quantity,
            amount : req.body.order.amount,
            transaction_id : req.body.order.transaction_id
        })
    })

    //store in DB

    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$push:{purchases:purchases}},
        {new:true},
        (err,purchases)=>
        {
            if(err)
            return res.status(400).json({
                error:"Unable to save"
            })
            next()
        }

        )

    
}
