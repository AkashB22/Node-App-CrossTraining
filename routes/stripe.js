var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.render('stripe');
});

router.post('/charge', function(req, res){
    // Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_S1VxAAFJowcGjOHK0I2do9PC00o2ZCTrjf");

// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:
const token = req.body.stripeToken; // Using Express

(async () => {
  const charge = await stripe.charges.create({
    amount: 999,
    currency: 'usd',
    description: 'Example charge',
    source: token,
  });
})();

res.redirect('/stripe');
});
module.exports =router;