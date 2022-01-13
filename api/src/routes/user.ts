import { Response, Request, Router, NextFunction } from 'express';
import { uuid } from 'uuidv4';
import { Carrier } from '../models/Carrier';
import { User_Reg } from '../models/User_Reg';

const bcrypt = require("bcryptjs");

const router = Router()
router.get('/', (req: Request, res: Response) => {
	res.send('OK');
});
router.get('/user', async (req: Request, res: Response, next: NextFunction) => {
	try {
		let user = await User_Reg.findAll()

		if (user.length > 0) {
			return res.send(user)
		}
		res.send('data not found')
		//por consola me aparece:"Executing (default): SELECT "id", "ducumentoIdentidad", "eMail", "ubicacion", "cel", "tel", "fotoPerfil", "medioPago", "name", "lastName", "paswword", "terminosCondiciones", "createdAt", "updatedAt" FROM "Users" AS "User";"
		//no pude corregirlo!!
	}
	catch (err) {
		next(err)
	}
});
//para registrar user
router.options('/user', async (res: Response) => {
	res.send('Options send')
})
router.post('/user', async (req: Request, res: Response, next: NextFunction) => {
	// const data1 = JSON.parse(req.body)
	console.log("Estes es el body", req.body);

	const { name, lastName, phone, password, eMail, terminosCondiciones, role } = req.body
	
	let passwordHash = await bcrypt.hash(password,8)

	

	let newUser = {
		id: uuid(),
		name,
		lastName,
		password: passwordHash,
		phone,
		terminosCondiciones,
		eMail,
		role
	}
	try {
		const [user/*usuario creado o excistente */, created/*boolean true->lo creo false->no lo creo pq exciste */] = await User_Reg.findOrCreate({//crea un usuario si no excisiste 
			where: { eMail: eMail },
			defaults: newUser
		})

		if (!created) {
			return res.send('eMail usado')//podria ser un boolean 
		}
		// console.log('User:',user,'Bool: ',created)

	



		res.send('Usuario creado')//podria ser un boolean 


	}
	catch (err) {
		next(err)

	}
});



export default router;