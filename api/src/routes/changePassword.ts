import { Response, Request, Router, NextFunction } from 'express';
import {User} from '../models/User'
import { User_Reg } from '../models/User_Reg';
import bcrypt from "bcryptjs";
import { Carrier } from '../models/Carrier';

const router=Router()


router.post('/changePassword',async(req:Request,res:Response,next:NextFunction)=>{

    const {idUser,newPassword}=req.body

   try{

    let userEdit= await User_Reg.findByPk(idUser)
    .then(async(user)=>{
        if(!user){
            return res.json({menssage:'Not found UserEdit'})
        }else{
            let newPasswordHash = await bcrypt.hash(newPassword, 8)

            await user.update({password:newPasswordHash})

            return user

        }
        
    })

    res.json({menssage:'update password ok',payload:userEdit})
}catch(err){
    next(err)
}
    

})

export default router