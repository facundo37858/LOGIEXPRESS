import { Response, Request, Router } from 'express';
import { User_Reg } from '../models/User_Reg';
const { OAuth2Client } = require("google-auth-library");

const router = Router()


router.get('/', (req: Request, res: Response) => {
	res.send('OK');
});

router.post('/Authentication', async (req: Request, res: Response) => {

	const { email, password } = req.body

	let user = await User_Reg.findOne({ where: { email: email } })

	if (user && user.password === password) {

		const payload = {
			email,
			id: user.id,
			rol: user.rol,
		};

		res.json({
			mensaje: 'Autenticación correcta', payload
		});
	} else {
		res.status(300).json({ mensaje: "Usuario o contraseña incorrectos" })
	}
});


router.get('/googleAuthentication', async (req: Request, res: Response) => {
})
export default router;