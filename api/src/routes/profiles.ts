import { Response, Request, Router, NextFunction } from 'express';
import { User } from '../models/User';
import { uuid } from 'uuidv4';
import { Carrier } from '../models/Carrier';
import { Vehicle } from '../models/Vehicle';
import { User_Reg } from '../models/User_Reg';


const router = Router()


router.post('/userProfile', async (req: Request, res: Response, next: NextFunction) => {
	// res.send('llega al user profile')
	const { id, identification, zone, phone, photo, account } = req.body

	try {
		


		let newProfile = {
			id: uuid(),
			identification: identification,
			zone: zone,
			phone: phone,
			photo: photo,
			account: account
		}
		User.create(newProfile)
			.then((newProfile) => {

				res.send(newProfile);
			})

	} catch (err) {
		next(err)
	}

	// let newProfile = { 
	// 	id: uuid(),
	// 	identification:identification,
	// 	zone:zone,
	// 	phone:phone,
	//     photo:photo,
	//     account:account
	// }



	// User.create(newProfile)
	// .then(newProfile => {
	// 	res.send(newProfile);
	// })
	// .catch(error => next(error))



});

//Eli saco email y phone
router.post('/carrierProfile', async (req: Request, res: Response, next: NextFunction) => {
	// res.send('llega al carrier profile')
	const { documentID, license, location, Cuenta,
		brand, patent, model, color, capacity, photo } = req.body
    
	try {

		let idCarrier = uuid()

		let newProfileCarrier = {
			id: idCarrier, 
			documentID: documentID,
			license: license,
			location: location,
			Cuenta: Cuenta,
			photo: photo 
		}
		var newTrack = {
			id: uuid(),
			brand,
			patent,
			model,
			color,
			capacity,
			CarrierId: idCarrier
		}

		let carrier = await Carrier.create(newProfileCarrier)

		let track = await Vehicle.create(newTrack)

		res.send('Ok')


	} catch (err) {
		next(err)
	}






	// 		}else{
	// 			res.send(`Datos incompletos`)
	// 		}



	// 	}catch(e){

	// 		next(e)
	// 	}

	// }


	// let newProfile = { 
	// 	id: uuid(),
	// 	documentID:documentID,
	// 	license:license,
	// 	email:email,
	// 	phone:phone,
	//     location:location,
	//     CBU:CBU
	// }

	// Carrier.create(newProfile)
	// .then(newProfile => {
	// 	res.send(newProfile);
	// })
	// .catch(error => next(error))
});

router.get('/profile', async (req: Request, res: Response) => {
	// res.send('llega al  profile')
	const { id } = req.params;

	const user = await User.findByPk(id)

	if (user === null) {
		const carrier = await Carrier.findByPk(id);

		return carrier ? res.json(carrier) : res.status(404).send("ID Not Found")
	}

	return user ? res.json(user) : res.status(404).send("ID Not Found")
});

// router.put('/edit', async (req: Request, res: Response, next: NextFunction)=>{

// 	const {eMail, name, lastName, phone, photo, account, CBU, brand, patent, model, color} = req.body;

	
// 	if (name || lastName || phone ){
		
// 		const user = await User_Reg.findOne({where:{eMail}})

// 		user ? user.update(User_Reg, {where:{
// 			name: name,
// 			lastName: lastName,
// 			phone: phone,
// 		}}) :
		
// 		res.status(404).json({msg: "Usuario no encontrado"})
		

// 	}else if (brand || patent|| model || color){

// 	}
	
// 	if(account || photo){
// 		const userUser = await User.findOne({where:{account}})

// 		userUser ? userUser.update(User, {where:{
// 			account: account,
// 			photo: photo,
// 		}}):
// 		res.status(404).json({msg: "Usuario no encontrado"})



// 	}else if (CBU){
// 		const userCarrier = await User_Reg.findOne({where:{eMail}})

// 		userCarrier ? userCarrier.update(Carrier, {where:{
// 			CBU : CBU,
// 		}})

// 		:
		
// 		res.status(404).json({msg: "Conductor no encontrado"})

// 	}

// })

router.put('/changepassword', async (req: Request, res: Response, next: NextFunction)=>{

	const { eMail, password } = req.body

	try{
		const userPassword = await User_Reg.findOne({where:{eMail}})

		if(userPassword){
			const updatePassword = await userPassword.update(User_Reg, {where:{password:password}});

			return res.status(200).json(updatePassword)

		}

		return res.status(404).json({msg: "No se pudo actualizar la base de datos"})


	}catch(err){
		next(err)
	}

})

router.put('/capacity', async (req: Request, res: Response, next: NextFunction)=>{

	const { eMail, capacity } = req.body

	try{
		const carrier = await Carrier.findOne({where:{eMail}})

		if(carrier && capacity){
			const updateCapacity = await carrier.update(Carrier, {where:{capacity:capacity}});

			return res.status(200).json(updateCapacity)

		}

		return res.status(404).json({msg: "No se pudo actualizar la base de datos"})


	}catch(err){
		next(err)
	}

})


router.delete('/delete', async (req: Request, res: Response, next: NextFunction)=>{
	const { id } = req.params;
    try {
        const existsInDBUser = await User.findOne({
            where: {
                id,
            },
        });
        if (existsInDBUser) {
            User.destroy({
                where: {
                    id,
                },
            });
            return res.status(200).send("User has been deleted from database successfully");
        } else if (!existsInDBUser){
			const existsInDBCarrier = await Carrier.findOne({
				where: {
					id,
				},
			})
			existsInDBCarrier ? User.destroy({where:{id,}}) : new Error("ERROR 500: User with given name does not exist in database")
			
		};
    } catch (err) {
        next(err);
    }

})

export default router;