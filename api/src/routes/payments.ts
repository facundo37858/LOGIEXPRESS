import { Response, Request, Router, NextFunction } from 'express';
 import axios from 'axios';
 import Stripe from 'stripe'
 //const Stripe = require("stripe")
 //const { conn, Shoe, Color, Brand, AvailableSizes, Role, Price } = require("./src/db.js");


 const router = Router();

 // llave privada a stripe
 //const stripe = new Stripe("sk_test_51K2dGKJ8rEWDJkMVI4Ppno1uwJVUGB6O0cgvIUACjJt0wzzGB3MgfqXp6FQOXoEXLGo8xVfv0RgjWRsGAdVg3HP600sYbspyXY")

 const stripe = new Stripe('pk_test_51KHwMJH58Ljah9wGjMPQ9Os5fhEj5awCKf7ARtjrqcwUFGAVniXX5CTP3fP492gqrJv3MerKLDbnAByXzpPkYWsC00P8X1yX8l', {
     apiVersion: "2020-08-27",
     appInfo: { // For sample support and debugging, not required for production:
       name: "stripe-samples/accept-a-payment",
       url: "https://github.com/stripe-samples",
       version: "0.0.2",
     },
     typescript: true,
   })

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

     // res.json({clientScret:paymentIntent.client_secret,id:paymentIntent.id,method:paymentIntent.payment_method})

     res.json({massage: 'succesfull payment', paymentIntent})

     }catch(e){
         res.status(400).send({error: e})
     }

 })

 export default router;
