import { Response, Request, Router } from 'express';
import { User } from '../models/User';
import { User_Reg } from '../models/User_Reg';

const bcryptjs = require("bcryptjs");


const router = Router()


router.get('/', (req: Request, res: Response) => {
	res.send('OK');
});

router.post('/login', async (req: Request, res: Response) => {
	const { eMail, password} = req.body

	const user = await User_Reg.findOne({where:{eMail:eMail}})

	if ( user && user.password === password){
	
		const payload = {
			eMail,
			id: user.id,
			role: user.role,
		};

		res.json({
			mensaje: 'Autenticación correcta', payload
		});
	} else {
		res.status(300).json({ mensaje: "Usuario o contraseña incorrectos" })
	}
});



// router.post('/googleAuthentication', async (req: Request, res: Response) => {


// })


export default router;