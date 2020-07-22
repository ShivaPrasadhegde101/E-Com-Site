var express  = require('express')
const app=express()
const port= 8000
var flag=0
function user(req,res)
{
    return res.send("User dashBoard")
}
function isUser(req,res,next)
{
    var u="Shiva"
    console.log("This may be an User");
    if(u=="Shiva")
    {
    next();
    }
    else
    {
        return res.send("Unauthorised access")
    }
}

function isLoggedIn(req,res,next)
{
    if(flag==1)
    {
        next()
    }
    else
    {
        return res.send("Unauthorized access")
    }
}
app.get('/user', isLoggedIn,isUser,user)

app.get('/login',(req,res)=>{
    flag=1
    res.send("Login")
})

app.get('/signup',(req,res)=>{
    res.send("Sign Up")
})

app.get('/admin',(req,res)=>{
    res.send("hello Admin")
})
app.listen(port,()=>{console.log("Listening...")})