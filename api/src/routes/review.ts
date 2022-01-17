import { Request,Response, NextFunction, Router } from "express";

import { v4 } from "uuid";
import { Review } from "../models/Review";


const router =Router()




router.post('/review/user',async(req:Request,res:Response,next:NextFunction)=>{
    //necesito el id de trave
    //pesando como el user es el primero que hace una review
    const {Carrrier_raiting,Carrier_comment/*,travelId se genera al monmento de comenzar viaje en la ruta travel??? */}=req.body//review de user--->Carrier
    
    let newReviewCarrier={
        id:v4(),
        Carrrier_raiting,
        Carrier_comment,
    }

    try{
        let reviewe=await Review.create(newReviewCarrier)
        if(reviewe){
            return res.status(200).send({mensaje:'Review creada',data:reviewe})
    
        }

    }catch(err){
        next(err)
    }

    

  

     

})

router.post('/review/carrier',async(req:Request,res:Response,next:NextFunction)=>{

    //luego q el user hace una review la pude hacer el trasportista???

    const {User_raiting,User_comment,idReview}=req.body//review del carrier--->user
    try{
        let reviewUser= await Review.findByPk(idReview)//deberia tomar travelId 
        if(reviewUser===null){
           return res.status(400).json({mensaje:'Rewiew not found'})
        }else{
            let upDating=await reviewUser?.update({User_raiting,User_comment})

           res.status(200).json({mensaje:'Review',data:upDating}) 
        }
        
    
        
    
    }catch(err){
        next(err)
    }
    
    
    



    



}
)

export default router