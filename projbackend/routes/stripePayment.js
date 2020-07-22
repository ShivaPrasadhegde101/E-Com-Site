const express = require('express')
const { MakePayment } = require('../controllers/stripePayement')
const router = express.Router()


router.post("/stripepayment",MakePayment)

module.exports = router