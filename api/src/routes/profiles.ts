import { Response, Request, Router, NextFunction } from 'express';
import { User } from '../models/User';
import { uuid } from 'uuidv4';
import { Carrier } from '../models/Carrier';
import { Vehicle } from '../models/Vehicle';
import { User_Reg } from '../models/User_Reg';


const router = Router()


router.post('/userProfile', async (req: Request, res: Response, next: NextFunction) => {
	// res.send('llega al user profile')
	const { id, identification, zone, photo, account, phone } = req.body

	try {
		let newProfile = {
			id: uuid(),
			identification: identification,
			zone: zone,
			phone: phone,
			photo: photo,
			account: account,
			idUserReg: id
		}
		User.create(newProfile)
			.then((newProfile) => {
				res.send(newProfile);
			})
	} catch (err) {
		next(err)
	}




});

router.post('/carrierProfile', async (req: Request, res: Response, next: NextFunction) => {
	// res.send('llega al carrier profile')
	const { id, documentID, license, location, Cuenta,
		brand, patent, model, color, capacity, photo } = req.body
	try {

		let idCarrier = uuid()

		let newProfileCarrier = {
			id: idCarrier,
			documentID: documentID,
			license: license,
			location: location,
			Cuenta: Cuenta,
			photo: photo,
			idUserReg: id
		}
		var newTrack = {
			id: uuid(),
			brand: brand || null,
			patent: patent || null,
			model: model || null,
			color: color || null,
			capacity: capacity || null,
			CarrierId: idCarrier
		}

		let carrier = await Carrier.create(newProfileCarrier)

		let track = await Vehicle.create(newTrack)

		res.send('Ok')


	} catch (err) {
		next(err)
	}


});


//DEBUG
router.get('/profile', async (req: Request, res: Response) => {
	// res.send('llega al  profile')
	const { id } = req.params;
	// const id = req.params.id

	console.log(req.params.id) // llega undefined

	const user = await User.findByPk(id)

	// console.log(user)

	if (user === null) {
		const carrier = await Carrier.findByPk(id);

		const carrierData = {
			documentID: carrier?.documentID,
			license: carrier?.license,
			Active: carrier?.Active,
			location: carrier?.location,
			cuenta: carrier?.Cuenta,
			photo: carrier?.photo,
			// travel: carrier?.travel
		}

		return carrierData ? res.json(carrierData) : res.status(404).send("Carrier Not Found")
	}


	const userData = {
		identification: user.identification,
		zone: user.zone,
		photo: user.photo,
		account: user.account,
	}

	return userData ? res.json(userData) : res.status(404).send("User Not Found")

});

router.post('/updateUser', async (req: Request, res: Response, next: NextFunction) => {
    
    try{
        const { id, name, lastName, phone, photo, zone, account } = req.body
    
        let userUpdate;
    
        let userDataUpdate;

        if (name || lastName || phone) {

            let upDateThis: any = {}

            if(name){upDateThis.name = name}
            if(lastName){upDateThis.lastName = lastName}
            if(phone){upDateThis.phone = phone}
    
            userUpdate = await User_Reg.update(upDateThis/*{name: name, lastName: lastName, phone: phone}*/, {
                where: {
                    id
                },
                returning: true,
            })
        }
        
        if (photo || zone || account) {

            let upDateThis: any = {}

            if(photo){upDateThis.photo = photo}
            if(zone){upDateThis.zone = zone}
            if(account){upDateThis.account = account}

            userDataUpdate = await User.update(upDateThis/*{photo: photo, zone: zone, account: account}*/, {
                where: {
                    idUserReg: id
                },
                returning: true,
            })
        }
            
        if (userUpdate && userDataUpdate){
            res.status(200).json({"msg":"Tu informacion se actualizo exitosamente","userReg": userUpdate[1][0], "user": userDataUpdate[1][0]}) 
        } else if (userUpdate){
            res.status(200).json({"msg":"Tu informacion se actualizo exitosamente","userReg": userUpdate[1][0]})
            // console.log(userUpdate[1])
        } else if (userDataUpdate){
            res.status(200).json({"msg":"Tu informacion se actualizo exitosamente", "user":userDataUpdate[1][0]})
        }else{
        
            res.status(404).json({ msg: 'No se encontro usuario registrado' })
        }
    } catch (err){

        res.status(404).json({msg:"rompio"})
        
        console.log(err)
    }

})


router.post('/editCarrier', async (req: Request, res: Response, next: NextFunction) => {
    
    try{
        const { id, name, lastName, phone, documentID, license, location, Cuenta } = req.body
    
        let carrier;
        let carrierData;

        if (name || lastName || phone) {


            let upDateThis: any = {}

            if(name){upDateThis.name = name}
            if(lastName){upDateThis.lastName = lastName}
            if(phone){upDateThis.phone = phone}
    
    
             carrier = await User_Reg.update(upDateThis/*{name: name, lastName: lastName, phone: phone}*/, {
                where: {
                    id,
                },
                returning: true,
            })
        }
    
        if (documentID || license || location || Cuenta) {


            let upDateThis: any = {}

            if(documentID){upDateThis.documentID = documentID}
            if(license){upDateThis.license = license}
            if(location){upDateThis.location = location}
            if(Cuenta){upDateThis.Cuenta = Cuenta}


             carrierData = await Carrier.update(upDateThis/*{documentID: documentID, license: license, location: location, Cuenta: Cuenta}*/, {
                where: {
                    idUserReg: id
                },
                returning: true,
            })
        }

        if (carrier && carrierData){
            res.status(200).json({"msg":"Tu informacion se actualizo exitosamente","userReg": carrier[1][0], "carrier": carrierData[1][0]}) 
        } else if (carrier){
            res.status(200).json({"msg":"Tu informacion se actualizo exitosamente", "userReg": carrier[1][0]})
        } else if (carrierData){
            res.status(200).json({"msg":"Tu informacion se actualizo exitosamente",  "carrier":carrierData[1][0]})
        }else{
        
            res.status(404).json({ msg: 'No se encontro usuario registrado' })
        }


    }catch (err){

        res.status(404).json({msg:"rompio"})
        
        console.log(err)
    }

})

router.post('/updateVehicle', async (req: Request, res: Response, next: NextFunction) => {
    
    try{
        const { id, brand, patent, model, color, capacity} = req.body
    
        const carrierId = await Carrier.findOne({ where: { idUserReg: id } })

        let vehicle

        if (brand || patent || model || color || capacity) {

            let upDateThis: any = {}

            if(brand){upDateThis.brand = brand}
            if(patent){upDateThis.patent = patent}
            if(model){upDateThis.model = model}
            if(color){upDateThis.color = color}
            if(capacity){upDateThis.capacity = capacity}
            
            vehicle = await Vehicle.update(upDateThis/*{brand: brand, patent: patent, model: model, color: color, capacity: capacity}*/, {
                where: {
                    CarrierId: carrierId?.id
                },
                returning: true,
            })
        }
            
        if (vehicle){
            res.status(200).json({"msg":"Tu informacion se actualizo exitosamente","vehicle": vehicle[1][0]}) 
        }else{
            res.status(404).json({ "msg": 'No se encontro usuario registrado' })
        }

    } catch (err){

        res.status(404).json({msg:"rompio"})
        
        console.log(err)
    }

})


// router.put('/changepassword', async (req: Request, res: Response, next: NextFunction) => {

// 	const { eMail, password } = req.body

// 	try {
// 		const userPassword = await User_Reg.findOne({ where: { eMail } })

// 		if (userPassword) {
// 			const updatePassword = await userPassword.update(User_Reg, { where: { password: password } });

// 			return res.status(200).json(updatePassword)

// 		}

// 		return res.status(404).json({ msg: "No se pudo actualizar la base de datos" })


// 	} catch (err) {
// 		next(err)
// 	}

// })

// router.put('/capacity', async (req: Request, res: Response, next: NextFunction) => {

// 	const { eMail, capacity } = req.body

// 	try {
// 		const carrier = await Carrier.findOne({ where: { eMail } })
// 		const vehicle = await Vehicle.findOne({ where: { carrier: carrier?.id } })

// 		if (carrier && capacity) {
// 			const updateCapacity = await vehicle?.update(Vehicle, { where: { capacity: capacity } });

// 			return res.status(200).json(updateCapacity)

// 		}

// 		return res.status(404).json({ msg: "No se pudo actualizar la base de datos" })


// 	} catch (err) {
// 		next(err)
// 	}

// })


router.delete('/delete', async (req: Request, res: Response, next: NextFunction) => {
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
		} else if (!existsInDBUser) {
			const existsInDBCarrier = await Carrier.findOne({
				where: {
					id,
				},
			})
			existsInDBCarrier ? User.destroy({ where: { id, } }) : new Error("ERROR 500: User with given name does not exist in database")

		};
	} catch (err) {
		next(err);
	}

})




export default router;