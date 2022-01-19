import { Response, Request, Router, NextFunction } from 'express';
import {User} from '../models/User'
import { User_Reg } from '../models/User_Reg';
import bcrypt from "bcryptjs";
import { Carrier } from '../models/Carrier';

const router=Router()


router.post('/changePasswordUser',async(req:Request,res:Response,next:NextFunction)=>{

    const {idUser,newPassword}=req.body

   try{ let userRegId=await User.findByPk(idUser)
    .then((userEdit)=>{
        if(!userEdit){
            return res.json({menssage:'Not found user'})
        }else{
           return userEdit.idUserReg

        }
        

    })

    let userEdit= await User_Reg.findOne({where:{

        id:`${userRegId}`

    }})
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
router.post('/changePasswordCarrier',async(req:Request,res:Response,next:NextFunction)=>{

    const {idUser,newPassword}=req.body

   try{ let userRegId=await Carrier.findByPk(idUser)
    .then((userEdit)=>{
        if(!userEdit){
            return res.json({menssage:'Not found user carrier'})
        }else{
           return userEdit.idUserReg

        }
        

    })

    let userEdit= await User_Reg.findOne({where:{

        id:`${userRegId}`

    }})
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