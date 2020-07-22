const express =  require("express")
const router = express.Router()

const {getCategoryByID,getCategory,getAllCategory,createCategory,updateCategory,removeCategory} = require("../controllers/category")
const {isSignedIn,isAdmin,isAuthenticated}= require("../controllers/authentication")
const {getUserById}=require("../controllers/user")

//paramas
router.param("userId",getUserById)

router.param("categoryId",getCategoryByID)

//Actual routers

//create routes
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory)


//read routes
router.get("/category/:categoryId",getCategory)
router.get("/categories",getAllCategory)

//update routes

router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory)

//delete routes


router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,removeCategory)

module.exports = router