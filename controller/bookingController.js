let SK=process.env.SK||require("../config/secrets").SK;
//process.env.SK defined in heroku
const stripe = require('stripe')(SK);
const planModel = require("../model/planModel");
const userModel = require("../model/userModel");
async function createSession(req,res){
    try{
        let { id } = req
        let userId = id;
        let planId = req.body.planId; // Plan-Id coming from I'm hungry button->frontend.js(script.js)
        const user = await userModel.findById(userId);
        const plan = await planModel.findById(planId);
        console.log(planId)

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: user.email,
            client_refernce_id: req.planId,
            line_items: [{
              name: plan.name,
              description: 'There is no description',
            //   images: ['https://example.com/t-shirt.png'],
              amount: plan.price*100,
              currency: 'usd',
              quantity: 1,
            }],
            success_url: `${req.protocol}://${req.get("host")}/profile`,
            cancel_url: `${req.protocol}://${req.get("host")}`
          })
          res.status(200).json({
              status:"success",
              session
          })
    } catch(err){
        res.status(200).json({
            err : err.message
        })
    }
}

module.exports.createSession = createSession;