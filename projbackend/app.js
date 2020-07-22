var mongoose = require('mongoose')
const express = require('express')
const app= express()
require('dotenv').config()
const bodyparser = require('body-parser')
const cors =  require('cors')
const cookieParser = require('cookie-parser')

const authRoutes = require("./routes/authentication")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")
const stripeRoute =require("./routes/stripePayment")
const paymentBRoutes = require("./routes/braintree")

//Db connection
const port=process.env.PORT || 8000
mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}).then(()=>{console.log('DB CONNECTED')})

//Middle Wares
app.use(bodyparser.json())
app.use(cookieParser())
app.use(cors())

//My Routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoute)
app.use("/api",orderRoute)
app.use("/api",stripeRoute)
app.use("/api",paymentBRoutes)

//Starting server
app.listen(port,()=>{console.log(`App is running at ${port}`)})


