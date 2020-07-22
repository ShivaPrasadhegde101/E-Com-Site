const express=require('express')
const cors=require('cors')
const stripe=require('stripe')("sk_test_51H5YQTIheirNh1zSAwkACBx1MivYh62kP7oZtpVP4sCHgfPnhVVrt40cxqG7TxxqLHLqDNBDDjC922yJAsq2dAae00CdCRZqtl")
const uuid=require('uuid/v4')

const app=express()

app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send('It works')
})

app.post("/payment",(req,res)=>{
    const {product,token}=req.body
    console.log("PRODUCT",product)
    console.log("PRICE",product.price)
    const idempontencyKey=uuid()

    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(customer=>{
        stripe.charges.create({
            amount:product.price*100,
            currency:'usd',
            customer:customer.id,
            receipt_email:token.email,
            description:`Purchase of ${product.name}`,
            shipping:{
                name:token.card.name,
                address:{
                    country:token.card.address_country
                }
            }
        },{idempontencyKey})})
        .then(result=>res.status(200).json(result)).catch(err=>console.log(err))
})

app.listen(8000,()=>{
    console.log('Listening')
})