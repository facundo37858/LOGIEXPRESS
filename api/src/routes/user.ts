import {Response, Request, Router, NextFunction} from 'express';
import { uuid } from 'uuidv4';

import { User_Reg } from '../models/User_Reg';


const router=Router()

router.get('/user', async(req: Request, res: Response, next:NextFunction) => {

	
	try{
		let user=await User_Reg.findAll()

		if(user.length>0){
			return res.send(user)
		}
		res.send('data not found')
		//por consola me aparece:"Executing (default): SELECT "id", "ducumentoIdentidad", "eMail", "ubicacion", "cel", "tel", "fotoPerfil", "medioPago", "name", "lastName", "paswword", "terminosCondiciones", "createdAt", "updatedAt" FROM "Users" AS "User";"
		//no pude corregirlo!!
		

	}
	catch(err){
		next(err)

	}

	
	
	
});

router.post('/user', (req: Request, res: Response,next:NextFunction) => {
	const{name,paswword,terminosCondiciones}=req.body

	let newUser={
		id:uuid(),
		name:name,
		paswword:paswword,
		terminosCondiciones:terminosCondiciones
	}

	User_Reg.create(newUser)
	.then(newUser => {
	  res.send(newUser);
	})
	.catch(error => next(error))

});

export default router;