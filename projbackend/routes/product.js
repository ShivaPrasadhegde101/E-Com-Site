const express = require("express")
const router = express.Router()

const {isSignedIn,isAuthenticated, isAdmin} = require("../controllers/authentication")
const {getProductByID,createProduct,getProduct,photo,deleteProduct,updateProduct,getAllproducts,getAllUniquecategory} = require("../controllers/product")
const {getUserById}=require("../controllers/user")

router.param("userId",getUserById)
router.param("productId",getProductByID)

//all actual routes

//create route
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct)

//read route
router.get("/product/:productId",getProduct)

//this is a separate route to send photo to the front end 
router.get("/product/photo/:productId",photo)

//delete the product route

router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)

//update the product route
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)

//listing route

router.get("/products",getAllproducts)

router.get("/product/categories",getAllUniquecategory)
module.exports =router