import { Response, Request, Router } from 'express';
import { User } from '../models/User';
import { User_Reg } from '../models/User_Reg';

const bcryptjs = require("bcryptjs");


const router = Router()


router.get('/', (req: Request, res: Response) => {
	res.send('OK');
});

router.post('/Authentication', async (req: Request, res: Response) => {

	const { email, password} = req.params

	const user = await User_Reg.findOne({where:{email:email}})

	if ( user && user.password === password){
	
		const payload = {
			email,
			id: User.id,
			rol: User.rol,
		};

		res.json({
			mensaje: 'Autenticación correcta', payload
		});
	} else {
		res.status(300).json({ mensaje: "Usuario o contraseña incorrectos" })
	}
});

// me surje la duda si yo tengo que encriptar el password en el login o solo compararla 
// el login deberia ser un get o un post?

router.post('/googleAuthentication', async (req: Request, res: Response) => {


})


export default router;