import { Response, Request, Router, NextFunction } from 'express';
import { uuid } from 'uuidv4';
import { User_Reg } from '../models/User_Reg';

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

	const { name, lastName, phone, password, eMail, terminosCondiciones, rol } = req.body
	console.log(req.method);

	// if(!emal){TODO LO QUE YA HICISTE}else{res.json('el email ya existe')}

	let newUser = {
		id: uuid(),
		name,
		lastName,
		password,
		phone,
		terminosCondiciones,
		eMail,
		rol
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