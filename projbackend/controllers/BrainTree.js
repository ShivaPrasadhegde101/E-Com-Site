var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "srd99hvfv6gjqn53",
  publicKey: "u7xyxhw4qrbpxvjqv",
  privateKey: "36276f8674df9a5345770d6104b8ec47"
});



exports.getToken=(req,res)=>{
    gateway.clientToken.generate({
      }, function (err, response) {
        if(err)
        {
            res.status(500).send(err)
        }
        else
        {
            res.send(response)
        }
      });
}

exports.processPayment=(req,res)=>{
    let nonceFromTheClient=req.body.paymentMethodNonce
    let amountFromClient = req.body.amount
    gateway.transaction.sale({
        amount:amountFromClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err)
          {
              res.status(500).json(err)
          }
          else
          {
              res.json(result)
          }
      });
}