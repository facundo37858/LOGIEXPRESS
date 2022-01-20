import { Response, Request, Router } from 'express';
import { User_Reg } from '../models/User_Reg';
import config from '../../config/config';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User';
// import passport from 'passport';


const router = Router()

function createToken(payload: any) {

	return jwt.sign({ id: payload.id, email: payload.eMail }, config.jwtSecret, {
		expiresIn: 86400
	})
}

router.post('/login', async (req: Request, res: Response) => {
	const { eMail, password } = req.body

	const user = await User_Reg.findAll({ where: { eMail: eMail } })
	/* const objUser = await User.findOne({where: { idUserReg : user[0].id}}) */

	if (user.length > 0) {

		const compare = await bcryptjs.compare(password, user[0].password)

		if (compare) {
			const payload = {
				eMail,
				id: user[0].id,
				role: user[0].role,
				name: user[0].name,
				lastname: user[0].lastName,
				phone: user[0].phone,
			};

			return res.json({
				token: createToken(payload),
				mensaje: 'Autenticación correcta', payload
			}).status(300);


		} else {
			const payload = {
				eMail,
				id: user[0].id,
				role: user[0].role,
				name: user[0].name,
				lastname: user[0].lastName,
				phone: user[0].phone,
			};
			return res.json({
				mensaje: "Contrasena no coincide", payload
			}).status(300)
		}
	} else {


		const payload = {
			role: 1,
		};
		return res.json({ payload, mensaje: "usuario y mail ingresados son invalidos" }).status(301)
	}
});


export default router;	