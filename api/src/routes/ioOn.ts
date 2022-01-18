import { io } from "../app";
import { connection } from "../ioControllers";
import { Response, Request, Router,NextFunction } from 'express';
const router = Router()


router.get('/socket',(req:Request,res:Response,next:NextFunction)=>{

 res.send('Hello')
    
})
io.on('connection',connection)


export default router


