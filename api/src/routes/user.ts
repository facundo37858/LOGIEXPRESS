import { Response, Request, Router, NextFunction } from 'express';
import { uuid } from 'uuidv4';
import passport from 'passport';
import { User_Reg } from '../models/User_Reg';

const bcrypt = require("bcryptjs");

const router = Router()

router.get('/user', passport.authenticate("jwt", { session: false }), async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user = await User_Reg.findAll()
        console.log("AQUI", req.user)
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

router.post('/user', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.body


    }
    catch (err) {
        next(err)
    }
});


router.post('/user', async (req: Request, res: Response, next: NextFunction) => {
    // const data1 = JSON.parse(req.body)
    console.log("Estes es el body", req.body);

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

        // if (!created) {
        //  return res.send('eMail usado')//podria ser un boolean
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