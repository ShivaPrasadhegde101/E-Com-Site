const User = require("../models/user")
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const {check,validationResult} = require('express-validator')

exports.signup = (req,res)=>{
    const errors = validationResult(req)  // Errors the array obtained from express validation
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error: errors.array()[0].msg,
            errorparam : errors.array()[0].param

        })
    }
    const user = new User(req.body)
    user.save((err,user)=>{
        if(err)
        {
        return res.status(400).json({
            error : "Not able to save User in Db"
        })
        }
        res.json({
            name: user.name,
            email : user.email,
            id  : user._id
        })
        
    })
}

exports.signin = (req,res)=>{
    const {email,password}=req.body;
    const errors = validationResult(req)  // Errors the array obtained from express validation
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error: errors.array()[0].msg,
        })
    }

    // findOne email in database
    User.findOne({email},(err,user)=>{
        if(err || !user)
        return res.status(400).json({
            error:"User EMail does not exist"
        })
    // call the authentication method from the user password
    if(!user.authenticate(password))
    {
        return res.status(401).json({
            error:"Email and password doesn't match"
        })
    }
    var token = jwt.sign({_id:user._id},process.env.SECRET) // token value

    //sets the URL if the user if logged in
    res.cookie("token",token,{expire:new Date() + 9999})

    //send response to the front end

    const {_id,name,email,role}=user;
    return res.json({token,user:{_id,name,email,role}})
    

    })



}

exports.signout = (req,res)=>{
    res.clearCookie("token")
    res.json({
       message:"User signed out Successfully"
    })
}

//protected routes 
exports.isSignedIn= expressJwt({
    secret: process.env.SECRET,
    userProperty:"auth"
})



//Custom made middlewares

exports.isAuthenticated=(req,res,next)=>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker){
        res.status(403).json({
            error:"Access denied"
        })
    }
    else
    {
    next()
    } 
}
exports.isAdmin=(req,res,next)=>{
    if(req.profile.role === 0)
    {
        res.status(403).json({
            error:"You are not an admin,Access Denied"
        })
    }
    else
    {
    next()
    }

}
