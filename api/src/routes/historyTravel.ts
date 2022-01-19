import { Response, Request, Router, NextFunction } from 'express';
import { Travel } from '../models/Travel';

const router=Router()



router.get('/historyTravelUser/:idUser',async(req:Request,res:Response,next:NextFunction)=>{

    let {idUser}=req.params
    console.log(req.params)
    
    try{

        let travel=await Travel.findAll({where:{
            userId:idUser
        }})
        if(travel.length<0){
            
            return res.json({menssage:'Not found travels'})
        }else{
            
            res.json({menssage:'Found Travel',payload:travel})
        }

    }catch(err){
        next(err)
    }



})
router.get(`/historyTravelUser/:idCarrier`,async(req:Request,res:Response,next:NextFunction)=>{

    let {idCarrier}=req.params

    try{

        let travel=await Travel.findAll({where:{
            carrierId:idCarrier
        }})
        if(travel.length<0){
            
            return res.json({menssage:'Not found travels'})
        }else{
            
            res.json({menssage:'Found Travel',payload:travel})
        }

    }catch(err){
        next(err)
    }



})



export default router