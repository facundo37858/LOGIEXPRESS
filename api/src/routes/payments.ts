<<<<<<< HEAD
import { Response, Request, Router, NextFunction } from 'express';
import axios from 'axios';
import Stripe from 'stripe'
//const Stripe = require("stripe")
//const { conn, Shoe, Color, Brand, AvailableSizes, Role, Price } = require("./src/db.js");
<<<<<<<< HEAD:api/src/routes/payments.ts
// const app = express();
========
  
>>>>>>>> 8e65aa6ba16c4354a33e035d6074da780cf6d818:api/src/routes/Stripe.ts

const router = Router();
 
// llave privada a stripe
//const stripe = new Stripe("sk_test_51K2dGKJ8rEWDJkMVI4Ppno1uwJVUGB6O0cgvIUACjJt0wzzGB3MgfqXp6FQOXoEXLGo8xVfv0RgjWRsGAdVg3HP600sYbspyXY")

const stripe = new Stripe('pk_test_51KHwMJH58Ljah9wGjMPQ9Os5fhEj5awCKf7ARtjrqcwUFGAVniXX5CTP3fP492gqrJv3MerKLDbnAByXzpPkYWsC00P8X1yX8l', {
=======

import { Response, Request, Router, NextFunction } from 'express';

import Stripe from 'stripe';
import dotenv from 'dotenv'
dotenv.config();
const router = Router()




const stripe= new Stripe(process.env.STRIPE_SECRET_KEY||"sk_test_51KHp41KDcJ8UiNxjhZPL9vNckvDi98mXuAEZAntgDhRSRe8ieczfK1u27oBRgj1ekxONHjpRev5oPjk3qqXiSJ4q00qs7thVnx",{
>>>>>>> 8e65aa6ba16c4354a33e035d6074da780cf6d818
    apiVersion: "2020-08-27"
    appInfo: { // For sample support and debugging, not required for production:
      name: "stripe-samples/accept-a-payment";
      url: "https://github.com/stripe-samples";
      version: "0.0.2";
    }
    typescript: true
<<<<<<< HEAD
  })

<<<<<<<< HEAD:api/src/routes/payments.ts

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
========
router.post('/create-payment-intent',async(req:Request,res:Response,next:NextFunction)=>{

    const {amount, id}=req.body
    console.log('esto es el id', id)
    try{  
        const paymentIntent: Stripe.PaymentIntent= await stripe.paymentIntents.create({
            amount,
            currency:'usd',
            description:'logiexpress',
            payment_method:id,
            confirm: true,
            // automatic_payment_methods: {
            //     enabled: true,
            //   }
        })
>>>>>>>> 8e65aa6ba16c4354a33e035d6074da780cf6d818:api/src/routes/Stripe.ts

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


=======
})





// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const Stripe = require("stripe");
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// const app = express();
// const PORT = 8080;

// app.use("/stripe", express.raw({ type: "*/*" }));
// app.use(express.json());
// app.use(cors());

router.post("/pay", async (req:Request, res:Response,next:NextFunction) => {
  try {
      console.log(req.body)
    const { name, amount} = req.body;
    if (!name) return res.json({key:400, message: "Please enter a name" });
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(25 * 1000),
        // amount,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { name },
      description:'logiexpress',
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({ message: "Payment initiated", clientSecret });
  } catch (err) {
    next(err)
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// app.post("/stripe", async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;
//   try {
//     event = await stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: err.message });
//   }

//   // Event when a payment is initiated
//   if (event.type === "payment_intent.created") {
//     console.log(`${event.data.object.metadata.name} initated payment!`);
//   }
//   // Event when a payment is succeeded
//   if (event.type === "payment_intent.succeeded") {
//     console.log(`${event.data.object.metadata.name} succeeded payment!`);
//     // fulfilment
//   }
//   res.json({ ok: true });
// });

export default router
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
>>>>>>> 8e65aa6ba16c4354a33e035d6074da780cf6d818
