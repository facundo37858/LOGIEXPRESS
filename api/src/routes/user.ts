import { Response, Request, Router, NextFunction } from 'express';
import { uuid } from 'uuidv4';
import passport from 'passport';
import { User_Reg } from '../models/User_Reg';
import jwt from 'jsonwebtoken'
import config from "../../config/config"
const bcrypt = require("bcryptjs");

const router = Router()

router.get('/user', passport.authenticate("jwt", { session: false }), async (req: Request, res: Response, next: NextFunction) => {
<<<<<<< HEAD
	try {
		let user = await User_Reg.findAll()
		// console.log("AQUI", req.user)
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
=======
    try {
        let user = await User_Reg.findAll()
        console.log("AQUI", req.user)
        if (user.length > 0) {
            return res.send(user)
        }
        res.send('data not found')
    }
    catch (err) {
        next(err)
    }
>>>>>>> 65e5d37349411643f062d4e99a6864296ecfcfa9
});

<<<<<<< HEAD
	// let passwordHash = await bcrypt.hash(password, 8)

// 	let newUser = {
// 		id: uuid(),
// 		name,
// 		lastName,
// 		password: passwordHash,
// 		phone,
// 		terminosCondiciones,
// 		eMail,
// 		role
// 	}
// 	try {
// 		const [user/*usuario creado o excistente */, created/*boolean true->lo creo false->no lo creo pq exciste */] = await User_Reg.findOrCreate({//crea un usuario si no excisiste 
// 			where: { eMail: eMail },
// 			defaults: newUser
// 		})

// 		if (!created) {
// 			return res.send('eMail usado')//podria ser un boolean 
// 		}
// 		// console.log('User:',user,'Bool: ',created)


		// const payload = {
		// 	eMail,
		// 	// id: id,
		// 	role: role,
		// 	name: name,
		// 	lastname: lastName,
		// 	phone: phone,
		// };


		// // res.send('Usuario creado')//podria ser un boolean 
		// return res.json({
		// 	mensaje: 'Usuario Creado', payload
		// }).status(300);
=======
router.post('/verifytoken', async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;
    try {
        const decoded = jwt.verify(token, config.jwtSecret)
        const dataUser = await User_Reg.findByPk(decoded.id)

        const payload = {
            id: dataUser?.id,
            name: dataUser?.name,
            lastname: dataUser?.lastName,
            phone: dataUser?.phone,
            eMail: dataUser?.eMail,
            role: dataUser?.role,
            mensaje: true
        }

        console.log("PAYLOAD en verifytoken", payload);
>>>>>>> 65e5d37349411643f062d4e99a6864296ecfcfa9

        return res.json({ payload, mensaje: 'the access token is valid' })
    }
    catch (err) {
        next(err)
    }
});


router.post('/user', async (req: Request, res: Response, next: NextFunction) => {
    // const data1 = JSON.parse(req.body)
    // console.log("Estes es el body", req.body);

    const { name, lastName, phone, password, eMail, terminosCondiciones, role } = req.body

    let passwordHash = await bcrypt.hash(password, 8)

    let payload = {
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
            defaults: payload,
        })

        if (!created) {
            const payload = {
                role: 1,
            };
            return res.json({ payload, mensaje: 'eMail usado' })//podria ser un boolean 
        }
        return res.json({
            mensaje: 'Usuario creado', payload
        }).status(300);
    }
    catch (err) {
        next(err)
    }
});



export default router