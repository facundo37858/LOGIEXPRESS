
import { Response, Request, Router, NextFunction } from 'express';

import Stripe from 'stripe';
import dotenv from 'dotenv'
dotenv.config();
const router = Router()




const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_51KHp41KDcJ8UiNxjhZPL9vNckvDi98mXuAEZAntgDhRSRe8ieczfK1u27oBRgj1ekxONHjpRev5oPjk3qqXiSJ4q00qs7thVnx", {
  apiVersion: "2020-08-27",
  appInfo: { // For sample support and debugging, not required for production:
    name: "stripe-samples/accept-a-payment",
    url: "https://github.com/stripe-samples",
    version: "0.0.2",
  },
  typescript: true,
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

router.post("/pay", async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body)
    const { name, amount } = req.body;
    if (!name) return res.json({ key: 400, message: "Please enter a name" });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(25 * 1000),
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { name },
      description: 'logiexpress',
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
