import { Request,Response, NextFunction, Router } from "express";


import { v4 } from "uuid";
import { Carrier } from "../models/Carrier";
import { Review } from "../models/Review";
import { Travel } from "../models/Travel";
import { User } from "../models/User";


const router =Router()




// router.post('/review/user',async(req:Request,res:Response,next:NextFunction)=>{
//     //necesito el id de trave
//     //pesando como el user es el primero que hace una review

//     // const {idUserReg}=req.body//necesito el id del travel pq si no como lo identifico 

//     const {idTravel,Carrrier_raiting,Carrier_comment/*,travelId se genera al monmento de comenzar viaje en la ruta travel??? */}=req.body//review de user--->Carrier
    

//     // let user=await User.findAll({
//     //     where:{
//     //         idUserReg:idUserReg
//     //     }
//     // })

//     // let travel=await Travel.findAll({
//     //     where:{
//     //         userId:user[0].id
//     //     }
//     // })




//     let newReviewCarrier={
//         id:v4(),
//         Carrrier_raiting,
//         Carrier_comment,
//         travelId:idTravel//travel[0].id//necesito el id del travel lo poasen desde el front
//     }

//     try{
//         let reviewe=await Review.create(newReviewCarrier)
//         if(reviewe){
//             return res.status(200).send({mensaje:'Review creada',data:reviewe})
    
//         }

//     }catch(err){
//         next(err)
//     }

    

  

     

// })
router.post('/review/user',async(req:Request,res:Response,next:NextFunction)=>{
    //necesito el id de trave
    //pesando como el user es el primero que hace una review

    // const {idUserReg}=req.body//necesito el id del travel pq si no como lo identifico 

    const {idTravel,Carrrier_raiting,Carrier_comment/*,travelId se genera al monmento de comenzar viaje en la ruta travel??? */}=req.body//review de user--->Carrier
    console.log('llego review', idTravel,Carrrier_raiting,Carrier_comment)

    // let user=await User.findAll({
    //     where:{
    //         idUserReg:idUserReg
    //     }
    // })

    // let travel=await Travel.findAll({
    //     where:{
    //         userId:user[0].id
    //     }
    // })

    let review= await Review.findAll({where:{travelId:idTravel}})

    if(!review.length){

        let newReviewCarrier={
            id:v4(),
            Carrrier_raiting,
            Carrier_comment,
            travelId:idTravel//travel[0].id//necesito el id del travel lo poasen desde el front
        }
        try{

            let reviewe=await Review.create(newReviewCarrier)
                
            return res.status(200).send({mensaje:'Review creada',data:reviewe})
                
                

        }catch(err){

            next(err)
        }


    }else{
        let upDataRewie= await review[0].update({Carrrier_raiting,Carrier_comment})

        return res.status(200).send({mensaje:'Review update',data:upDataRewie})
    }



})

// router.post('/review/carrier',async(req:Request,res:Response,next:NextFunction)=>{

//     //luego q el user hace una review la pude hacer el trasportista???

//     const {User_raiting,User_comment,idTravel}=req.body//review del carrier--->user
//     try{
//         let reviewUser= await Review.findAll({where:{travelId:idTravel}})//deberia tomar travelId 
//         if(!reviewUser.length){
//            return res.status(400).json({mensaje:'Rewiew not found'})
//         }else{
//             let upDating=await reviewUser[0].update({User_raiting,User_comment})

//            res.status(200).json({mensaje:'Review',data:upDating}) 
//         }
        
    
        
    
//     }catch(err){
//         next(err)
//     }
    
    
    



    



// }
// )

router.get('/reviewCarrier/:idUser_Reg',async(req:Request,res:Response,next:NextFunction)=>{

    const{idUser_Reg}=req.params

    let user=await User.findAll({//tengo el id de la tabla User
        where:{
            idUserReg:idUser_Reg
        }
    })
    if(!user.length){
        return res.json({menssage:'not found User'})
    }else{
        let travel=await Travel.findAll({where:{
            userId:user[0].id
        }})
        if(!travel.length){
            return res.json({menssage:'user not travels'})
        }
        let ids=[]//los id de los travels

        for(let i=0;i<travel.length;i++){

            



            ids.push(travel[i].id)

        }
        // res.send(`${ids.length}`)
        let reviews=[]

        let j=0

        while (j<ids.length) {
            let review=await Review.findOne({
                where:{
                    
                    travelId:ids[j]
                }
            })
            if(!review){
                
                j=j+1
                continue

            }
            reviews.push(review)
            
            j=j+1




            
        }
        res.send(reviews)
       
    }

    
    


})

router.post('/review/carrier',async(req:Request,res:Response,next:NextFunction)=>{
    
    //luego q el user hace una review la pude hacer el trasportista???

    const {User_raiting,User_comment,idTravel}=req.body//review del carrier--->user

    console.log('llego el post', User_raiting,User_comment,idTravel)
    // try{
    //     let reviewUser= await Review.findAll({where:{travelId:idTravel}})//deberia tomar travelId 
    //     if(!reviewUser.length){
    //        return res.status(400).json({mensaje:'Rewiew not found'})
    //     }else{
    //         let upDating=await reviewUser[0].update({User_raiting,User_comment})

    //        res.status(200).json({mensaje:'Review',data:upDating}) 
    //     }
        
    
        
    
    // }catch(err){
    //     next(err)
    // }
    ///////////////////////////////////////////////////
    
    let review= await Review.findAll({where:{travelId:idTravel}})

    if(!review.length){

        let newReviewCarrier={
            id:v4(),
            User_raiting,
            User_comment,
            travelId:idTravel//travel[0].id//necesito el id del travel lo poasen desde el front
        }
        try{

            let reviewe=await Review.create(newReviewCarrier)
                
            return res.status(200).send({mensaje:'Review creada',data:reviewe})
                
                

        }catch(err){
            console.log('llego al error', err)
            next(err)
        }


    }else{
        let upDataRewie= await review[0].update({User_raiting,User_comment})

        return res.status(200).send({mensaje:'Review update',data:upDataRewie})
    }

}
)
router.get('/reviewUser/:idUser_Reg',async(req:Request,res:Response,next:NextFunction)=>{

    const{idUser_Reg}=req.params

    let carrier=await Carrier.findAll({//tengo el id de la tabla Carrier
        where:{
            idUserReg:idUser_Reg
        }
    })
    if(!carrier.length){
        return res.json({menssage:'not found User'})
    }else{
        let travel=await Travel.findAll({where:{
            carrierId:carrier[0].id
        }})
        if(!travel.length){
            return res.json({menssage:'user not travels'})
        }
        let ids=[]//los id de los travels

        for(let i=0;i<travel.length;i++){

            



            ids.push(travel[i].id)

        }
        // res.send(`${ids.length}`)
        let reviews=[]

        let j=0

        while (j<ids.length) {
            let review=await Review.findOne({
                where:{
                    
                    travelId:ids[j]
                }
            })
            if(!review){
                
                j=j+1
                continue

            }
            reviews.push(review)
            
            j=j+1




            
        }
        res.send(reviews)
       
    }

    
    


})

export default router