const express = require("express")
const router = express.Router()
const {getUser,getUserById,updateUser,userPurchaseList} = require("../controllers/user")
const {isAdmin,isAuthenticated,isSignedIn}=require("../controllers/authentication")
//const { update } = require("../models/user")

router.param("userId",getUserById)


router.get("/user/:userId",isSignedIn,isAuthenticated,getUser) // check with middleware before responding the user with his details

router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)

router.get("/order/user/:userId",isSignedIn,isAuthenticated,userPurchaseList)



module.exports = router;