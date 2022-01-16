import { Response, Request, Router, NextFunction } from 'express';
import axios from 'axios';
import Stripe from 'stripe'
//const Stripe = require("stripe")
//const { conn, Shoe, Color, Brand, AvailableSizes, Role, Price } = require("./src/db.js");
// const app = express();

const router = Router();

// llave privada a stripe
//const stripe = new Stripe("sk_test_51K2dGKJ8rEWDJkMVI4Ppno1uwJVUGB6O0cgvIUACjJt0wzzGB3MgfqXp6FQOXoEXLGo8xVfv0RgjWRsGAdVg3HP600sYbspyXY")

const stripe = new Stripe('sk_test_51KHp41KDcJ8UiNxjhZPL9vNckvDi98mXuAEZAntgDhRSRe8ieczfK1u27oBRgj1ekxONHjpRev5oPjk3qqXiSJ4q00qs7thVnx', {
    apiVersion: "2020-08-27",
    appInfo: { // For sample support and debugging, not required for production:
      name: "stripe-samples/accept-a-payment",
      url: "https://github.com/stripe-samples",
      version: "0.0.2",
    },
    typescript: true,
  })


  router.post("/paymentIntet", async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const { name, amount, id } = req.body;
      if (!name) return res.status(400).json({ message: "Please enter a name" });
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description:'Logiexpress',
        payment_method_types: ["card"],
        metadata: { name },
        // payment_method: id[2],
        // confirm: true,
      });
      console.log(paymentIntent)
      const clientSecret = paymentIntent.client_secret;
      res.json({ message: "Payment initiated", clientSecret });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

// router.post('/paymentIntet',async(req:Request,res:Response,next:NextFunction)=>{

//     const {amount, id}=req.body

//     console.log(req.body)

//     try{  
//         const paymentIntent: Stripe.PaymentIntent= await stripe.paymentIntents.create({
//             amount,
//             currency:'usd',
//             description:'logiexpress',
//             payment_method_types:['card'],
//             payment_method:id[0],
//             confirm: true,
//             // automatic_payment_methods: {
//             //     enabled: true,
//             //   }
//         })

//     // res.json({clientScret:paymentIntent.client_secret,id:paymentIntent.id,method:paymentIntent.payment_method})
    
//     res.json({massage: 'succesfull payment', paymentIntent})

//     }catch(e){
//         res.status(400).send({error: e})
//     }
  
// })

export default router;






// import { Response, Request, Router, NextFunction } from 'express';
// const stripe = require('stripe')('sk_test_51KHp41KDcJ8UiNxjhZPL9vNckvDi98mXuAEZAntgDhRSRe8ieczfK1u27oBRgj1ekxONHjpRev5oPjk3qqXiSJ4q00qs7thVnx');
// //const Stripe = require("stripe")

// const router = Router();

// //const stripe = new Stripe("pk_test_51KHp41KDcJ8UiNxjjfe3Hu14nV8NBZdLtNKoxphiEmAc47pFn4KnSTJ7s68Hpy4dOQbtnadCYbhYtovQbPa9nkx10013QK2vqD")
// const YOUR_DOMAIN = 'http://localhost:19006'

// router.post('/create-checkout-session', async (req: Request, res: Response, next: NextFunction) => {
//     console.log ('paga la prata')

//     const {amount} = req.body; 

//     console.log(amount)
//     console.log('esto es stripe', stripe)

//     const session = await stripe.paymentIntents.create({
//             // line_items: [
//             //   {
//                 price: amount,
//                 quantity: 1,
//             //   },
//             // ],
//             mode: 'payment',
//             success_url: `${YOUR_DOMAIN}/?success=true`,
//             cancel_url: `${YOUR_DOMAIN}?canceled=true`,

//     })

//     res.redirect(303, session.url);

// })

// // This is your test secret API key.
// const stripe = require('stripe')('sk_test_51KHp41KDcJ8UiNxjhZPL9vNckvDi98mXuAEZAntgDhRSRe8ieczfK1u27oBRgj1ekxONHjpRev5oPjk3qqXiSJ4q00qs7thVnx');
// const express = require('express');
// const app = express();
// app.use(express.static('public'));

// const YOUR_DOMAIN = 'http://localhost:4242';

// app.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: '{{PRICE_ID}}',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}/?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.redirect(303, session.url);
// });

// app.listen(4242, () => console.log('Running on port 4242'));


