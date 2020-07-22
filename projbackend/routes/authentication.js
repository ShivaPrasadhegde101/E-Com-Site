var express =  require('express')
var router = express.Router()
const {check,validationResult} = require('express-validator')
const {signout,signup,signin, isSignedIn} = require("../controllers/authentication")


router.post("/signup", 

[
    check("name").isLength({min:3}).withMessage('Name Must be atleast 5 characters'), //checks this condition before req is sent
    check("email").isEmail().withMessage('Email must be valid and unique'),
    check("password","Password must be atleast 3 characters").isLength({min:5})
],signup)


router.post("/signin", 

[
    check("email").isEmail().withMessage('Email must be valid and unique'),
    check("password","Password field is required").isLength({min:1})
],signin)


router.get("/signout",signout)

router.get("/testroute",isSignedIn,(req,res)=>{
    res.json(
        req.auth
    )
})

module.exports = router;